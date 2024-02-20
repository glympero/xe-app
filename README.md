# Project Setup Guide

## Prerequisites

Ensure you have the following installed on your system:

- [Docker](https://www.docker.com/get-started)
- [Node.js](https://nodejs.org/en/) (Preferably the latest LTS version)

## Installation

### Docker Setup

Docker is used to containerize the application's db, ensuring consistency across different development and production environments. To get started with Docker:

1. **Start the Docker application** on your machine. Ensure it's running before proceeding with the next steps.

2. **Navigate to the project root directory** in your terminal.

3. **Launch the Docker containers**:

- docker-compose up -d

4. To stop and remove the containers, use:

- docker-compose down

### Package Installation

Before running the project or tests, you need to install the necessary Node.js dependencies.

1. **Open a terminal** and ensure you're in the project's root directory.

2. **Install the dependencies** by running:

- npm install

### Running the Project

With the dependencies installed, you can now run the project in development mode.

1. **In the project's root directory**, start the project with:

- npm run dev

This command initiates the services for both the backend and frontend parts of the project.

The frontend can be accessed at **http://localhost:5173/**

### Running Tests

To ensure the quality and correctness of your code, run the project's test suite:

1. **From the root directory**, execute the test command:

- npm run test

This runs all tests and outputs the results in the terminal, including any tests written for the backend and frontend.
