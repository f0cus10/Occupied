import React, { useState } from 'react'
import '../styles/Input.css';

function Input({ children, onChange }) {
  return (
    <input
      className="input pass transparent"
      onChange={onChange}
      name="firstName"
      type="text"
      value={children}
      placeholder="First Name"
      autoFocus="autofocus"
      required={false}
    />
  );
}

export default Input
