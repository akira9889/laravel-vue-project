#/!bin/bash

if [ ! -f "vendor/autoload.php" ]; then
    composer install --no-ansi --no-dev --no-interaction --no-plugins --no-progress --no-scripts --optimize-autoloader
fi

if [ "$APP_ENV" = "production" ]; then
  # 本番環境で実行するコマンド
  php artisan config:cache --env=production --force
  php artisan migrate --force
  php-fpm
else
  # 本番環境以外で実行するコマンド
  php-fpm
fi
