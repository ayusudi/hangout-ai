# Hangout AI Server

> https://hangout-ai.vercel.app  
> https://hangout-ai-c81439a5ea16.herokuapp.com

This server powers Hangout AI, an AI-powered travel guide that generates personalized itineraries for Jakarta, Singapore, and Kuala Lumpur. With a database of over 500+ locations, our AI curates a seamless travel experience tailored just for you.

**Developed by** :  
- [@ayusudi](https://www.linkedin.com/in/ayusudi/)
- [@luthfiarifin](https://www.linkedin.com/in/luthfiarifin/)

---

# Table of contents
- [Documentation](#documentation)
- [List Endpoints ](#list-endpoints)
- [Models DB For This Server](#models-db-for-this-server)
- [How To Run The App Locally ](#how-to-run-the-app-locally)
- [ENV Template](#env-template)
- [Config](#configconfigjson)

## Documentation
For more information, visit the [documentation](https://hangout-ai-c81439a5ea16.herokuapp.com/docs). We provide swagger docummentation.

## List Endpoints 

| METHOD | ENDPOINT | AUTH | AUTHZ | DESCRIPTION |
| --- | --- | --- | --- | --- |
| GET | / | | | For check server is running or not |
| POST | /social-login | | | For google login | 
| POST | /generate | TRUE | | For generate itenary |
| GET | /chats | TRUE | | For get list of chat |
| GET | /chats/:id | TRUE | | For get chat messages by id |
| POST | /chats/:id | TRUE | TRUE | For edit messages by id |


## Models DB For This Server 

We have two servers (Node.js and Python). Features that do not involve LLM processing are coded here. We use three model tables: User and Chat are utilized here, while MetaLocations is only for migration and seeding. The feature is implemented in a serverless environment using TiDB Serverless. 


### User Model

- **`id`**: Primary key, auto-incrementing `INTEGER`.
- **`name`**: User's name (`STRING`).
- **`email`**: User's email (`STRING`).
- **`image`**: User's image (`STRING`).
- **`createdAt`** & **`updatedAt`**: Timestamps (`DATE`), not nullable.

### Chat Model

- **`id`**: Primary key, auto-incrementing `INTEGER`.
- **`name`**: Chat name (`STRING`).
- **`messages`**: Chat messages in JSON format.
- **`address`**: Chat location address (`STRING`).
- **`latitude`** & **`longitude`**: Location coordinates (`STRING`).
- **`UserId`**: Foreign key to `Users` table (`INTEGER`).
- **`createdAt`** & **`updatedAt`**: Timestamps (`DATE`), not nullable.

### MetaLocations Model 

- **`id`**: Primary key, auto-incrementing `INTEGER`.
- **`title`**: Title or name of the location (`STRING`).
- **`link`**: URL or link related to the location (`TEXT`).
- **`cid`**: Unique identifier for the location (`STRING`).
- **`category`**: Category or type of the location (`STRING`).
- **`review_rating`**: Review rating for the location (`STRING`).
- **`latitude`**: Latitude coordinate of the location (`STRING`).
- **`longitude`**: Longitude coordinate of the location (`STRING`).
- **`timezone`**: Timezone information of the location (`STRING`).
- **`images`**: JSON array of images related to the location (`JSON`).
- **`createdAt`** & **`updatedAt`**: Timestamps for record creation and last update (`DATE`), not nullable.

## How to run the app locally 
1. npm install all the package 
```bash
npm install 
```
2. fill the .env & config/config.json
3. run app.js 
```bash
npm run start
```

## ENV Template
```
GSIGN_CLIENTID=
GSIGN_CLIENTSECRET=
PORT=
SECRET=
```

## config/config.json
```json
{
  "development": {
    "username": "YOUR_USERNAME",
    "password": "YOUR_PASSWORD",
    "database": "YOUR_DM",
    "host": "CHANGETHISGATEWAY.prod.aws.tidbcloud.com",
    "port": "YOUR_PORT",
    "dialect": "mysql",
    "dialectOptions": {
      "ssl": {
        "minVersion": "YOUR_MINVERSIION",
        "rejectUnauthorized": true,
        "ca": null
      }
    }
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "YOUR_USERNAME",
    "password": "YOUR_PASSWORD",
    "database": "YOUR_DM",
    "host": "CHANGETHISGATEWAY.prod.aws.tidbcloud.com",
    "port": "YOUR_PORT",
    "dialect": "mysql",
    "dialectOptions": {
      "ssl": {
        "minVersion": "YOUR_MINVERSIION",
        "rejectUnauthorized": true,
        "ca": null
      }
    }
  }
}
```
