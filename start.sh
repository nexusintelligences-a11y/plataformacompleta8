#!/bin/bash

# Start the integrated server (includes Vite middleware in development)
echo "Starting server..."
PORT=5000 NODE_ENV=development npx -y tsx server/index.ts 2>&1
echo "Server exited with code: $?"
