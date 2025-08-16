/**
 * Authentication API Service
 * Handles all authentication-related API calls
 */

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000';

class AuthAPI {
  constructor() {
    this.baseURL = `${API_BASE}/auth`;
  }

  // Helper method to make authenticated requests
  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const token = localStorage.getItem('access_token');
    
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` }),
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || 'An error occurred');
      }

      return data;
    } catch (error) {
      console.error('API Request failed:', error);
      throw error;
    }
  }

  // Authentication methods
  async register(userData) {
    return this.request('/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  async login(credentials) {
    const data = await this.request('/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
    
    // Store tokens
    if (data.access_token) {
      localStorage.setItem('access_token', data.access_token);
      localStorage.setItem('refresh_token', data.refresh_token);
      localStorage.setItem('token_expires_at', Date.now() + (data.expires_in * 1000));
    }
    
    return data;
  }

  async logout() {
    try {
      await this.request('/logout', { method: 'POST' });
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Clear tokens regardless of API call success
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      localStorage.removeItem('token_expires_at');
    }
  }

  async refreshToken() {
    const refreshToken = localStorage.getItem('refresh_token');
    if (!refreshToken) {
      throw new Error('No refresh token available');
    }

    const data = await this.request('/refresh', {
      method: 'POST',
      body: JSON.stringify({ refresh_token: refreshToken }),
    });

    // Update stored tokens
    localStorage.setItem('access_token', data.access_token);
    localStorage.setItem('refresh_token', data.refresh_token);
    localStorage.setItem('token_expires_at', Date.now() + (data.expires_in * 1000));

    return data;
  }

  async getCurrentUser() {
    return this.request('/me');
  }

  async updateProfile(userData) {
    return this.request('/me', {
      method: 'PUT',
      body: JSON.stringify(userData),
    });
  }

  async changePassword(passwordData) {
    return this.request('/change-password', {
      method: 'POST',
      body: JSON.stringify(passwordData),
    });
  }

  async deleteAccount() {
    return this.request('/me', {
      method: 'DELETE',
    });
  }

  // Token management
  isTokenExpired() {
    const expiresAt = localStorage.getItem('token_expires_at');
    if (!expiresAt) return true;
    
    return Date.now() >= parseInt(expiresAt) - 60000; // Refresh 1 minute before expiry
  }

  hasValidToken() {
    const token = localStorage.getItem('access_token');
    return token && !this.isTokenExpired();
  }

  async ensureValidToken() {
    if (this.isTokenExpired()) {
      try {
        await this.refreshToken();
        return true;
      } catch (error) {
        console.error('Token refresh failed:', error);
        this.logout();
        return false;
      }
    }
    return true;
  }
}

// Create and export singleton instance
const authAPI = new AuthAPI();
export default authAPI;
