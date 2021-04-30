# BTS530-TS-Backend

My capstone project back-end component, fully written in typescript with jest unit/e2e testing in the works

Requires a .env file with sensitive information such as database uri, jwt secret key for the server to work.

Will add docker related files in the future to ensure this app can be containerized.

## USAGE

- You can start the ts server locally using `yarn dev`
- To build a production application, run `yarn build` to build the production server. You can deploy to your production server of choice.
- `yarn start` will run the express server that's built using the previous command. Running this command without a compiled server WILL NOT WORK.
- To run the automated tests, run `yarn test`. You can also use `yarn coverage` if you want to get full coverage of all tests.
