FROM node:alpine AS build

ARG REACT_APP_GOOGLE_KEY
ARG REACT_APP_API_URL
ARG REACT_APP_CAPTCHA_PUBLIC

ENV REACT_APP_GOOGLE_KEY=$REACT_APP_GOOGLE_KEY \
    REACT_APP_API_URL=$REACT_APP_API_URL \
    REACT_APP_CAPTCHA_PUBLIC=$REACT_APP_CAPTCHA_PUBLIC

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
ENV NODE_ENV=production
RUN npm run build
CMD ["npm", "run", "production"]