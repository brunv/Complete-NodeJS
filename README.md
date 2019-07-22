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
To parse command strings like *--title="Title"*.