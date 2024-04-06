
# Project Outline

This project is a simple nodejs backend api used to search for characters from the Star Wars Movies.

1. NodeJS backend
2. MongoDB
3. The Starwars API

## Code

First clone the repo git clone git@github.com:sanjuro/starwars.git and enter the project folder. These instructions are meant for MacOS.

## Database ( MongoDB )

### Setup
1. Install mongo with homebrew
    ```shell
    brew tap mongodb/brew
    brew install mongodb-community
    sudo mkdir -p /System/Volumes/Data/data/db
    sudo chown -R `id -un` /System/Volumes/Data/data/db
    sudo mongod --dbpath /System/Volumes/Data/data/db
    ```
2. Using a tool to interface with your MongoDB, create a new database named starwars_cache.

## Backend ( NodeJS )

The backend application is built with NodeJS and so requires Node v21.7.2 installed.

### Setup
1. From project root
    ```shell
    npm install
    ```
2. Next we run the server
    ```shell
    npm start
    ```

The server should be up and running and would output something along the lines of what you see below:


> starwars-api@1.0.0 start
> node server.js
```shell
(node:72489) [DEP0040] DeprecationWarning: The `punycode` module is deprecated. Please use a userland alternative instead.
(Use `node --trace-deprecation ...` to show where the warning was created)
(node:72489) [MONGOOSE] DeprecationWarning: Mongoose: the `strictQuery` option will be switched back to `false` by default in Mongoose 7. Use `mongoose.set('strictQuery', false);` if you want to prepare for this change. Or use `mongoose.set('strictQuery', true);` to suppress this warning.
Server is running on port 3000
Connected to MongoDB
GET /api/search?query=Luke 200 1243.878 ms - 699
GET /api/user/details 200 8.753 ms - 183
 ```

At this point, you will need to create a new user using the signup endpioint, next login via the login endpoint. You should now be able to access the searching endpoint. I have included my postman collection.

