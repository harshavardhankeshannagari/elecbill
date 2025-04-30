# Step 1: Build the React app
FROM node:16 as build

# Step 2: Set working directory in the container
WORKDIR /app

# Step 3: Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Step 4: Install dependencies
RUN npm install

# Step 5: Copy the rest of the application code
COPY . ./

# Step 6: Build the React app
RUN npm run build

# Step 7: Use a stable Nginx image to serve the built React app
FROM nginx:latest

# Step 8: Copy the build files to the Nginx web server directory
COPY --from=build /app/build /usr/share/nginx/html

# Step 9: Expose port 80 to access the app
EXPOSE 80

# Step 10: Start Nginx
CMD ["nginx", "-g", "daemon off;"]
