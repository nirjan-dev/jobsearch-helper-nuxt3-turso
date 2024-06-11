# Job search helper app with Nuxt 3, Turso, Lucia and Drizzle

This is a Nuxt 3 application meant to help you on your job search journey. It uses turso to store the data and lucia for the authentication (with github and google oauth). It uses prime vue for the UI components as well as tailwind for styling.

## TODO

- [] create endpoints to save user's resume
- [] create pages for application tracking
- [] support AI recommendations for what skills and accomplishments you should keep in the generated resume based on the job description.
- [] create a landing page
- [] support magic link logins?

## Setup

- clone the project
- create an .env file by copying the given .env.example file
- you need to get the OAUTH credentials from github and google, and the db credentials from turso
- use nvm or an alternative to use the version of node in the .nvmrc file
- use pnpm to install the dependencies
- pnpm dev to start the dev server

## deployment

- since we're using session based auth, you need a node server for deployment, it won't work with SSG. This also hasn't been tested on the edge so, it's best to use some sort of VPS for deployment. There is a Dockerfile included in the project to build a docker container (which could be used to set it up on a homelab server too).
  The project also includes a fly.toml file and has been tested to work with a fly.io deployment (a github action is also included), you would just need to update the config with the name of your fly app (and any other changes you wish to make).

## status

This project is on hold for now as I want to focus on other projects, but I do want to revisit this again at some point.
