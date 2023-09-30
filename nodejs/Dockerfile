FROM node:20.5.0

WORKDIR /app

COPY package*.json .

RUN npm install

COPY . .

RUN wget https://github.com/jwilder/dockerize/releases/download/v0.6.1/dockerize-linux-amd64-v0.6.1.tar.gz && \
    tar -C /usr/local/bin -xzvf dockerize-linux-amd64-v0.6.1.tar.gz && \
    rm dockerize-linux-amd64-v0.6.1.tar.gz

EXPOSE 3000

CMD ["dockerize", "-wait", "tcp://db:3306", "npm", "start"]