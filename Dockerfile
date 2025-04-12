# Uses official Node.js Alpine image
FROM node:22.14.0-alpine

# Creates and uses the /app directory
WORKDIR /app

# Copy only package.json and package-lock.json first
COPY package*.json ./

# Installs the dependencies
RUN npm install

# Copies the rest of the project files
COPY . .

# Sets the PORT environment variable within the container, (fallback)
ENV PORT=3000

# Exposes a port so Docker can map to it
EXPOSE 3000

# Starts the app
CMD ["npm", "start"]
