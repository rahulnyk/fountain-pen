# Use the official Node.js 18 image as the base image
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY package*.json ./

RUN apk add --no-cache python3 make g++

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Remove data and documents folder. 
RUN rm -rf ./data
RUN rm -rf ./documents

# Build the application
RUN npm run build

# Expose the port the app runs on
EXPOSE 3000

# Set the environment variable for production
ENV NODE_ENV=production

# Start the application
CMD ["npm", "start"]
