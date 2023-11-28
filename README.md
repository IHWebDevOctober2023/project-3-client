# Project 3: Full Stack Web App

This is the initial setup for project 3.

Fork this repository to your org account, then clone it to your local machine.
The rest of the team will clone the forked repository to their local machines as well.

## Setup dotenv
Once you have cloned the repository, create a `.env` file in the root of the project.
Add the following to the `.env` with your infomration:
```
VITE_SERVER_URL=http://localhost:5005
```
Vite uses this variable naming convention. The `VITE_` prefix is required. Make sure that the url for the server matches the port that you are using for your it.

Remember to update this readme file with your project description and routes.

## Routes table example

| Component | Path | Description |
|--------|------|-------------|
| UsersPage | /users | Display all the users|
| UserDetails | /users/:id | Sends back a single user object |
