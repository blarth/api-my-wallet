
# My Wallet API

## About this project

This is the myWallet app api. Built with NodeJS + Express + MongoDB. It manages users and their data.

The Front-end GitHub may be acessed : https://github.com/blarth/my-wallet-react

## Why?

Full-Stack projects need to be done so I can start to understand better all parts of an application.

## Functionalities

- Login with bcrypt authorization
- Sign-up with uuid token
- Create entries
- Read entries in DB
- Update entry by ID
- Delete entry by ID

## Routes used by the client

Base URL: https://apimy-wallet.herokuapp.com)

- Login: POST on '/login'
- Sign-up: POST on '/sign-up'
- Create entries: POST on '/entries'
- Read entries in DB: GET on '/wallet'
- Update entry by ID: PUT on '/entry/:idEntry'
- Delete entry by ID: DELETE on '/entry/:idEntry'

## Technologies used

- ![JavaScript](https://img.shields.io/badge/-JavaScript-05122A?style=flat&logo=javascript)&nbsp;
  ![Node.js](https://img.shields.io/badge/-Node.js-05122A?style=flat&logo=node.js)&nbsp;
  ![Express](https://img.shields.io/badge/-Express-05122A?style=flat&logo=express)&nbsp;
  ![MongoDB](https://img.shields.io/badge/-MongoDB-05122A?style=flat&logo=MongoDB)

## How to install this api

**Cloning the Repository**

```
$ git clone git@github.com:blarth/api-my-wallet.git

```

**Installing dependencies**

You need to install npm, learn more about it [here](https://docs.npmjs.com/getting-started).
Then, run the command inside the project directory:

```
$ yarn
```

_or_

```
$ npm install
```

**Configuring dev environment variables**

You must create a .env file at the root of the project directory with the contents:

```
MONGO_URI=your_mong_server
DIF=your_salt
```

And you also must substitute the values of the variables to your liking.

## How to run this app

With all dependencies installed and the environment properly configured, you can now run the app in development mode (run this command inside the project directory):

```
$ npm run start
```


