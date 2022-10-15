FROM node:18

#Enironment variables
ENV port=5000
ENV NODE_PATH=./dist

# Create app directory
WORKDIR /usr/src/app

#Copy app directory
COPY package*.json ./
RUN npm install\
        && npm install typescript -g

# Bundle app source
COPY . .

#Compile TypeScript
RUN tsc

#Expose server port
EXPOSE ${port}

#Start server
CMD [ "npm", "start" ]