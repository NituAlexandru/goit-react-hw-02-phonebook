import React, { Component } from 'react';
import propTypes from 'prop-types';
import styles from './ContactForm.module.css';

class ContactForm extends Component {
  state = {
    name: '',
    number: '',
    filter: '',
  };

  handleChange = event => {
    const { name, value } = event.target;

    if (name === 'name') {
      // Permite numai litere, apostrof, cratimă și spații pentru nume.
      const cleanedName = value.replace(/[^a-zA-Z '-]/g, '');
      this.setState({ [name]: cleanedName });
    } else if (name === 'number') {
      // Permite numai cifre și anumite caractere pentru numărul de telefon.
      const cleanedNumber = value.replace(/[^\d+() -]/g, '');
      this.setState({ [name]: cleanedNumber });
    }
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.onAddContact(this.state.name, this.state.number);
    this.setState({ name: '', number: '' });
  };
  render() {
    return (
      <form onSubmit={this.handleSubmit} className={styles.form}>
        <label className={styles.label}>
          <p>Name: </p>
          <input
            type="text"
            name="name"
            pattern="^[a-zA-Z]+(([' -][a-zA-Z ])?[a-zA-Z]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            value={this.state.name}
            onChange={this.handleChange}
          />
          <p>Number: </p>
          <input
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
            value={this.state.number}
            onChange={this.handleChange}
          />
        </label>
        <button type="submit">Add contact</button>
      </form>
    );
  }
}

ContactForm.propTypes = {
  onAddContact: propTypes.func.isRequired,
  onFilterChange: propTypes.func.isRequired,
  filter: propTypes.string.isRequired,
};

export default ContactForm;
