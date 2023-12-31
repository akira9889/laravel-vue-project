# https://hub.docker.com/_/phpにあるイメージファイルを指定
FROM php:8.1.0-fpm

ARG ENVIRONMENT
# RUNコマンドは、buildしたときに元となるdockerイメージに対して実行する処理を記述する。
# \（バックスラッシュ）を用いて、複数行に分けることが可能。
# パッケージ一覧を更新
RUN apt update \
    # zlibはデータの圧縮に関するアルゴリズムをライブラリ化したもの
    # vimをインストール
    # MariaDBデータベースのクライアントアプリケーションである「mysql」を使えるように「mariadb-client」をインストール
    # libzip-devはzip圧縮時に必要となるライブラリ(libzip は、zlib を使用する)
    && apt install -y mariadb-client vim zlib1g-dev libzip-dev libpng-dev libjpeg62-turbo-dev\
    # docker-php-ext-installはPHPに標準で備わっている拡張パッケージのインストール＆有効化ができるコマンド
    # PDO_MYSQL は、PHP から MySQL データベースへのアクセスを可能にするための PHP Data Objects (PDO) インターフェイス を実装したドライバ。
    && docker-php-ext-install zip pdo_mysql \
    && apt install -y git
    #gdのインストール
    # && docker-php-ext-configure gd --with-jpeg \
    # && docker-php-ext-install -j$(nproc) gd \
    # # xdebugのインストール
    # && pecl install xdebug \
    # && docker-php-ext-enable xdebug

# Composerのインストール & パス通す
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# nodeインストール(aptだとNodejsは古いため、パッケージマネージャの n を使用してインストール)
RUN apt install -y npm \
    && npm install n -g \
    && n stable

# RUN , CMD , ENTRYPOINT , COPY , ADD を実行する時のワーキングディレクトリを指定
WORKDIR /var/www/html

COPY ./src/ /var/www/html
COPY ./docker/php/php.ini /usr/local/etc/php/php.ini

COPY ./docker/start.sh /start.sh
RUN chmod +x /start.sh

# デプロイ時
RUN if [ "$ENVIRONMENT" = "production" ]; then \
    composer install  --no-dev --optimize-autoloader && \
    php artisan cache:clear && \
    php artisan config:clear && \
    chmod -R 777 storage; \
    fi

CMD [ "/start.sh" ]
