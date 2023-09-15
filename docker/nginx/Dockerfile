FROM nginx:alpine

ARG UPSTREAM_NAME
ARG FPM_PORT

COPY ./docker/nginx/nginx.conf /etc/nginx/nginx.conf
COPY ./docker/nginx/default.conf /etc/nginx/conf.d/default.conf
COPY ./src/ /var/www/html

RUN sed -ie "s/{UPSTREAM_NAME}/${UPSTREAM_NAME}/g" /etc/nginx/conf.d/default.conf
RUN sed -ie "s/{FPM_PORT}/${FPM_PORT}/g" /etc/nginx/conf.d/default.conf

EXPOSE 80
