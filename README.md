# Setup
1. Install [Docker](https://www.docker.com/)
2. Install [Node.js](https://nodejs.org/en/download/) version > 12.10.0
3. Install [Yarn](https://classic.yarnpkg.com/)

# Run
1. Navigate to code folder
2. `yarn start`

All database schema will automatically migrate.
For users in system, create a user.json in oauth2/oauth2backend with the following content
```
[
    {
        "name":"name",
        "password":"password",
        "role":"role"
    }
]
```