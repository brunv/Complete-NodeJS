# Complete NodeJS Study Repository

Resouces:
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