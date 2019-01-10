FROM node:alpine AS build

ARG REACT_APP_GOOGLE_KEY
ARG REACT_APP_API_URL

ENV REACT_APP_GOOGLE_KEY=$REACT_APP_GOOGLE_KEY
ENV REACT_APP_API_URL=$REACT_APP_API_URL

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN CI=true npm run coverage
RUN npm run build

CMD ["npm", "run", "production"]