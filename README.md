# Complete NodeJS Study Repository

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

## Node Debugger
Printing values to the console with ```console.log``` is a good start, but there are often times where we need a more complete debugging solution. For that, Node.js ships with a built-in debugger. It builds off of the developer tools that Chrome and V8 use when debugging JavaScript code in the browser. Start your application with ```inspect``` to use the debugger, like this:
```
node inspect app.js
```
Next, visit ```chrome://inspect``` in the Chrome browser. There, you’ll see a list of all the Node.js processes that you’re able to debug. Click “inspect” next to your Node.js process to open up the developer tools. From there, you can click the blue “play” button near the top-right of the “sources” tab to start up the application.
When running the app in debug mode, you can add breakpoints into your application to stop it at a specific point in the code. This gives you a chance to explore to the application state and figure out what’s going wrong.
```
console.log('Thing one) 
 
debugger // Debug tools will pause here until your click play again 
 
console.log('Thing two)
```