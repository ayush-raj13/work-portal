#!/usr/bin/env bash

# Change directory to the server directory
cd ./server

# Install server dependencies
npm install --legacy-peer-deps

# Optionally, you can install client dependencies here if needed
cd ../client
npm install

cd ../server

# Remove the previous client build if it exists
rm -r ./clientbuild || true

# Build the client
cd ../client
npm run build

# Move the client build to the server directory
mv ./build ../server/clientbuild

# Change back to the server directory
cd ../server

# Your server will not start here, but the build is ready
# npm start
