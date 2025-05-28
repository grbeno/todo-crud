FROM node:18

WORKDIR /frontend

COPY package*.json /frontend/
RUN npm install

COPY . .

RUN chmod +x /frontend/entrypoint.sh
ENTRYPOINT ["/frontend/entrypoint.sh"]