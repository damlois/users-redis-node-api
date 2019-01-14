# users-redis-node-api
A node api that gets users details from a text file

## Prerequisites
what things you need to run the API
* ensure you have node installed on your computer

## Modules installation
* npm install express --save
* npm install redis --save

## How to run the api
use the second command if the nodemon module is insatalled
* node index.js
* nodemon index.js

## Contribution
pull requests are welcome

## Author
Lois Adegbohungbe

## License
This project is licensed under the MIT license

## Routes
|                   NAME                         |   ENDPOINT            |
| -----------------------------------------------| ----------------------|
| base                                           |      /                |
| upload file[POST]                              | /upload               |
| get user details by msisdn[GET]                | /get/:id              |



