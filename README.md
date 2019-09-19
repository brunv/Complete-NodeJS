# Complete NodeJS Study Repository

Resources:
- The Complete NodeJS Course by Andrew Mead on [Udemy](https://www.udemy.com/the-complete-nodejs-developer-course-2)
- NPM Crash Course by Traversy Media on [YouTube](https://www.youtube.com/watch?v=jHDhaSSKmB0)

## The Module System
The module system lets you load external libraries into your application. That’ll enable you to take advantage of built-in Node.js modules as well as third-party npm modules. This includes libraries for connecting to database, creating web servers, and more!

### Import NodeJS Modules
The module system is built around the ```require``` function. This function is used to load in a module and get access to its contents.

##### Importing your own files
As you add more code, you’ll want to stay organized and break your Node.js app into multiple scripts that all work together.  ```require``` can also be used to load in JavaScript files you’ve created. All you need to do is provide require with a relative path to the script you want to load. 

##### Exporting from files
Node.js provides the required script with a place to store values that should be exported as part of the library. This is on ```module.exports```.

## Command Line Arguments
We can access command line argumments with ```process.argv```.
To parse command strings like *--title="Title"* we can use a module called **yargs**.

## Working with JSON
Since JSON is nothing more than a string, it can be used to store data in a text file or transfer data via an HTTP requests between two machines. Here's an example:

```
const book = {
    title: 'Ego is the Enemy',
    author: 'Ryan Holiday'
};
 
// Convert JavaScript object into JSON string:
const bookJSON = JSON.stringify(book);
 
// Convert JSON string into object:
const bookObject = JSON.parse(bookJSON);
console.log(bookObject.title)

// JSON format example:
{
    "name":"Gunther",
    "planet":"Earth",
    "age":54
}
```

## The *this* binding in Arrow Functions
Arrow functions don’t bind their own ```this``` value. Instead, the ```this``` value of the scope in which it was defined is accessible. This makes arrow functions bad candidates for methods, as ```this``` won’t be a reference to the object the method is defined on.

For methods, ES6 provides a new method definition syntax. You can see this in the definition of the ```printGuestList``` method below. That function is a standard function, just with a shorthand syntax which allows for the removal of the colon and the function keyword.

Because arrow functions don’t bind this, they work well for everything except methods. As shown below, the arrow function passed to ```forEach``` is able to access ```this.name``` correctly, as it’s defined as an arrow function and doesn’t have a this binding of its own. That code wouldn’t work if you swapped out the arrow function for a standard function.

```
const event = {
    name: 'Birthday Party',
    guestList: ['Andrew', 'Jen', 'Mike'],
    printGuestList() {
        console.log('Guest list for ' + this.name);
        this.guestList.forEach((guest) => {
            console.log(guest + ' is attending ' + this.name);
        });
    }
} 
 
event.printGuestList()
```

## Node Debugger
Printing values to the console with ```console.log``` is a good start, but there are often times where we need a more complete debugging solution. For that, Node.js ships with a built-in debugger. It builds off of the developer tools that Chrome and V8 use when debugging JavaScript code in the browser. Start your application with ```inspect``` to use the debugger, like this:
```
node inspect app.js
```
Next, visit ```chrome://inspect``` in the Chrome browser. There, you’ll see a list of all the Node.js processes that you’re able to debug. Click “inspect” next to your Node.js process to open up the developer tools. From there, you can click the blue “play” button near the top-right of the “sources” tab to start up the application.
When running the app in debug mode, you can add breakpoints into your application to stop it at a specific point in the code. This gives you a chance to explore to the application state and figure out what’s going wrong.
```
console.log('Thing one') 
 
debugger // Debug tools will pause here until your click play again 
 
console.log('Thing two')
```

#### In case you got the timeout error on port 9229
If you're seeing this error *"Timeout (2000) waiting for 127.0.0.1:9229 to be free"* and can't get it to work, try this instead:
```
node --inspect-brk=127.0.0.1:9229 .\app.js add --title="Test 5" --body="This is just a test"
```

## MongoDB

### Installation
##### If you're using the .zip
Place the *mongodb* folder anywhere you want and create another folder to store the databases. Here we will call it *mongodb-databases*.

To run MongoDB you can use following command:
```
$ _path_to_the_mongodb_folder/mongodb/bin/mongod.exe --dbpath=/_path_to_databases_/mongodb-databases
```

##### If you're intalling through .msi
Install the Complete version. When you hit the window asking about installing MongoDB as a Service, you can install it in either way. Here are the differences:

- Running MongoDB as a service gives you some flexibility with how you can run and deploy MongoDB. For example, you can have MongoDB run at startup and restart on failures. If you don't set MongoDB up as a service, you will have to run the MongoDB server every time.
- Running MongoDB as a network service means that your service will have permission to access the network with the same credentials as the computer you are using. Running MongoDB locally will run the service without network connectivity.

More on [MongoDB DOC](https://docs.mongodb.com/v3.2/tutorial/install-mongodb-on-windows/).

##### Installing with Chocolatey
```
choco install mongodb -y
choco install robo3t -y
```

#### Installing MongoDB Drivers in your project
Just install the MongoDB NPM package: ```npm install mongodb```


## The REST API
REST API stands for **R**epresentational **S**tate **T**ransfer - **A**pplication **P**rogramming **I**nterface. An API is nothing more than a set of tools that allow you to build software applications. It is actually a very broad term.
The REST API allows clients such as a web app to access and manipulate resources using a set of predefined operations. A resource can be something like a user or a task. A predefined oprational for users and tasks could be something like the ability to create a new task or to mark a task as complete or to do something a bit more advanced like upload a profile picture for your user account.

### HTTP Status codes
There is a very good resource to catch up with the HTTP status code called [httpstatuses.com](https://httpstatuses.com).

## Authetication and Security

### Hashing Passwords
The difference between hashing algorithms and encrypting algorithms is that with encryption we can get the original value back. Hashing algorithms are one way algorithms by design.

We're going to use BCrypt. To install its library in a NodeJS project you can run the following command:
```
npm install bcryptjs
```

### JSON Web Tokens (JWT)
JWTs provide a nice system for issuing and validating authentication tokens. The authentication token will ensure that the client doesn’t need to log in every time they want to perform an operation on the server.

To install the library: ``` npm install jsonwebtoken ```

``` eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiJhYmMxMjMiLCJpYXQiOjE1NjcyNzc2OTF9.KrDVzvWy47c639eg5C-Dv7NuKChu-cYpzDjO_7R6htc ```. This is our JWT. It is actually made up of three distinct parts separated by the period. The first piece of the token is a base64 enconded JSON String and it's known as the header. It contains some meta information about what type of token it is and the algorithms that was used to generate it. The second piece in between the two periods it's known as the payload or body. It's also a base64 encoded JSON String and contains the data the we provided. The last piece of the token is called signature and it's used to verify the token later on.

So the goal of the JWT isn't to hide the data that we've provided. This is actually publicly viewable to anyone who has the token. So the whole point of the JWT is to create data that's verifiable via the signature. So if someone else comes along and tries to change the data they're not going to be able to do so successfully because they won't know what secret was used with the algorithm that created it.

The decoded data looks like this:
```
{
    "_id": "abc123",
    "iat": 1546013686
}
```

That *_id* was provided in the example and the *iat* stand of *Issued At* which is a timestamp when the token was created.

## File Upload
Express doesn't support file uploads but here is an NPM library also released and maintained by the same team that maintains Express. And this allows you to add file uploads to express with just a couple lines of code. This library is called Multer. We can install by doing ```npm install multer```. Multer is a node.js middleware for handling *multipart/form-data*, which is primarily used for uploading files.

### Manipulating images
With the NPM module called Sharp we will process the images supplies by users before we save them. We'll be able to resize images, convert the image type so we can store all of our images in a unified type, and more. Sharp also allows us to cut and resize the image using a GUI in the client side.

##### To keep in mind
In deployment servers - like Heroku and AWS - the file system actually gets wiped every time you deploy, which means that we would lose the data - like the user images. So instead of storing them on the file system we're going to add a field onto the User model to store the image of binary data.

## Environment Variables
Environment variable are important for two main reasons. The first has to do with security and the second has todo with customizability. We set values for when the app is running on production and when it's running locally. Its also a good ideia to use environment variable to avoid sensitive data going in to git.

The library used in this course is called *env-cmd* but there better ones like *dotenv*.

## Testing with Jest
To install Jest as a Dev Dependency we can run ```npm install jest --save-dev```.

When we register a test we call the *test()* function providing a name and the function. When Jest runs our tests it simply runs that function. If the function throws an error then the test case is considered a failure. If the function does not throw an error then the test case is considered success.

To test express application we'll use a library called *SuperTest* that can be installed by running ```npm install supertest --save-dev```.

It's a good thing to have a separate database for testing purposes. When our test cases run we need to make sure they're starting from a nice clean slate by wiping all of the data in the test database before the test cases execute to make sure they can run consistently over time.

In the testing world a fixture or fixtures are things that allow you to set up the environment your tests are going to run in. In this course we're going to put an image inse of that directory so our tests can use when they're traying to upload an image to test that endpoint.

It's important to recognize that our test cases can interfere with each other if we let them. With Jest we can fix this by running the opting ```--runInBand``` along with the ```jest``` command. To see the result check the ```package.json``` in the chapter 12.

#### Why make tests?
- **Saves time**: we write code once to test a specific feature and we can run it as many ties as we'd like. This is gonna be even greater as your application grows in size. It will no longer be feasible to manually test everything and you'll rely on an automatic test suite.
- **Creates realiable software**: you'll be able to spot and fix bugs before they actually get shipped to production and mess up users. This becomes even better when you integrate a test suite to your repository, that only allows deployment if all tests succeed.
- **Gives flexibility to developers**:
  - Refatoring
  - Collaborating
  - Profiling (you can see if the speed your test cases run goes up or down as you make changes)
- **Peace of mind**.

### Mocking NPM modules
The process of mocking is the process of replacing the real functions that run with functions that you create when we're running in a test environment. One good example of this usage is when we have functions that send email when certain event occurs. We don't want to send those emails everytime we run a test suite - except when we are explicitly testing emails - so we create fake functions that does nothing, like the ones in ```/tests/__mocks__/@sendgrid/mail.js```.

## The WebSocket Protocol
- WebSockets allow for full-duplex (that means bidirectional) communication
- WebSocket is a separe protocol from HTTP
- Persistent connection between client and server

### Socket.io
The first thing we have to do is to refactor our application so we can use both Express and Socket.io. That has to happen because the *socketio()* functions expects to be called with the raw HTTP server that we create by importing the *http* core module. To wrap up, we need something like this:

```
const http = require('http');
const express = require('express');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketio(server);
```

#### What we can easily do with Socket.io
- Emit an event from server to cliente and vice-versa
- Broadcast and event (this means that everybody receives it except the current user)
- Send acknowledgements when receiving something
- Join a specific room