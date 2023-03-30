# User Service

To start the project, create an `.env` file at the root of the project

```bash
APP_PORT=3000
MONGODB_URL=mongodb://mongodb:27017/users
```

You can start the project using the following command

```bash
docker-compose up --build
```

## Endpoints

In **all** http calls you must have the header `Accept:application/json`. In http requests made with http POST verb you need to set the header `Content-Type:application/json`.

On the root dir there is a file called user-service-v2.postman_collection.json that you can import in your postman to see the API requests, but here isis all the info about the endpoints anyway:


POST `http://localhost:3000/api/user)`:

BODY:
```json
{
    "first_name": "Antonio",
    "last_name": "Padua",
    "birth_date": "1999-09-22",
    "street": "Av Protasio Alves",
    "city": "Porto Alegre",
    "state": "Rio Grande do Sul",
    "job_title": "Software Engineer",
    "phone_number": "5551986179111"
}
```

GET `http://localhost:3000/api/user/)`:

RESPONSE BODY:
```json
[
    {
        "_id": "6425f4ac0801e6d66b99daaf",
        "first_name": "Antonio",
        "last_name": "Padua",
        "birth_date": "1999-09-22",
        "street": "Av Protasio Alves",
        "city": "Porto Alegre",
        "state": "Rio Grande do Sul",
        "job_title": "Software Engineer",
        "phone_number": "5551986179111",
        "created_at": "2023-03-30T20:44:28.615Z",
        "updated_at": "2023-03-30T20:44:28.615Z",
        "__v": 0
    },
    {
        "_id": "6425f68e070f17396a86727f",
        "first_name": "Antonio",
        "last_name": "Padua",
        "birth_date": "1999-09-22",
        "street": "Av Protasio Alves",
        "city": "Porto Alegre",
        "state": "Rio Grande do Sul",
        "job_title": "Software Engineer",
        "phone_number": "5551986179111",
        "created_at": "2023-03-30T20:52:30.671Z",
        "updated_at": "2023-03-30T20:52:30.671Z",
        "__v": 0
    }
]
```

POST `http://localhost:3000/api/user/:userId/photo)`:

`Content-Type:multipart/form-data`

{
    image: (your image)
}
```json
[
    {
    "user_id": "6425f4ac0801e6d66b99daaf",
    "file_system_path": "static/6425f4ac0801e6d66b99daaf.png",
    "file_name": "6425f4ac0801e6d66b99daaf.png",
    "_id": "6425f691070f17396a867281",
    "created_at": "2023-03-30T20:52:33.087Z",
    "updated_at": "2023-03-30T20:52:33.087Z",
    "__v": 0
}
]
```


GET `http://localhost:3000/api/user/:userId/photo)`:

`Content-Type:multipart/form-data`

BODY: (your image);
