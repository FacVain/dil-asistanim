# Bil496_Bitirme

## Docker Setup
To delete if any previous container and its volumes:
```sh
docker compose down --volumes
```
To start up new container:
```sh
docker compose up -d
```
To enter docker container using psql:
```sh
docker exec -it postgres psql -U admin -d dilasistanimdb
```

## Backend
```sh
npm i
```
```sh
npx nodemon gpt-server.js
```
