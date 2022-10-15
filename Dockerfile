FROM node:18

#ENV Var
ENV port=5000
ENV NODE_PATH=./dist

# Create app directory
WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

# Bundle app source
COPY . .

EXPOSE ${port}

CMD [ "npm", "start" ]