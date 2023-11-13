FROM node:20.9.0-alpine3.18

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

RUN printf "npm run migrate:deploy \nnode dist/src/main" > entrypoint.sh

EXPOSE 3000

CMD ["/bin/sh", "entrypoint.sh"]
