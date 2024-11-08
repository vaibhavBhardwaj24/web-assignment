# 🌟 Admin Dashboard Assignment 🌟

This is a web application that displays various blockchain metrics, including daily, monthly, and all-time data, using a React-based frontend.

## Table of Contents

1. [Introduction](#introduction)
2. [Features](#features)
3. [Usage](#usage)

## Introduction

The Blockchain Metrics Dashboard is a web application designed to provide users with a comprehensive view of blockchain-related data and metrics. This application fetches data from a backend API and displays it in a visually appealing and easy-to-understand format.

## Features

- **Daily Metrics**: Displays daily blockchain data, such as transaction volume, number of active addresses, and more.
- **Monthly Metrics**: Provides a monthly overview of blockchain performance, including trends and comparisons.
- **All-Time Metrics**: Presents an aggregate view of the blockchain's historical data and performance.
- **Interactive Graphs**: Utilizes charts and graphs to visualize the blockchain data, making it easier to analyze and interpret.
- **Responsive Design**: The application is designed to be mobile-friendly and accessible on various devices.

## Flow Explanation

The flow of the Blockchain Metrics Dashboard application is as follows:

1. The user navigates to the `/blockchain` route.
2. The `page.tsx` component is rendered, fetching the blockchain data from the API.
3. The component conditionally renders the loading spinner or the `Graphs` component, depending on the data fetching state.
4. The `Graphs` component utilizes the Recharts library to render the various data visualizations.
5. The application's styling and responsive design are handled by Tailwind CSS.

## Usage

Once the application is running, you can interact with the Blockchain Metrics Dashboard by navigating through the different sections and viewing the data visualizations. The dashboard will display the daily, monthly, and all-time blockchain metrics.
