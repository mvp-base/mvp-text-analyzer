FROM node:18

WORKDIR /usr/src/app

ARG NEXT_PUBLIC_TEXT_RAZOR_API_KEY
ENV NEXT_PUBLIC_TEXT_RAZOR_API_KEY=$NEXT_PUBLIC_TEXT_RAZOR_API_KEY

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start"]