### PropertyProLite-CH2

[![Codacy Badge](https://api.codacy.com/project/badge/Grade/2b543b5910f94e0eba5b5df875313a36)](https://app.codacy.com/app/BurnerB/PropertyProLite-CH2?utm_source=github.com&utm_medium=referral&utm_content=BurnerB/PropertyProLite-CH2&utm_campaign=Badge_Grade_Dashboard)
[![Build Status](https://travis-ci.com/BurnerB/PropertyProLite-CH2.svg?branch=develop)](https://travis-ci.com/BurnerB/PropertyProLite-CH2)
[![Maintainability](https://api.codeclimate.com/v1/badges/812647c493bd04982407/maintainability)](https://codeclimate.com/github/BurnerB/PropertyProLite-CH2/maintainability)
[![Coverage Status](https://coveralls.io/repos/github/BurnerB/PropertyProLite-CH2/badge.svg?branch=develop)](https://coveralls.io/github/BurnerB/PropertyProLite-CH2?branch=develop)

#### Project Overview
Property Pro Lite is a platform where people can create and/or search properties for sale or rent.
#### Endpoints covered
| Method        | Endpoint                 | Description|
| ------------- | --------------------------|------------|
| POST           |`/auth/signup`   |User create an account|
| POST          | `/auth/login`   |User login to their account|
| POST          | `/auth/reset` | User reset thei password |
| POST        | `/property`    |Agent post property advert|
| PATCH         | `/property/<:property-id>`|Agent update their property advert|
| PATCH          | `/property/<:property-id>/sold`       |Agent mark their advert as sold|
| DELETE       | `/property/<:property-id>` |Agent delete their advert|
| GET | `/propertys`|get all property adverts|
| GET  |`/api/v1/property?type=propertyType` |get all property adverts of specific type|
| GET          | `/property/<:property-id>`|get a specific advert|
| POST          | `/property/<:property-id>/fraudulent`      |User mark an advert as fraudulent|

#### Tools Used
* Language: Javascript
* Server environment: Node.js 
* Back-end framework: Express 
* Testing library: Mocha.js
* Assertion library: Chai 
#### Github-Pages Link
https://burnerb.github.io/PropertyPro-lite/UI/index.html
#### Pivotal Tracker story board
https://www.pivotaltracker.com/dashboard

### Getting Started
#### Setting up your system
Make sure you already have [Node.js](https://nodejs.org/en/) installed in your system..
#### How to get started
After cloning this repository to your local machine,cd into the package folder using your terminal and run the following:

`> npm install`

It will install the node_modules which will help you run the project on your local machine.

#### Run the server
` npm start`
this will start your application and run on  **port 5000**

#### Run the tests
` npm test`


