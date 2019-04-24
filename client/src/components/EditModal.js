import React, { useState } from 'react'
import {Form, FormLayout, Layout, TextField, Button, Select} from '@shopify/polaris';

export default function EditModal({ data, handleUpdate }) {
  const [name, setName] = useState(data.name);
  const [desc, setDesc] = useState(data.description);
  const [cat, setCat] = useState(data.category);
  const { category } = data.category
  const options = [
    {label: category, value: category},
    {label: 'School', value: 'School'},
    {label: 'Building', value: 'Building'},
    {label: 'Park', value: 'Park'},
  ]
  return (
    <FormLayout>
      <TextField value={name} label="Name" onChange={(val) => setName(val)} />
      <TextField value={desc} label="Description" onChange={(val) => setDesc(val)} />
      <Select
        label="Category"
        options={options}
        onChange={(val) => setCat(val)}
        value={cat}
      />
      <Button onClick={() => handleUpdate(name, desc, cat)} primary> Save </Button>
    </FormLayout>
  )
}
