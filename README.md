# Installation

    npm install -g truffle

Then download [Ganache](https://trufflesuite.com/ganache/) and run the Ganache application locally (you can just follow the "Quickstart Ethereum" option).

Deploy the smart contracts to your local instance of Ethereum (on Ganache):

    truffle migrate

From the Ganache application, find an account with an ETH balance. Click the Show Private Key button (on the right) and import that private key as a new Metamask account. Then Add a Network to Metamask, and copy the localhost address, with Chain ID 1337. If it says that Chain ID is taken, click into Networks in the Metamask settings and delete the localhost network, then try again.

# Running Tests

    truffle test

# Running the Client locally

    cd client
    npm install
    npx tailwindcss -i ./src/index.css -o ./public/output.css --watch

In a separate terminal window:

    npm start
