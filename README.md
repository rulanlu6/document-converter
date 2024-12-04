# Document Converter API

An API to convert documents between three different formats: plain text (string), XML, and JSON. The project includes both the frontend (React) and backend (Node.js with Express), built using TypeScript.

---

## Technologies Used

- **Node.js**
- **Express**
- **React**
- **TypeScript**

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

Start both the frontend and backend:

```bash
npm start
```

---

## API Endpoints

- **POST /convert**

  - **Description**: Converts an uploaded document from one format to another.
  - **Body (Multipart/form-data)**:
    - `input`: The document to be converted (attached as a file).
    - `from`: The source format (e.g., `text/plain`, `application/json`, `application/xml`).
    - `to`: The target format (e.g., `application/json`, `application/xml`).
    - `lineSeparator`: (Optional) The separator for lines (default is newline).
    - `elementSeparator`: (Optional) The separator for elements.

  **Response**:

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