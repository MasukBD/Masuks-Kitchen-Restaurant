### Project Name: Masuk's Kithen Restaurent

#### Live site: [Masuk's Kitchen](https://masuk-kitchen-restaurant.web.app/)

Welcome to Masuk's Kitchen Restaurant, a modern and feature-rich restaurant website developed using HTML5, CSS3 with Tailwind, JavaScript with React.js, Node.js with Express.js, and MongoDB for the database. This project also leverages Firebase for authentication and hosting, as well as Vercel for server-side deployment.

## Table of Contents
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [Installation](#installation)
- [Usage](#usage)
- [Authentication](#authentication)
- [React Libraries](#react-libraries)
- [Site Structure](#site-structure)
- [Admin Dashboard](#admin-dashboard)
- [User Dashboard](#user-dashboard)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## Features

- Navigation bar with Home page, Menu page, Order page, contact us, and login.
- Home page with a banner, chef says, featured and popular items, review slider, and additional information.
- Two login methods: email/password and Google Sign-In.
- Separate dashboards for customers and administrators.
- Admin dashboard includes sections for Admin Home, Add item, Manage Item, Manage orders, Manage bookings, and user management.
- Customer dashboard includes sections for User Home, Table Reservations, Order Summary, Add Review and booking management.

## Technologies Used

- HTML5
- CSS3 with Tailwind
- JavaScript with React.js
- Node.js with Express.js
- MongoDB
- Firebase (Authentication and Hosting)
- Json Web Token(JWT for Securing API at server site)
- Vercel (Server-side Deployment)
- Tanstack Query
- React Swiper
- Axios
- Stripe (Payment Gateway)

## Getting Started

To get started with Masuk's Kitchen Restaurant, follow the steps below:

### Installation

1. Clone the repository: `git clone https://github.com/MasukBD/Masuks-Kitchen-Restaurant.git`
2. Change into the project directory: `cd Masuks-Kitchen-Restaurant`
3. Install All dependencies with(Check Package-look.json): `npm install`

### Usage

To run the development server, use the following command ```bash npm run dev

This will start the server, and you can view the website at localhost

## Authentication

Masuk's Kitchen Restaurant uses Firebase for authentication. Users can log in using their email and password or via Google Sign-In.


# React Key Libraries

- **Tanstack Query:** Used for data fetching and management.
- **React Swiper:** Enables the implementation of a responsive image slider.
- **Axios:** Used for making HTTP requests.
- **Stripe:** Integrated for payment gateway functionality.


# Site Structure

- **Navbar:** Includes links to the Home page, Menu page, Order page, Contact us, and Login.
- **Home Page:** Contains a banner, chef says, featured and popular items, review slider, and additional information.
- **Menu Page:** Displays different food categories for browsing. Users can go to the Order page from the Menu page.
- **Cart Page:** Accessible if logged in. Users can delete items from the cart or proceed to payment.
- **Order Page:** Accessible from both the Menu page and the Navbar.
- **Contact Page:** A page where users can get in touch with the restaurant.
- **Login Page:** Redirects to login when attempting to add an item to the cart without being logged in.
- **Dashboard Page:** Accessible from the profile photo for large devices, or in the same column as logout for small devices.
- **Payment Page:** Offers multiple payment method options.
- **Order Summary Page:** Displays details of the order, transaction ID, and previous orders after successful payment.


# Admin Dashboard

The admin dashboard provides the following functionalities:

- **Home:** Overview of the restaurant's performance.
- **Add Item:** Add new menu items to the website.
- **Manage Item:** Edit and update existing menu items.
- **Manage Order:** View and process customer orders.
- **Manage Bookings:** Handle reservation requests.
- **All Users:** View and manage user accounts.

# User Dashboard

The user dashboard provides the following functionalities:

- **Home:** Personalized content and recommendations.
- **Table Reservations:** Make reservations for dining.
- **Order summary:** View past orders.
- **Add Review:** Can able post Review based on past orders.
- **My Bookings:** Manage reservation history and details.

# Deployment

The website is deployed using Firebase for hosting and Vercel for server-side deployment.

# Contributing

Contributions are welcome! Please follow the [contribution guidelines](CONTRIBUTING.md).

# License

This project is licensed under the [MIT License](LICENSE).


