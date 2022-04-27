.PHONY: install dev build heroku deploy admin clean

HEROKU_APP=xstrapi

install: # Install all dependencies
	npm ci

dev: # Start Strapi for local development
	NODE_ENV=development npm run develop

build: # Build Strapi CMS
	npm run build

heroku: # Pair Heroku
	heroku git:remote -a ${HEROKU_APP}

deploy: # Deploy to Heroku
	git push heroku master

admin: # Strapi GUI development
	npx strapi develop --watch-admin

clean: # Clean strapi files
	rm -rf .cache
	rm -rf build
