
#stage1
FROM node as node
WORKDIR /app
COPY . .
RUN npm i
RUN npm run build --configuration=staging

#stage 2
FROM nginx:alpine
COPY --from=node /app/dist/cita-frontend-app /usr/share/nginx/html




