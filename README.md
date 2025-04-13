# Assignment 3#: Web API & Docker Documentation – Swiftcart’s E-commerce Platform Backend System

## Table of Contents

- [Assignment 3#: Web API \& Docker Documentation – Swiftcart’s E-commerce Platform Backend System](#assignment-3-web-api--docker-documentation--swiftcarts-e-commerce-platform-backend-system)
  - [Table of Contents](#table-of-contents)
  - [Running the Project](#running-the-project)
  - [Environment Variables](#environment-variables)
    - [Install Dependencies](#install-dependencies)
  - [Docker Implementation](#docker-implementation)
    - [Pull from Docker Hub](#pull-from-docker-hub)
    - [Build \& Run from Docker (Locally)](#build--run-from-docker-locally)
    - [Test Endpoints](#test-endpoints)
  - [Endpoints Overview](#endpoints-overview)
    - [Create a New Cart](#create-a-new-cart)
    - [Retrieve a Shopping Cart](#retrieve-a-shopping-cart)
    - [Add an Item to a Cart](#add-an-item-to-a-cart)
    - [Remove an Item from a Cart](#remove-an-item-from-a-cart)
    - [Update Item Quantity](#update-item-quantity)
    - [Create a New Customer](#create-a-new-customer)
    - [Get Customer by ID](#get-customer-by-id)
    - [Place an Order](#place-an-order)
    - [Retrieve an Order](#retrieve-an-order)
  - [Endpoints Summary](#endpoints-summary)
  - [HTTP Status Codes](#http-status-codes)

---

## Running the Project

1. **Clone the repository** or download the project files.
2. Make sure you have [Node.js](https://nodejs.org/) installed.

## Environment Variables

Create a file named `.env` in the project root with the following variables (replace placeholders with your actual credentials):

- `PGHOST`: The host URL for your Neon database (e.g., `yourproject-1234.us-east-2.aws.neon.tech`)
- `PGUSER`: The username for your Neon database
- `PGPASSWORD`: The password for your Neon database
- `PGDATABASE`: The name of your Neon database
- `DB_PORT`: Typically `5432`
- `PORT`: The port for your Node server (e.g., `3000`)

Ensure that `.env` is listed in your `.gitignore` so it’s not committed to version control.

---

### Install Dependencies

```bash
npm install
```

In order to start the server, type the command below in the terminal after running the above command.

```bash
npm start
```

By default, the server listens on port 3000 (or on whatever port you set in your .env file).

---

## Docker Implementation

### Pull from Docker Hub

The Swiftcart image is available on Docker Hub via this here, [https://hub.docker.com/repositories/danmasson0]. From there you'll be able to pull and run the app directly with out building it using these commands:

```bash
docker pull danmasson0/assignment_3_docker_containerization_submission_daniel_mason-web:latest

docker run -p 3000:3000 \
  -e PGHOST=your-neon-hostname.eastus2.azure.neon.tech \
  -e PGUSER=your_neon_user \
  -e PGPASSWORD=supersecretpassword \
  -e PGDATABASE=your_db_name \
  -e DB_PORT=5432 \
  -e PORT=3000 \
  danmasson0/assignment_3_docker_containerization_submission_daniel_mason-web:latest
```

### Build & Run from Docker (Locally)

If you **cloned** the repository and want to build the Docker image yourself instead of pulling from Docker Hub, follow these steps:

1. **Install Docker** on your machine (if not already installed).
2. **Navigate** to the project root (where the Dockerfile is located).

3. **Build** the Docker image (replace `your-username` with any name or your Docker Hub username):

   ```bash
   docker build -t your-username/assignment_3_docker_containerization_submission_daniel_mason-web:1.0 .
   ```

[https://hub.docker.com/repositories/danmasson0]: https://hub.docker.com/repositories/danmasson0

### Test Endpoints

```bash
1. Open the file swiftcart.rest in VS Code.
2. Click on "Send Request" (the small text above each request).
3. Inspect the response in the REST client pane.

** If there's an issue you can also use Postman or Insomnia to test your endpoints.**
```

Moreover, it is also possible to test the different endpoints using OpenAPI (Swagger) using this url: [http://localhost:3000/api-docs/]. Once you've cloned the project, and have it running locally with the docker container and credentials.

[http://localhost:3000/api-docs/]: http://localhost:3000/api-docs/

## Endpoints Overview

Below are some of the key endpoints in the Swiftcart E-commerce backend:

---

### Create a New Cart

- **Endpoint:** `POST /api/cart`  
- **Description:** Creates a new shopping cart for a specific user.

---

### Retrieve a Shopping Cart

- **Endpoint:** `GET /api/cart/:cartId`  
- **Description:** Retrieves the current items in a given shopping cart.

---

### Add an Item to a Cart

- **Endpoint:** `POST /api/cart/:cartId/add`  
- **Description:** Adds a product to the cart or updates its quantity if it already exists.

---

### Remove an Item from a Cart

- **Endpoint:** `DELETE /api/cart/:cartId/remove/:productId`  
- **Description:** Removes a product from the cart entirely.

---

### Update Item Quantity

- **Endpoint:** `PATCH /api/cart/:cartId/quantity`  
- **Description:** Adjusts the quantity of a specific product in the cart.

---

### Create a New Customer

- **Endpoint:** `POST /api/customers`  
- **Description:** Registers a new customer (user) account.

---

### Get Customer by ID

- **Endpoint:** `GET /api/customers/:id`  
- **Description:** Retrieves customer details (excluding password).

---

### Place an Order

- **Endpoint:** `POST /api/orders`  
- **Description:** Converts a shopping cart into an order, calculates totals, and decrements product inventory.

---

### Retrieve an Order

- **Endpoint:** `GET /api/orders/:id`  
- **Description:** Retrieves the details of a placed order, including order line items.

---

## Endpoints Summary

| **Endpoint**                           | **Method** | **Description**                                                   | **Request Body Example**                                                        | **Response**                                                         |
|---------------------------------------|-----------|-------------------------------------------------------------------|---------------------------------------------------------------------------------|-----------------------------------------------------------------------|
| `/api/cart`                           | **POST**  | Create a new shopping cart for a given user.                     | `{ "user_id": 1 }`                                                              | Returns the newly created cart object.                                |
| `/api/cart/:cartId`                   | **GET**   | Retrieve all items in a given shopping cart.                      | None                                                                            | Returns an array of items (with product details) in the cart.         |
| `/api/cart/:cartId/add`               | **POST**  | Add an item (product) to the cart or increase its quantity.       | `{ "product_id": 3, "quantity": 2 }`                                            | Returns the updated cart item.                                        |
| `/api/cart/:cartId/remove/:productId` | **DELETE**| Remove a product from the cart.                                   | None                                                                            | Returns a confirmation message.                                       |
| `/api/cart/:cartId/quantity`          | **PATCH** | Update the quantity of a product in the cart.                     | `{ "product_id": 3, "quantity": 5 }`                                            | Returns the updated cart item.                                        |
| `/api/customers`                      | **POST**  | Create/register a new customer.                                   | `{ "email_address": "[email protected]", "phone_number": "123-456-7890", "password": "secret" }` | Returns the newly created user (omitting password).                   |
| `/api/customers/:id`                  | **GET**   | Retrieve customer details by user ID.                             | None                                                                            | Returns the user object (omitting password).                          |
| `/api/orders`                         | **POST**  | Place a new order by converting a cart into an order.             | `{ "user_id": 1, "cart_id": 2, "payment_method_id": 101, "shipping_address_id": 202 }` | Returns the created order object with order lines.                    |
| `/api/orders/:id`                     | **GET**   | Retrieve an existing order, including line items.                 | None                                                                            | Returns the order object with its line items.                         |

---

## HTTP Status Codes

- **201**: A resource (e.g., cart, order, user) was successfully created.  
- **200**: Successful request (e.g., GET, PATCH, POST returning data).  
- **204**: The resource was successfully deleted (no content returned).  
- **400**: Bad request (validation errors, insufficient stock, malformed data).  
- **404**: Resource not found (invalid cart ID, product ID, order ID, etc.).  
- **500**: Internal server error (database or server issues).

---
