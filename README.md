# Running locally

Copy `development.env.example` to `development.env`

    cp env/development.env.example env/development.env

Update the values in the new file as needed - just read the comments.

## Setting up the database

I recommend using Docker Desktop to start a Postgres server, as it's fairly easy:

    docker run --name parampara -p 5432:5432 -e POSTGRES_PASSWORD=parampara -d postgres

`env/development.env` must have the correct database connection information - by default it has the right information if you started the database in this way on a mac machine, with the latest version of Docker.

# Running in dev mode

You must start the frontend and backend as separate services.

To start the frontend, just run `npm start` within the `frontend/` dir:

    cd frontend ; npm start

Read frontend/README.md for more details on running the frontend.

To run the backend, run this from the root path:

    npm run start:dev

Then point your browser to `localhost:3000`. This is the location of the frontend server. The frontend server will automatically proxy API requests to the backend server which runs on `localhost:3001` (see `frontend/setupProxy.js` if you want to learn how that works)
