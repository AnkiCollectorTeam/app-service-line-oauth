# app-service-line-oauth
Microservice for LINE OAuth login.

## Basic usage

1. install dependencies
2. `cp .env.example .env`
3. Modify .env file to fit your application configuration
4. `npm start`

## callback response
```json
{
    "success":true,
    "data":
    {
        "name":"USER NAME",
        "email":"EMAIL",
        "id":"USER_ID",
        "picture":"USER PICTURE URL"
    }
}

{
    "success":false,
    "msg":"ERROR MSG"
}
```

## TODO
- [X] How to set logging level?
- [X] Connect to MongoDB
- [X] Docker .env problem
- [ ] Docker Container can not connect to other container?
- [ ] Test if all function work properly
- [ ] Reduced code


## Docker Hub
https://hub.docker.com/repository/docker/o2range/line-oauth 
