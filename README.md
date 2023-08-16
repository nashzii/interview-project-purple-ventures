## To start server
```bash
docker build -t nestjs-app .
```
```bash
docker network create app-network
```
```bash
docker run -d --name mongodb -p 27017:27017 \
    --network app-network \
    -e MONGO_INITDB_ROOT_USERNAME=admin \
    -e MONGO_INITDB_ROOT_PASSWORD=admin123 \
    mongo
```
```bash
docker run -d --name nestjs-app -p 3000:3000 \
    --network app-network \
    nestjs-app
```