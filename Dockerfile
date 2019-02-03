FROM node:alpine AS build

ARG REACT_APP_GOOGLE_KEY

ENV REACT_APP_GOOGLE_KEY=$REACT_APP_GOOGLE_KEY \
		REACT_APP_API_URL=https://cms.4h.wendte.tech/api

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
ENV NODE_ENV=production
RUN npm run build
CMD ["npm", "run", "production"]