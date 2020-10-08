DOCKER_POSTGRES=xstrapi-stackuj

# ################################################
# Development ####################################
# ################################################

install: # Install all dependencies
	npm ci

dev: # Start Strapi for local development
	npm run develop

build: # Build Strapi CMS
	npm run build

# ################################################
# Docker #########################################
# ################################################

loc-postgres-stop: ## Stop Postgres for local development
	docker stop ${DOCKER_POSTGRES} || true
	docker rm ${DOCKER_POSTGRES} || true

loc-postgres: loc-postgres-stop ## Run Postgres for local development
	docker run -it -d -p 5432:5432 --name ${DOCKER_POSTGRES} -e POSTGRES_PASSWORD=strapi -e POSTGRES_USER=strapi dockette/postgres:10
