FROM node:alpine AS build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ENV myName John Doe

ENV myNameEr John Doe

RUN REACT_APP_GOOGLE_KEY=${myNameEr} npm run build

CMD ["npm", "run", "production"]