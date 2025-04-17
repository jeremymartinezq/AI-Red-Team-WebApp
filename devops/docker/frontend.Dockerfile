FROM node:16-alpine

WORKDIR /app

# Install dependencies
COPY package.json package-lock.json* ./
RUN npm ci

# Copy the rest of the code
COPY . .

# Build and serve the application
ENV NODE_ENV=development
EXPOSE 3000

# Start the application in development mode
CMD ["npm", "start"] 