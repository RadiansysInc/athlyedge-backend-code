# NestJS Project

## Services

1. NestJs [Framework]
2. Prisma [ORM]
3. Postgres [Database]
4. Docker [Container]
5. Other Dependencies
  a. class-transformer
  b. class-validator
  c. lodash
  d. jest

## Installation

```bash
$ npm install
$ npm run migrate:deploy
```

## Running the app

```bash
$ npm run start:dev
```

## Running the app in docker

```bash
$ npm run docker:up
```

## Test

```bash
# unit tests
$ npm run test

# test coverage
$ npm run test:cov
```

## Docker

```bash
# build docker image
$ docker build -t nestjs-project .

# run docker image
$ docker run -p 3000:3000 nestjs-project
```

## License

Nest is [MIT licensed](LICENSE).


## APP

Base URL: http://localhost:3000

Swagger Docs: http://localhost:3000/api

### Books Module

#### Create Book

```bash
POST /books
{
  "title": "Book Title",
  "ISBN": "1234567890"
}
```

#### Get All Books

```bash
GET /books
```

#### Get Book By Id

```bash
GET /books/:id
```

#### Update Book

```bash
PUT /books/:id
{
  "title": "Book Title",
}
```

#### Delete Book

```bash
DELETE /books/:id
```

## CI/CD [Github Actions]

1. Deploy
  - .github/workflows/build.yml

2. Validation
  - .github/workflows/pr.yml

3. Dependency Audit
  - .github/dependabot.yml