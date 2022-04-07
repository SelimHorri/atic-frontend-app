
#stage1
FROM node as node
RUN mkdir -p /home/app
WORKDIR /home/app
COPY . .
ARG PROFILE=staging
RUN npm i
RUN npm run build --configuration=${PROFILE}

#stage 2
FROM nginx:alpine
COPY --from=node /home/app/dist/cita-frontend-app /usr/share/nginx/html




