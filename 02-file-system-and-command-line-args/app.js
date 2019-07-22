// Getting argument from console
const command = process.argv[2];

switch (command) {
    case 'add':
        console.log('Adding note!');
        // console.log(process.argv[3]); // does not work for things like --save
        break;
    case 'remove':
        console.log('Removing note!');
        break;
}