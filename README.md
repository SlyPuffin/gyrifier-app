# About
> Gyrification is the process of forming the characteristic folds of the cerebral cortex. [Wikipedia](https://en.wikipedia.org/wiki/Gyrification)

Gyrifier is a WIP flashcard app with the goal of getting important information into long-term memory. Inspired by other SRS-based (Spaced Repetition System) apps like Anki, Gyrifier is intended to be used daily without ever ballooning into a multi-hour study session.

Check out the wiki on [References & Research](https://github.com/SlyPuffin/gyrifier-app/wiki/References-&-Research) for more information on the ideas behind the app.

Production URL: https://gyrifier-app.vercel.app

# Setup
## Prerequisites
* [PlanetScale CLI](https://github.com/planetscale/cli)
  * PlanetScale DB Access (Contact Sly Puffin)
  * [PlanetScale Login](https://docs.planetscale.com/tutorials/connect-any-application)
  * .env file for PlanetScale (Contact Sly Puffin)
## Running Locally
### Connect to the DB
1. Install the PlanetScale CLI (see Prerequisites above).
2. Log into PlanetScale via a browser.
3. Authenticate PlanetScale in the CLI (see "PlanetScale DB Access" above).
4. Confirm the .env file is set up and in the root directory of gyrifier-app.  
  4a. If you have multiple organizations using PlanetScale, see an available list and select by running:  
  `pscale org switch`
5. Run the following command in the command line of choice (Note: Two commands will be run at the same time. It is recommended that you use the same command line software for both commands).  
`pscale connect <table name> <table branch> --port 3309`  
6. After successful connection, run the application:  
`npm run dev`
