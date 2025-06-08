# Home Library Service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Downloading

```
git clone {repository URL}
```

## ENV

Copy content from .env.example to .env file

## Installing NPM modules

```
npm install
```

## Running application

If you have already run the images - ``` docker-compose down ```
then:

```
docker-compose up --build
```
App will run on 4000 port by default (if no env specified).


## Running database migrations:

Before testing, generate and run database migrations:

``` npm run migration:generate ```

after that:

``` npm run migration:run ```

## Testing

After application running open new terminal and enter:

To run all tests

```
npm run test
```

To run only one of all test suites

```
npm run test -- <path to suite>
```

### Auto-fix and format

```
npm run lint
```

```
npm run format
```
