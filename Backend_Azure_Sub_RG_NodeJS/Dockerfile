# Use an official Node.js runtime as a parent image
FROM node:14

# Set the working directory
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY package.json ./
COPY package-lock.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the application
COPY . ./

# Expose the port your application runs on
EXPOSE 5000

# Start the application
CMD ["node", "server.js"]
