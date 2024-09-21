# Use Bun official base image
FROM oven/bun:1.0.0 as builder

# Set the working directory inside the container
WORKDIR /app

# Copy package.json, bun.lockb and other necessary files
COPY package.json bun.lockb ./

# Install dependencies using Bun
RUN bun install

# Copy the rest of the application code
COPY . .

# Build the Next.js app
RUN bun run build

# Production stage
FROM oven/bun:1.0.0 as runner

# Set the working directory inside the container
WORKDIR /app

# Copy built files and node_modules from the builder stage
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./
COPY --from=builder /app/node_modules ./node_modules

# Expose the port the app runs on
EXPOSE 3000

# Start the application using Bun
CMD ["bun", "run", "start"]
