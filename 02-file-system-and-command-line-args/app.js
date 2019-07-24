const yargs = require('yargs');
const notes = require('./notes.js');

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
    handler: () => notes.listNotes()
});

yargs.command({
    command: 'read',
    describe: 'Read a note.',
    builder: {
        title: {
            describe: 'Note Title',
            demandOption: true,
            type: 'string'
        }
    },
    handler: (argv) => notes.readNote(argv.title)
});

yargs.command({
    command: 'add',
    describe: 'Add a new note.',
    builder: {
        title: {
            describe: 'Note Title',
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: 'Note body',
            demandOption: true,
            type: 'string'
        }
    },
    handler: (argv) => notes.addNote(argv.title, argv.body)
});

yargs.command({
    command: 'remove',
    describe: 'Remove a note.',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        }
    },
    handler: (argv) => notes.removeNote(argv.title)
});

yargs.parse();