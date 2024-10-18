HavenRent Installation and Startup Guide
Prerequisites

Before you start, ensure you have the following installed on your machine:

    Node.js (Version 14 or higher) and npm (included with Node.js)
    Git for cloning the GitHub repository
    MongoDB (either local or cloud) for the database

Steps to Follow
1. Clone the GitHub repository

Use the git clone command to get the project from GitHub. Open your terminal and run the following command:


git clone https://github.com/Brahimovith/HavenRent.git

This will download the project files into a folder called HavenRent on your machine.
2. Navigate to the project directory

Move into the newly cloned project directory:

cd HavenRent

3. Install dependencies

The project uses Node.js packages specified in the package.json file. You need to install these dependencies before running the project.

Run the following command in the terminal:

npm install

This will install all necessary Node.js modules.

4. Start the server

Once everything is configured, start the server by running the following command:

bash

node server.js

If everything works correctly, the server will start, and you’ll see a message like this in the terminal:

Server running on port 3000
Connected to MongoDB

5. Access the application

Open your browser and go to the following URL to see the application:


http://localhost:3000

6. Test the application

You can now use the HavenRent application and test its features, such as:

    User Admin Owner registration
    Login/Logout
    Owner management
    Adding propreties and bookings
    paiement

This guide should help you set up and run your HavenRent project successfully!