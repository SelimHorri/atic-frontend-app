
#stage1
FROM node as node
WORKDIR /app
COPY package.json .
RUN npm i
RUN npm run build

#stage 2
FROM nginx:alpine
COPY --from=node /app/dist/cita-frontend-app /usr/share/nginx/html




