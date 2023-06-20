# pull the official base image
FROM node:16-alpine

# set your working directory
WORKDIR /usr/src/app

# Copy package*.json files first for better caching
COPY package*.json ./

# install your application's dependencies
RUN npm install --legacy-peer-deps

# copy the rest of your app's source code
COPY . . 

# build your app
RUN npm run build

# start your app
CMD ["npm", "start"]
