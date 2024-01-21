import React from 'react';
import propTypes from 'prop-types';

const ContactItem = ({ contact, onDeleteContact }) => (
  <li>
    {contact.name}: {contact.number}
    <button type="button" onClick={() => onDeleteContact(contact.id)}>
      Delete
    </button>
  </li>
);

ContactItem.propTypes = {
  contact: propTypes.shape({
    id: propTypes.string.isRequired,
    name: propTypes.string.isRequired,
    number: propTypes.string.isRequired,
  }).isRequired,
  onDeleteContact: propTypes.func.isRequired,
};

export default ContactItem;
