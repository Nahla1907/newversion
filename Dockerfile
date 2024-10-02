# # Use the official Node.js image from Docker Hub
# FROM node:18

# # Set the working directory inside the container
# WORKDIR /app

# # Copy package.json and package-lock.json (if it exists)
# COPY package*.json ./

# # Install dependencies
# RUN npm install

# # Copy the rest of your application code
# COPY . .

# # Expose the port your app runs on
# EXPOSE 5000

# # Command to run your app
# CMD ["npm", "start"]


# Use an official Node.js runtime as the base image
FROM node:14

# Set the working directory to where your project files are located
WORKDIR /src

# Copy package.json and package-lock.json to the /src directory
COPY package.json package-lock.json /src/

# Install dependencies
RUN npm install

# Copy the rest of the application code to /src
COPY . /src

# Expose the port your app runs on
EXPOSE 5000

# Start the app by running server.js from src
CMD ["node", "src/server.js"]

