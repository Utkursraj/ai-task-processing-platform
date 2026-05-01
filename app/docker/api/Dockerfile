FROM node:20-alpine

WORKDIR /app

COPY apps/api/package*.json ./

RUN npm install --omit=dev

COPY apps/api .

RUN addgroup -S appgroup && adduser -S appuser -G appgroup

USER appuser

EXPOSE 5000

CMD ["node", "src/server.js"]