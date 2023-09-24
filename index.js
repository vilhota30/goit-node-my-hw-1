
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
        console.dir(allContactsData);
        break;
  
      case 'get':
        const contactDataId = await getContactById(id);
        console.dir(contactDataId);
        break;
  
      case 'add':
        const newContactData = await addContact({ name, email, phone});
        console.dir(newContactData);
        break;
  
      case 'remove':
        const deleteContactId = await removeContact(id);
        console.dir(deleteContactId);
        break;
  
      default:
        console.warn('\x1B[31m Unknown action type!');
    }
  }
  

  const actionIndex = process.argv.indexOf("--action");
  if (actionIndex !== -1) {
    const action = process.argv[actionIndex + 1];
    invokeAction({action});
  }

//  invokeAction(argv); 

  // invokeAction({action: "list"});
  // invokeAction({action: "get", id: "drsAJ4SHPYqZeG-83QTVW" });
  // invokeAction({action: "add", name: "Alice", email: "alice.contacts@gmail.com", phone: "(500) 128-1293"});
  // invokeAction({action: "remove", id: "Z5sbDlS7pCzNsnAHLtDJd"});


// (async () => {
//     await invokeAction(argv);
//   })();