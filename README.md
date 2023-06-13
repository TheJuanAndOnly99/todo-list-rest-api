# Todo API

This is a simple API for managing todos on a local json file.

## Getting Started

To get started with the API, follow these steps:

1. Clone the repository:

```
git clone <repository-url>
```

2. Install the dependencies:

```
cd <project-directory>
npm install
```

3. Start the server:

```
npm start
```

The server will start running on `http://localhost:3000`.

## API Endpoints


### Create a new todo

- **URL:** `http://localhost:3000/todos`
- **Method:** POST
- **Request Body:**

  ```json
  {
    "title": "New Todo",
    "text": "New Todo Text",
    "completed": false
  }
  ```

- **Response:**

  - **Status Code:** 201 (Created)


### Get all todos

- **URL:** `http://localhost:3000/todos`
- **Method:** GET
- **Response:**

  - **Status Code:** 200 (OK)
  - **Body:**

    ```json
    [
      {
        "id": 1,
        "title": "New Todo",
        "text": "New Todo Text",
        "completed": false
      }
    ]
    ```
### Toggle the completion of a todo

- **URL:** `http://localhost:3000/todos/:id`
- **Method:** PUT
- **URL Parameters:**

  - `id` (number) - The ID of the todo to toggle completion for.

- **Response:**

  - **Status Code:** 200 (OK) - If the todo exists and the completion status was toggled successfully.
  - **Status Code:** 404 (Not Found) - If the todo with the specified ID does not exist.

### Delete a todo

- **URL:** `http://localhost:3000/todos/:id`
- **Method:** DELETE
- **URL Parameters:**

  - `id` (number) - The ID of the todo to delete.

- **Response:**

  - **Status Code:** 200 (OK) - If the todo was deleted successfully.
  - **Status Code:** 404 (Not Found) - If the todo with the specified ID does not exist.

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, please open an issue or submit a pull request.

## License

This project is licensed under the [Apache 2.0](LICENSE).
