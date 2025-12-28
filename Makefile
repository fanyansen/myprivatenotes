run-db:
	docker-compose -f docker-compose.dev.yml up

build:
	cd graphql-be-server && docker build -t api-server .
	cd apollo-gen-web && docker build -t react-web . 

run:
	docker compose --env-file ./graphql-be-server/.env up

# run:
# 	docker compose up

build-run: 
	${MAKE} build && ${MAKE} run