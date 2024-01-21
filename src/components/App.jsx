import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';
import Notiflix from 'notiflix';
import styles from './App.module.css'

class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  handleAddContact = (name, number) => {
    const { contacts } = this.state;

    const isContactExist = contacts.some(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );

    if (isContactExist) {
      Notiflix.Notify.failure(`${name} is already in contacts`);
      return;
    }

    const newContact = {
      id: nanoid(),
      name,
      number,
    };
    this.setState(prevState => ({
      contacts: [...prevState.contacts, newContact],
    }));
    Notiflix.Notify.success(`${name} added to contacts`);
  };

  timeoutId = null;

  handleFilterChange = event => {
    const { value } = event.target;
    this.setState({ filter: value });

    // Clear the previous timeout if the user types again before the delay
    if (this.timeoutId !== null) {
      clearTimeout(this.timeoutId);
    }

    // Set a new timeout
    this.timeoutId = setTimeout(() => {
      this.checkForContact(value);
    }, 1000);
  };

  checkForContact = searchValue => {
    const { contacts } = this.state;

    const searchValueLower = searchValue.toLowerCase();

    const filteredContacts = contacts.filter(
      contact =>
        contact.name.toLowerCase().includes(searchValueLower.toLowerCase()) ||
        contact.number.includes(searchValue)
    );

    if (searchValue.trim() === '') {
      // No need to notify if the search value is empty
      return;
    }

    if (filteredContacts.length > 0) {
      Notiflix.Notify.success('Contact is in the list.');
    } else {
      Notiflix.Notify.failure('Contact is not in the list.');
    }
  };

  handleDeleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
    Notiflix.Notify.success('Contact deleted successfully');
  };

  render() {
    const { contacts, filter } = this.state;
    const filterLower = filter.toLowerCase();
    const filteredContacts = contacts.filter(
      contact =>
        contact.name.toLowerCase().includes(filterLower) ||
        contact.number.includes(filter)
    );

    return (
      <div>
        <h1 className={styles.title}>Phonebook</h1>
        <ContactForm
          onAddContact={this.handleAddContact}
          onFilterChange={this.handleFilterChange}
          filter={this.state.filter}
        />
        <h2>Contacts</h2>
        <Filter value={filter} onChange={this.handleFilterChange} />
        <ContactList
          contacts={filteredContacts}
          onDeleteContact={this.handleDeleteContact}
        />
      </div>
    );
  }
}

export default App;
