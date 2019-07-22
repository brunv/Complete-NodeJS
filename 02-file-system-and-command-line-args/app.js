const yargs = require('yargs');

// Getting argument from console manually
// console.log(process.argv);
// const command = process.argv[2];

// Getting argument from console with 'yargs':
// console.log(yargs.argv);

// Customize yargs version
yargs.version('1.1.0');

// Creating commands
yargs.command({
    command: 'list',
    describe: 'List all the notes.',
    handler: () => console.log('Listing out the notes!')
});

yargs.command({
    command: 'read',
    describe: 'Read a note.',
    handler: () => console.log('Reading the note!')
});

yargs.command({
    command: 'add',
    describe: 'Add a new note.',
    handler: () => console.log('Adding note!')
});

yargs.command({
    command: 'remove',
    describe: 'Remove a note.',
    handler: () => console.log('Removing the note!')
}).argv;