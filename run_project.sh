#!/bin/bash

# Check if the project directory name is provided
if [ -z "$1" ]; then
  echo "Usage: $0 <project_directory_name>"
  exit 1
fi

# Define the project directory name from the command line argument
PROJECT_DIR_NAME=$1
DATA_DIR="./data"
PROJECT_DIR="${DATA_DIR}/${PROJECT_DIR_NAME}"
WD_DIR="${PROJECT_DIR}/wd"
DOCS_DIR="${PROJECT_DIR}/documents"

# Create the `project` directory if it does not exist
if [ ! -d "$PROJECT_DIR" ]; then
  mkdir -p "$PROJECT_DIR"
  echo "Created directory: $PROJECT_DIR"
fi

# Create the `wd` directory if it does not exist
if [ ! -d "$WD_DIR" ]; then
  mkdir -p "$WD_DIR"
  echo "Created directory: $WD_DIR"
fi

# Create the `documents` directory if it does not exist
if [ ! -d "$DOCS_DIR" ]; then
  mkdir -p "$DOCS_DIR"
  echo "Created directory: $DOCS_DIR"
fi

# Check if the .env.local file exists
ENV_FILE=".env.local"
if [ -f "$ENV_FILE" ]; then
  # Check if the PROJECT_DIR variable exists in the .env.local file
  if grep -q '^PROJECT_DIR=' "$ENV_FILE"; then
    # Update the existing PROJECT_DIR variable using awk
    awk -v PROJECT_DIR_NAME="${PROJECT_DIR_NAME}" '/^PROJECT_DIR=/ { print "PROJECT_DIR=" PROJECT_DIR_NAME; next } { print }' "$ENV_FILE" > "$ENV_FILE.tmp" && mv "$ENV_FILE.tmp" "$ENV_FILE"
    echo "Updated PROJECT_DIR in $ENV_FILE"
  else
    # Add the PROJECT_DIR variable if it does not exist
    echo "PROJECT_DIR=${PROJECT_DIR_NAME}" >> "$ENV_FILE"
    echo "Added PROJECT_DIR to $ENV_FILE"
  fi
else
  echo "$ENV_FILE does not exist. Creating the file and adding PROJECT_DIR."
  echo "PROJECT_DIR=${PROJECT_DIR_NAME}" > "$ENV_FILE"
fi

# Run the Docker Compose up command
docker compose up
