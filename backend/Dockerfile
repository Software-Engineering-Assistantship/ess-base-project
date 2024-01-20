FROM node:lts-iron
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY ./prisma prisma
COPY ./src src
RUN npx prisma generate
EXPOSE 5001
CMD ["npm", "start"]