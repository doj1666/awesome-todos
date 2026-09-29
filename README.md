# Awesome Todos

Awesome Todos is a todo list app. It uses a React client and an Express server with MongoDB.

## Tech Stack

- React and React DOM
- Vite
- Express
- MongoDB Node.js driver
- dotenv
- cors

## Features

- View todos saved in MongoDB.
- Add a todo.
- Mark a todo as complete or incomplete.
- Delete a todo.

## Local Setup

1. Install Node.js and npm.
2. Copy `.env.example` to `server/.env`.
3. Set `MONGODB_URI` in `server/.env` to your MongoDB connection string.
4. In one terminal, run `npm install` in `server`, then run `npm run dev` there.
5. In another terminal, run `npm install` in `client`, then run `npm run dev` there.
6. Open the local address printed by Vite.

The environment variable in `.env.example` is `MONGODB_URI`.

## Project Structure

- `client/` contains the React and Vite app.
- `client/src/` contains the app components and styles.
- `server/` contains the Express API and MongoDB connection.
- `server/routes.js` defines the todo API routes.
- `.env.example` shows the server environment variable name.
