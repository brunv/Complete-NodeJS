# NPM Crash Course
Made by Traversy Media. Link to the course [here](https://www.youtube.com/watch?v=jHDhaSSKmB0).

## Package.json file
- Manifest file with application info
- Lists dependecies (name & version)
- Specify if versions should be updated
- Create NPM scripts
- Easily created with ```npm init```

## Starting NPM
You can start it by running ```npm init``` in the app folder.
To accept all the answers about the configuration you can run ```npm init -y```.

### Default init configurations

##### Set init
Here's an example on how to change the default *author* and *license*:
```
npm config set init-author-name "_name_"
or
npm set init-license "_license_type_"
```

##### Get init
To check the default config you can run the same command switching *set* by *get*:
```
npm get init-author-name
or
npm config get init-license
```

##### Reset init
To rollback to the default configuration, you can use the *delete* command:
```
npm config delete init-author-name
or
npm config delete init-license
```

## Installing a package
If you're already have a project with *package.json* with all the dependencies needed, you just have to install them with ```npm install```. This is a common practice because we do not share the *node_modules* folder across environments. Keep in mind that this command actually install the regular dependencies plus the dev dependencies.
If you're installing the packages on a production environment you can run ```npm install --production``` to avoid installing the dev depencies packages.

### Installing a specific package

With NPM 5+ you don't need to use *--save* anymore.
```
npm install _package_name_ --save
or
npm install _package_name_
or simply
npm i _package_name_
```

### Installing a specifc version of a specific package
Just insert *@version_number* right after the package name. Like this:
```
npm install _package_name_@5.4.2
```
*Check semantic versioning at the bottom of this page.*

### Installing as a Development Dependency
Installing a package as a dev dependency means that we're only going to use this package for local development. It's not going to production environments. Things like compilers and minifiers fit in this case.

Here's an example installing gulp and gulp-sass:
```
npm install --save-dev gulp gulp-sass
```

### Installing and removing global modules
Installing modules globally will make the module available anywhere in you computer. This is commonly used when you want to install tools that does not belong to any specific project (like live-server and nodemon) and can be used for whatever reason. Let's an example using *nodemon*:
```
npm install -g nodemon
```

Globally installed modules doesn't go to the *package.json* file because its saved directly on your computer. To check where is it installed run:
```
npm root -g
```

To remove any global module just use the *remove* or *uninstall* command along with the global flag:
```
npm remove -g live-server
```

## Removing dependencies
Just use the *uninstall* or *remove* command:
```
npm uninstall gulp-sass --save-dev
npm un gulp-sass --save-dev
or
npm remove gulp --save-dev
npm rm gulp --save-dev
```
You can omit the --save-dev if your package is not a dev dependency.

## Listing application's modules
The ```npm list``` will list all the dependecies in a project. But you can fine tune this search by using the *--depth* command: ```npm list --depth 1```.

## NPM Scripts
You can make script that can be run by npm itself. This scripts are located in the *package.json* file. Here's an example:
```
"scripts": {
    "start": "node index.js",
    "server": "live-server"
  },
```
With this we can run ```npm start``` to have our application running and ```npm run server``` to start a server in the current directory. This can be used to automate deployment, minifying, building the application and so on.

## Dependency Version
Let's take this code sample as an example:
```
"dependencies": {
    "lodash": "^4.17.15"
    "gulp": "~9.11.2",
    "express": "6.4.0",
    "json-server": "*"
  },
```
The ```^``` means that only the Major Version should remain the same. So if there's a 4.18.x version when you do *npm install*, this latest vesion will be installed.
But the ```~``` means that only the Patch version can be upgraded when there is a new version available.
If there's no character before the version number then that exact version will be installed when you run *npm install*. But if there's a ```*``` instead of a version number, then the latest version of all will be installed.

# Semantic Versioning
Take **8.2.6** as an example of a module version.
The **8** represents the **Major** vesion: it contains major changes and breaks de API.
The **2** represents the **Minor** version: it adds new features but does not break the API.
And the **6** represents the **Patch** version that contains only bug fixes.