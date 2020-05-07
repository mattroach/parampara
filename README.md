# Setting up the database

I recommend using Docker to start a Postgres server, as it's fairly easy:

    docker run --name parampara -p 5432:5432 -e POSTGRES_PASSWORD=parampara -d postgres

`env/development.env` must have the correct database connection information.

# Running in dev mode

To start the frontend, just run `npm start` in `frontend/`

Read frontend/README.md for more details.

To run the backend:

    npm run start:dev

Then point your browser to localhost:3000. This is the location of the frontend server.
