FROM alpine:3.14
MAINTAINER "amel@mahmuzic.de"
RUN  apk update && apk upgrade && \
     apk add apache2 && \
     apk add apache2-proxy && \
     apk add apache2-ssl && \
     rm -rf /var/cache/apk/*

ADD dist/fuse/ /var/www/localhost/htdocs

CMD  [ "/usr/sbin/httpd", "-D", "FOREGROUND"]