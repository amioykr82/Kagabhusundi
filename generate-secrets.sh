#!/bin/bash

# 🔐 Kagabhushundi - Secret Key Generator
# Run this script to generate secure keys for production deployment

echo "🚀 Kagabhushundi - Production Secret Key Generator"
echo "================================================="
echo ""

echo "📋 Copy these values to your Vercel Environment Variables:"
echo ""

echo "🔑 SECRET_KEY (for general application security):"
openssl rand -hex 32
echo ""

echo "🔐 JWT_SECRET_KEY (for JWT token signing):"
openssl rand -hex 32
echo ""

echo "🔗 DATABASE_URL template:"
echo "postgresql://postgres:YOUR_PASSWORD@db.YOUR_PROJECT_REF.supabase.co:5432/postgres"
echo ""

echo "📝 Don't forget to:"
echo "1. Replace YOUR_PASSWORD with your Supabase database password"
echo "2. Replace YOUR_PROJECT_REF with your Supabase project reference"
echo "3. Update CORS_ORIGINS after frontend deployment"
echo ""

echo "✅ All secrets generated! Keep these secure and never commit them to version control."
