FROM node:latest

WORKDIR /opt/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8004

CMD [ "npm", "run", "watch" ]
