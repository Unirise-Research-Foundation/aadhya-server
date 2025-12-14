#!/bin/bash

# Docker startup script with Doppler integration

echo "🚀 Starting Aadhya Server..."

# Check if Doppler is available and configured
if command -v doppler >/dev/null 2>&1; then
    echo "✅ Doppler CLI found"
    
    # Check if Doppler is configured
    if doppler configure get token >/dev/null 2>&1; then
        echo "✅ Doppler is configured, using Doppler environment"
        exec doppler run -- "$@"
    else
        echo "⚠️  Doppler not configured, falling back to local environment"
        # Copy template if .env doesn't exist
        if [ ! -f .env ] && [ -f .env.template ]; then
            cp .env.template .env
            echo "📝 Created .env from template"
        fi
        exec "$@"
    fi
else
    echo "⚠️  Doppler CLI not found, using local environment"
    # Copy template if .env doesn't exist
    if [ ! -f .env ] && [ -f .env.template ]; then
        cp .env.template .env
        echo "📝 Created .env from template"
    fi
    exec "$@"
fi
