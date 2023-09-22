const fs = require("fs/promises");
const path = require("path");
const contactsPath = path.join(__dirname, "db", "contacts.json");

const nanoid = require("nanoid");


async function listContacts() {
    const data = await readFile(booksPath);
    return JSON.parse(data);
  }
  
async function getContactById(contactId) {
    const contacts = await listContacts();
    const result = contacts.find(item => item.id === id);
    return result || null;
  }
  
async function removeContact(contactId) {
    const contacts = await listContacts();
    const index = contacts.findIndex(item => item.id === id);
    if(index === -1){
         return null;
    }
    const [result] = contacts.splice(index, 1);
    await writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return result;
  }
  
async function addContact(data) {
    const contacts = await listContacts();
    const newContact = {
        id: nanoid(),
        ...data,
    }
    contacts.push(newContact);
    await writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return newContact; 
  }


module.export = {
    listContacts,
    getContactById,
    removeContact,
    addContact
};

