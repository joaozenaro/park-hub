FROM alpine:3.19

WORKDIR /var/www/

RUN ln -snf /usr/share/zoneinfo/UTC /etc/localtime && echo UTC > /etc/timezone

RUN apk add --no-cache --update \
    sudo curl bash git supervisor nodejs npm \
    php \
    php83 php83-bcmath \
    php83-bz2 php83-calendar \
    php83-common php83-ctype \
    php83-curl php83-dom \
    php83-gd php83-iconv \
    php83-mbstring php83-mysqli \
    php83-mysqlnd php83-openssl \
    php83-pdo_mysql php83-pdo_sqlite \
    php83-phar php83-session php83-xml \
    php83-tokenizer php83-pecl-xdebug \
    php83-exif php83-fileinfo \
    php83-ftp php83-gettext \
    php83-json php83-imap \
    php83-intl php83-ldap \
    php83-opcache php83-pcntl \
    php83-posix php83-simplexml \
    php83-sodium php83-xmlreader \
    php83-xmlwriter php83-zip

RUN ln -s /usr/bin/php83 /usr/bin/php

RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

RUN addgroup -g 1337 vscode && \
    adduser -D -s /bin/bash -G vscode -u 1337 vscode && \
    echo "vscode ALL=(root) NOPASSWD:ALL" > /etc/sudoers.d/vscode && \
    chmod 0440 /etc/sudoers.d/vscode

COPY config/php.ini /etc/php83/php.ini