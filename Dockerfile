FROM node:20

RUN npm i -g @nestjs/cli

COPY package.json .

COPY . /code

WORKDIR /code

CMD npm run start:dev