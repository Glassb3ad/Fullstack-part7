require('dotenv').config()

let SECRET = process.env.SECRET
let PORT = 3003
let MONGODB_URI = process.env.MONGODB_URI 
let MONGODBTEST_URI = process.env.MONGODBTEST_URI 
module.exports = {
    testEnvironment: 'node', PORT, MONGODBTEST_URI, MONGODB_URI, SECRET                   
  };
