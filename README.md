# N3xtcoder - Vue challenge!

This repository has been created as a starting point for our workshop. 

## Setup

All of the API server code is in the folder `./server`. To start development:

```
cd server
yarn install # or npm install (some warnings may occur, but usually nothing fatal)
cp .env.example .env # This contains the shared secret for the JWT auth
node .
```

## Using the API

The API will run at http://localhost:3000 and provides an auth endpoint:

### User

POST /user *Authenticates the user and provides a JWT*
Request body:
```
{ 
  "username":"user",
  "password":"password"
}
```
Responses:

200 Success - *The authentication was successful*
Example body:
```
{ 
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwidXNlcm5hbWUiOiJwYXRpZW50IiwicGFzc3dvcmQiOiJwYXNzd29yZCIsImRpc3BsYXlOYW1lIjoiSG9tZXIgU2ltcHNvbiIsInJvbGUiOiJwYXRpZW50IiwiaWF0IjoxNTA4NzYxNDA0LCJleHAiOjE1MDg4NDc4MDR9.VDIbyyDpV8_g_KjWQw4H6UDPpvSuYjpjxM1hZ-ukpZ0"
}
```

404 Not found - *The user could not be found*
401 Unauthorized - *Authentication failed*

### Curl example
```
# Login and capture the JWT
curl -H "Content-Type: application/json" \
     -XPOST \
     http://localhost:3000/user \
     -d '{"username":"user", "password":"password"}'
```

## Development/Testing

Test users

1. username: user
2. username: admin

Both use the password "password" for testing purposes.

## Coding on the UI

Once you are running the API in the background:
 
1. Work in ./vui-ui. 
```
yarn install
yarn dev
```
Then open your browser at: http://localhost:8080/ 

2. Add any new components to `src/components`
3. Add any new routes to `src/router/index.js`
4. Take a look at the authentication function provided in `src/utils/client.js`


## First challenge

For a quick and easy challenge to begin, first create a login form for the users. The form must:

- Submit JSON the the /user endpoint in a POST
- Capture the JWT and store it locally somehow for the next request
- Demonstrate the call to / returns 200 (passes authentication)
