<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

## Table of Contents

- [Introduction](#introduction)
- [Prerequisites](#prerequisites)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Development](#development)
- [Deployment](#deployment)
- [Resources](#resources)

## Introduction

<p> 
    this is a back-end api for parking-space management
 </p>

## Prerequisites

- [NodeJs@20.3.0 and up ](https://nodejs.org/en/)
- [TypeOrm](https://typeorm.io/)
- [NestJs](https://docs.nestjs.com/)

## Tech Stack

- [NestJs](https://docs.nestjs.com/)

## Getting Started

- Installation:

Clone the repository: `git clone https://github.com/Voyager56/sweeft-test`

Go to the root directory of the repository: `cd sweeft-test`

Install node modules: `npm install`

Copy the .env file to the root directory: `cp .env.example .env`
and fill in the values for the database connection.

## Development

compilation and hot-reload: `npm run start:dev`
compiles and minifies for development: `npm run build`

## Deployment

- ssh into the server: `ssh username@ipaddress`
- run sudo apt update
- curl https://deb.nodesource.com/setup_20.x | sudo bash
- sudo apt install nodejs
- cd {project_folder}
- npm install
- npm run build
- after all this install nginx and configure it.

## Resources

- [Draw Sql](https://drawsql.app/teams/l-37/diagrams/sweeft)
