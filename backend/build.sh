#!/bin/bash
python -m pip install --upgrade pip
pip install -r requirements.txt
python init_pooja_data.py || echo "Data initialization completed or skipped"
