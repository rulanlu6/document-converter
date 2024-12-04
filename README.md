# Document Converter API

An API to convert documents between three different formats: plain text (string), XML, and JSON. The project includes both the frontend (React) and backend (Node.js with Express), built using TypeScript.

---

## Technologies Used

- **Node.js** – Backend runtime environment.
- **Express** – Web framework for Node.js.
- **React** – Frontend library for building the user interface.
- **TypeScript** – Typed JavaScript for improved maintainability and type safety.

---

## Getting Started

To run the project locally, follow the steps below.

### Prerequisites

Ensure that you have the following installed:

- **Node.js** (version 14.x or higher)
- **npm** (Node package manager)

### Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/rulanlu6/document-converter.git
   cd document-converter
   ```

2. Install dependencies for both the frontend and backend:

   ```bash
   npm install
   ```

### Running Locally

Build and start both the frontend and backend:

    ```bash
    npm install
    ```

---

## API Endpoints

- **POST /convert**
  - **Description**: Converts an uploaded document from one format to another.
  - **Response**:
    - **200 OK**:
      - `message`: A success message.
      - `result`: The converted document content.
    - **400 Bad Request**:
      - `error`: If no file is uploaded or if required fields are missing.
    - **500 Internal Server Error**:
      - `error`: If there’s an issue during conversion.

---

## Testing

Placeholder

### To run tests:

Placeholder
