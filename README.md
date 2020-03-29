# Tiny Social Network
A tiny Social Network created with the course of Practical Node by Platzi, I'm using:
* NodeJS
* Express
* Relational Database
* Microservices

[![JavaScript Style Guide](https://cdn.rawgit.com/standard/standard/master/badge.svg)](https://github.com/standard/standard)

## Setup & Run
```
npm install
```
You need to set enviroment variables in .env file, review the .env_example file

You need to run:
```
nodemon api/index.js
nodemon post/index.js
nodemon mysql/index.js
nodemon cache/index.js
nodemon post/index.js
```

Or add each service with PM2
```
pm2 start api/index.js --name api
pm2 start post/index.js --name post
pm2 start mysql/index.js --name mysql
pm2 start cache/index.js --name cache
pm2 start post/index.js --name post
```


## API Docs
[Documentation](https://documenter.getpostman.com/view/10173686/SzYW2zTy)

## More info
* [Curso práctico de Node](https://platzi.com/clases/practico-node/)