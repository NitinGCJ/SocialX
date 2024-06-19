# SocialX
The project is a social media website where people can make friends, make posts and see each others posts.
The backend of the project is made in Express, For the frontend React is used and MongoDB is used for the database.


## How to Set Up the project.

First make two folder in you directory as frontend and backend.

For the backend folder just copy the contents of the backend folder of the repo and paste it to your folder.
Then just run this command to install the dependencies.

```bash
# Install dependencies
npm install
```
For frontend, Set up a vite react project in your directory and then paste the files of the frontend folder of repo.
Then just run this command to install the dependencies.

```bash
# Install dependencies
npm install
```
For database use docker to download a mongo image and run a container of the mongo image mapping port to 27017

```bash
docker run -p 27017:27017 mongo
```
# Running the project-
Write the given commands

In frontend directory 
```bash
npm run dev
```
In backend directory 
```bash
node index.js
```
The website would be loaded on the localhost:5173. Just move to the /signup endpoint to get started.







