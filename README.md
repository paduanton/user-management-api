# User Service

To start the project, create an `.env` file at the root of the project

```bash
APP_PORT=3000
MONGODB_URL=mongodb://mongodb:27017/users
USER_API_BASE_URL=https://reqres.in/api
```

If you directly using your working machine and MongoDB installed on your machine

```bash
APP_PORT=3000
MONGODB_URL=mongodb://mongodb:27017/users
USER_API_BASE_URL=https://reqres.in/api
```

You can start the project using the following command

```bash
docker-compose up --build
```

OR

```bash
yarn start:dev
```

## Endpoints

In **all** http calls you must have the header `Accept:application/json`. In http requests made with http POST verb you need to set the header `Content-Type:application/json`.

On the root dir there is a file called user-service.postman_collection.json that you can import in your postman, but below there is all the info about the endpoints anyway:


POST `http://localhost:3000/api/user)`:

BODY:
```json
{
    "email": "george.bluth@reqres.in",
    "first_name": "George",
    "last_name": "Bluth",
    "profilePhoto_url": "https://reqres.in/img/faces/1-image.jpg"
}
```

GET `http://localhost:3000/api/user/1)`:

RESPONSE BODY:
```json
{
    "email": "george.bluth@reqres.in",
    "first_name": "George",
    "last_name": "Bluth",
    "profilePhoto": "https://reqres.in/img/faces/1-image.jpg"
}
```

GET `http://localhost:3000/api/user/1/profilePhoto)`:

RESPONSE BODY:
```json
{
    "_id": "641e7fee16d46bf32986fe30",
    "user_id": "1",
    "hash": "data:imagLjTA487XafqcyeK7xxctd/2WF2n3ICufWHnxwm4I+IIpfUgpoU+lCcRQuetpAU+6WWO6jv8ANMF4qZ90D6HQfgP3L/FJ5x9kSn8VLZCPh2//2Q==",
    "file_system_path": "./static/1.jpg",
    "created_at": "2023-03-25T05:00:30.393Z",
    "updated_at": "2023-03-25T05:00:30.393Z",
    "__v": 0
}
```

DELETE  `http://localhost:3000/api/user/1/profilePhoto)`:

RESPONSE BODY:
```json
{
    "_id": "641e7fee16d46bf32986fe30",
    "user_id": "1",
    "hash": "data:imagLjTA487XafqcyeK7xxctd/2WF2n3ICufWHnxwm4I+IIpfUgpoU+lCcRQuetpAU+6WWO6jv8ANMF4qZ90D6HQfgP3L/FJ5x9kSn8VLZCPh2//2Q==",
    "file_system_path": "./static/1.jpg",
    "created_at": "2023-03-25T05:00:30.393Z",
    "updated_at": "2023-03-25T05:00:30.393Z",
    "__v": 0
}
```