
const { Command } = require('commander');

const { listContacts, getContactById, addContact, removeContact } = require('./contacts');

const program = new Command();
program
  .option('-a, --action <type>', 'choose action')
  .option('-i, --id <type>', 'user id')
  .option('-n, --name <type>', 'user name')
  .option('-e, --email <type>', 'user email')
  .option('-p, --phone <type>', 'user phone');

program.parse(process.argv);

const argv = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
    switch (action) {
      case 'list':
        const allContactsData = await listContacts();
        console.log(allContactsData);
        break;
  
      case 'get':
        const contactDataId = await getContactById(id);
        console.log(contactDataId);
        break;
  
      case 'add':
        const newContactData = await addContact({id, name, email, phone});
        console.log(newContactData);
        break;
  
      case 'remove':
        const deleteContactId = await removeContact();
        console.log(deleteContactId);
        break;
  
      default:
        console.warn('\x1B[31m Unknown action type!');
    }
  }
  
// invokeAction(argv); 

 invokeAction({action: "list"});

// (async () => {
//     await invokeAction(argv);
//   })();