build-dev:
	cd graphql-be-server && docker build -t api-server .
	cd apollo-gen-web && docker build -t react-web . 

run-dev:
	docker compose --env-file ./graphql-be-server/.env up

# run-dev:
# 	docker compose up