import React from 'react';

function NewCard({ }) {
  return (
    <Card sectioned>
      <FormLayout>
        <TextField
          label="Full name"
          value={nameFieldValue}
          onChange={this.handleNameFieldChange}
        />
        <TextField
          type="email"
          label="Email"
          value={emailFieldValue}
          onChange={this.handleEmailFieldChange}
        />
      </FormLayout>
    </Card>
  );
}

export default NewCard;
