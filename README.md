# NFT App

Invoice App is an application for managing invoices and related items. This application allows users to create, edit, and delete invoices, as well as add, edit, and delete items within invoices.

## System Requirements

Before running this application, make sure your computer / server meets the following system requirements:

- Node.js (version 14 or newer)
- MySQL database server

## Installation

1. Clone this repository to your local computer:

```bash
git clone https://github.com/hanifwidiyanto/ioh-codingtest/
```

2. Navigate to the project directory:

```bash
cd ioh-codingtest
```

3. Install all the dependencies by running the following command:
   
   
```bash
npm install
```

4. Also install dependencies to frontend app, by running the following command:

```bash
cd frontend
npm install
```

6. Back to Parent Folder again, and create a .env file in the project directory and populate it with the provided configuration:
   
```plaintext
NODE_ENV=development
PORT=5000

JWT_SECRET=

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=db_invoice
```

Make sure to replace the configuration values according to your needs.

## Database Setup

Before running the application, you need to set up the database. Make sure the MySQL database server is installed and running on your local machine.

1. Create a new database named db_invoice as specified in the provided configuration in the .env file. You can use the following command in the MySQL CLI:
```sql
CREATE DATABASE db_invoice;
```

2. Once the database is created, you can run the migrations to create the necessary tables. Run the following command in the terminal:

```bash
npx sequelize-cli db:migrate
```

This will create the required tables based on the model definitions in the models directory.


## API Endpoints

Here is a list of the API endpoints that you can use to interact with the application:

### Users

- `POST /api/users/login`: Endpoint to log in to the application.
- `POST /api/users/logout`: Endpoint to log out from the application.
- `POST /api/users/register`: Endpoint to register a new user.
- `GET /api/users/profile`: Endpoint to get user profile information.
- `PUT /api/users/profile`: Endpoint to update user profile information.

### Invoices

- `POST /api/invoices`: Endpoint to create a new invoice.
- `GET /api/invoices`: Endpoint to get a list of all invoices.
- `GET /api/invoices/:id`: Endpoint to get the details of a specific invoice.
- `PUT /api/invoices/:id`: Endpoint to update a specific invoice.
- `DELETE /api/invoices/:id`: Endpoint to delete a specific invoice.

### Items

- `POST /api/items`: Endpoint to create a new item.
- `GET /api/items`: Endpoint to get a list of all items.
- `GET /api/items/:id`: Endpoint to get the details of a specific item.
- `DELETE /api/items/:id`: Endpoint to delete a specific item.


## Running the Application


To run the server and client concurrently, you can use the following scripts in your package.json file:

```json
"scripts": {
  "test": "jest",
  "start": "node backend/app.js",
  "server": "nodemon backend/app.js",
  "client": "npm run dev --prefix frontend",
  "dev": "concurrently \"npm run server\" \"npm run client\""
}
```

You can then run the application in development mode using the command:

```bash
npm run dev
```

This will start both the server and client simultaneously.
