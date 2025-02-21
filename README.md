# Phoneland  

Phoneland is a web application developed with Next.js that allows users to explore and purchase mobile devices. The application offers an intuitive interface to search, filter, and view details of various devices, as well as add products to the shopping cart and proceed with the purchase.  

👉 **You can visit the website here:** [Phoneland](https://phoneland-henna.vercel.app/) 🚀

### 📑 Table of Contents  

1. [📂 Project Architecture and Structure](#📂-project-architecture-and-structure)  
2. [⭐ Key Features](#⭐-key-features)  
3. [🔧 Technologies Used](#🔧-technologies-used)  
4. [⬇️ How to Download and Install](#⬇️-how-to-download-and-install)  
5. [🚀 Development and Production Modes](#🚀-development-and-production-modes)  
5. [⚙️ Next.js Configuration](#⚙️-nextjs-configuration)  
6. [🛍️ Shopping Cart Context](#🛍️-shopping-cart-context)  
7. [🏗️ Reusable Components](#🏗️-reusable-components)  
8. [🔄 Custom Hooks](#🔄-custom-hooks)  
9. [🧪 Testing](#-testing)  
    - [📌 How to Run the Tests](#-how-to-run-the-tests)  
    - [📂 Test Structure](#-test-structure)  


## 📂 Project Architecture and Structure

The architecture of Phoneland follows the Next.js design pattern, using both the `pages` folder and the `app` folder to organize the application's routes and components. The project structure is organized as follows:

- **`/src`**: Contains all the source code of the application.
  - **`/components`**: Reusable components used across different parts of the application, such as `Loading`, `DevicePlaceholder`, etc.
  - **`/context`**: Context providers to manage the global state of the application, such as the shopping cart context (`CartContext`).
  - **`/hooks`**: Custom hooks that encapsulate reusable logic, such as `useGetDeviceDetails`, `usePagination`, etc.
  - **`/screens`**: Screen components that represent different views of the application, such as `Home`, `Device`, `Cart`, etc.
    - **`/home`**: Components specific to the home screen, like `DeviceCard`.
    - **`/device`**: Components specific to the device details screen, like `DeviceInfoPage`.
  - **`/types`**: TypeScript type definitions used throughout the application.


## ⭐ Key Features

- **Search and Filter**: Users can search and filter mobile devices based on various criteria.
- **Device Details**: Users can view full details of each device, including specifications, storage options, and available colors.
- **Shopping Cart**: Users can add devices to the shopping cart and proceed with the purchase.
- **Cart Persistence**: The cart state is saved in `localStorage` for persistence across sessions.

## 🔧 Technologies Used

- **Next.js**: React framework for web applications.
- **React**: JavaScript library for building user interfaces.
- **TypeScript**: JavaScript superset that adds static types.
- **Tailwind CSS**: CSS framework for fast and efficient design.
- **Vercel**: Deployment platform for web applications.

## ⬇️ How to Download and Install

To get started with Phoneland, follow these steps:

1. **Clone the repository**  
   First, clone the Phoneland repository to your local machine using Git:

   ```bash
   git clone https://github.com/kambouidev/phoneland.git
   ```

2. **Install dependencies**  
   Navigate to the project folder and run the command to install all the required dependencies:

   ```bash
   cd phoneland
   npm install
   ```

3. **Configure the `.env.local` file**  
   Create a `.env.local` file at the root of the project and add the following environment variables:

   ```bash
   NEXT_PUBLIC_BASE_URL={https://base-url.com/}
   NEXT_PUBLIC_API_KEY={API_KEY}
   ```

4. **Run in development mode**  
   To start the development server and begin working on the application, run the following command:

   ```bash
   npm run dev
   ```

   Then, open your browser and go to [http://localhost:3000](http://localhost:3000) to see the application in action.

5. **Run in production mode**  
   To build and serve the application in production mode, run the following commands:

   ```bash
   npm run build
   npm start
   ```

   The application will be available at [http://localhost:3000](http://localhost:3000).

## 🚀 Development and Production Modes

The application includes two modes of execution:

- **🚧 Development Mode**: Assets are served without minimization to facilitate debugging and development.
  
- **⚡ Production Mode**: Assets are served concatenated and minimized to improve performance.

## ⚙️ Next.js Configuration  
The `next.config.ts` file contains the Next.js configuration, including Webpack optimization for **development** and **production** modes.  
The image configuration allows loading images from a remote URL specified in the `NEXT_PUBLIC_BASE_URL` environment variable.

## 🛍️ Shopping Cart Context  
The shopping cart context (`CartContext`) manages the global state of the cart, allowing users to **add and remove devices** from the cart.  
The cart state is saved in `localStorage` for **persistence across sessions**.

## 🏗️ Reusable Components  
The application uses several **reusable components** to improve **modularity** and **maintainability** of the code.  
For example, the `Loading` component is used to display a **loading indicator** in various parts of the application.

## 🔄 Custom Hooks  
**Custom hooks** encapsulate reusable logic, such as:  
- `useGetDeviceDetails`: Fetches the details of a device.  
- `usePagination`: Handles pagination of devices.

## 🧪 Testing  

Phoneland uses **Cypress** for end-to-end (E2E) testing. Cypress allows testing the application in a real-world environment and detecting potential issues in the user experience.  

### 📌 How to Run the Tests  

#### 🚀 Prerequisites for Running Tests  

Before running the tests, make sure the development environment is up and running. To start the local server, use:  

```bash
npm run dev
```  

Once the server is running at `http://localhost:3000`, you can proceed with test execution.  

#### 1️⃣ **Open the Cypress Interface**  
To run tests interactively using the graphical interface, use:  

```bash
npm run cypress:open
```  

This will open the **Cypress Test Runner**, where you can select a browser and run the tests visually.  

#### 2️⃣ **Run Tests in Headless Mode**  
To execute tests without opening the graphical interface (ideal for CI/CD), use:  

```bash
npm run cypress:run
```  

This will run all tests in the background and display the results in the terminal.  
If the server is not running, the tests will not execute properly.  

### 📂 Test Structure  

Cypress tests are located in the `cypress/e2e/` folder, organized by key application functionalities:  

- **`cypress/e2e/homePage.cy.ts`** → Tests for the home page (search, filters, navigation).  
- **`cypress/e2e/deviceInfoPage.cy.ts`** → Tests for the device details page (color selection, storage, pricing).  
- **`cypress/e2e/cartPage.cy.ts`** → Tests for the shopping cart (adding/removing products, persistence).  
