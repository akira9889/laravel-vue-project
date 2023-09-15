include .env
export

up:
	docker compose up -d
local-build:
	docker compose build
init:
	@make local-build
	@make up
remake:
	@make destroy
	@make init
stop:
	docker compose stop
down:
	docker compose down --remove-orphans
restart:
	@make down
	@make up
destroy:
	docker compose down --rmi all --volumes --remove-orphans
destroy-volumes:
	docker compose down --volumes --remove-orphans
ps:
	docker compose ps -a
logs:
	docker compose logs
logs-watch:
	docker compose logs --follow
log-app:
	docker compose logs app
log-app-watch:
	docker compose logs --follow app
log-db:
	docker compose logs db
log-db-watch:
	docker compose logs --follow db
php:
	docker compose exec app bash
db:
	docker compose exec db bash
sql:
	docker compose exec db bash -c 'mysql -u$$MYSQL_USER -p$$MYSQL_PASSWORD $$MYSQL_DATABASE'
aws-auth:
	aws ecr get-login-password --region ap-northeast-1 | docker login --username AWS --password-stdin $${AWS_ACCOUNT_ID}.dkr.ecr.ap-northeast-1.amazonaws.com
prod-build:
	docker compose exec app bash -c 'npm run build'
	docker-compose -f docker-compose-fargate.yml build --no-cache
push:
	docker push $${AWS_ACCOUNT_ID}.dkr.ecr.ap-northeast-1.amazonaws.com/app:latest
	docker push $${AWS_ACCOUNT_ID}.dkr.ecr.ap-northeast-1.amazonaws.com/web:latest
build-push:
	@make aws-auth
	@make prod-build
	@make push
