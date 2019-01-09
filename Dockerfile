FROM node:alpine AS build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ARG REACT_APP_GOOGLE_KEY
ARG REACT_APP_API_URL

ENV REACT_APP_GOOGLE_KEY=$REACT_APP_GOOGLE_KEY
ENV REACT_APP_API_URL=$REACT_APP_API_URL

RUN npm run build

CMD ["npm", "run", "production"]