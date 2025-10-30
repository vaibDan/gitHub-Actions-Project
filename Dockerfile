# ---- Stage 1: Build ----
# Use an official Node.js image as the builder environment.
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies. Using --only=production for cleaner prod dependencies
RUN npm install --only=production

# Copy the rest of the application source code
COPY . .

# ---- Stage 2: Production ----
# Use a smaller, more secure base image for the final product
FROM node:18-alpine

WORKDIR /app

# Copy dependencies from the builder stage
COPY --from=builder /app/node_modules ./node_modules

# Copy application code from the builder stage
COPY --from=builder /app .

# Expose the port the app runs on
EXPOSE 3000

# The command to run the application
CMD ["node", "index.js"]