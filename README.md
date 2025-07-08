# HEB Pizza App

This is the HEB take-home assignment for the Software Engineer II position, completed by Jamal Dabas.

The HEB Pizza App is a single-page application built with Angular and TypeScript. It allows users to log in and place pizza orders through a connected backend API.

The backend/api for this project is provided by HEB here: https://github.com/kylekurihara/order-pizza-api

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.0.5.

## Setup

Ensure you have Node.js (v20.19 or later) and Angular CLI installed globally.

```bash
git clone https://github.com/Jammooly1/HEB-Take-Home-Assignment-Pizza-App.git
cd HEB-Take-Home-Assignment-Pizza-App
```

Install project dependencies:

```bash
npm install -g @angular/cli # if Angular CLI not installed
npm install
```

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.
