# ANSI color codes
BOLD_YELLOW='\033[1;33m'
GREEN='\033[1;32m'
LGREEN='\033[1;33m'
BLUE='\033[1;34m'
NC='\033[0m' # No Color

# ASCII art of a fountain pen nib
echo "${BLUE}"
cat << "EOF"

                                                         
                            :=*%*                                   
   /#####              .:=*%@@@@@@@=                                 
  ####### .#+=- .:-+*%@@@@@@@@@@@@@@@*:                              
  ####### .@@@@:#@@@@@@@@@@@@@@@@@@@@@@@*-.                          
  ####### .@@@@:#@@@@@@@@@@@@@@@@@@@@@@@@@@@#=:                      
  ####### .@@@@:#@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@%*=-.                
  ####### .@@@@:#@@@@@@@@#.  :#@@@@@@@@@@@@@@@@@@@@@@%#+=-:--        
  ####### .@@@@:#@@@@@@@@=    =++++++++++++++++++++++++++-:-=        
  ####### .@@@@:#@@@@@@@@@*=+#@@@@@@@@@@@@@@@@@@@@@#*=:.             
  ####### .@@@@:#@@@@@@@@@@@@@@@@@@@@@@@@@@@@@#+-.                   
  ####### .@@@@:#@@@@@@@@@@@@@@@@@@@@@@@@%+-.                        
  ####### .@@@%.=#%@@@@@@@@@@@@@@@@@@@#=.                            
  #######  :.       .-=+#@@@@@@@@@@@+.                               
   \#####                 .:=*#@@@=                                  
                              ..           

   __                  _        _                          
  / _|                | |      (_)                         
 | |_ ___  _   _ _ __ | |_ __ _ _ _ __    _ __   ___ _ __  
 |  _/ _ \| | | | '_ \| __/ _` | | '_ \  | '_ \ / _ \ '_ \ 
 | || (_) | |_| | | | | || (_| | | | | | | |_) |  __/ | | |
 |_| \___/ \__,_|_| |_|\__\__,_|_|_| |_| | .__/ \___|_| |_|
                                         | |               
                                         |_|                                      
                                                                                                                                      
EOF
echo "${NC}"

#!/bin/bash

# Base directory containing data folders
DATA_DIR="data"

# Ensure the .env.local file exists
ENV_FILE=".env.local"
if [ ! -f "$ENV_FILE" ]; then
  touch "$ENV_FILE"
fi

# List existing directories in the data folder
echo "Select a Project:"
count=1
directories=()
for dir in "$DATA_DIR"/*/; do
  dirname=$(basename "$dir")
  echo "${GREEN}$count) $dirname${NC}"
  directories+=("$dirname")
  ((count++))
done
echo "Or"
echo "${GREEN}0) Create new project${NC}"

# Read user input
echo "Enter a project number:"
read -r choice

if [ "$choice" -eq 0 ]; then
  # Create new directory
  echo "Enter new project name. Please DO NOT use spaces in the name:"
  read -r new_dir
  new_path="$DATA_DIR/$new_dir"
  
  # Create new directory structure
  mkdir -p "$new_path/wd"
  mkdir -p "$new_path/documents"
  
  # Set the PROJECT_DIR environment variable using awk
  awk '!/^PROJECT_DIR=/' "$ENV_FILE" > temp && mv temp "$ENV_FILE"
  echo "PROJECT_DIR=$new_dir" >> "$ENV_FILE"
  echo "New project '$new_dir' created."
  echo "Starting docker container"
else
  # Check if the choice is valid
  if [ "$choice" -ge 1 ] && [ "$choice" -le "${#directories[@]}" ]; then
    selected_dir="${directories[$choice-1]}"
    # Set the PROJECT_DIR environment variable using awk
    awk '!/^PROJECT_DIR=/' "$ENV_FILE" > temp && mv temp "$ENV_FILE"
    echo "PROJECT_DIR=$selected_dir" >> "$ENV_FILE"
    echo "Existing project '$selected_dir' selected."
    echo "Starting docker container"
  else
    echo "Invalid choice. Exiting."
    exit 1
  fi
fi

docker compose up