import React, { useState } from 'react'
import {Form, FormLayout, Layout, TextField, Button, Select, ChoiceList} from '@shopify/polaris';

export default function EditModal({ data, handleUpdate, uniqueCategories }) {
  const [name, setName] = useState(data.name);
  const [desc, setDesc] = useState(data.description);
  const [cat, setCat] = useState(data.category);
  const [addr, setAddr] = useState(data.address);
  const [url, setUrl] = useState(data.imageUrl);
  const [choice, setChoice] = useState([JSON.stringify(data.isPublic)]);
  
  const options = uniqueCategories.map(cat => (
    {label: cat, value: cat}
  ))
  return (
    <FormLayout>
      <TextField value={name} label="Name" onChange={(val) => setName(val)} />
      <TextField value={desc} label="Description" onChange={(val) => setDesc(val)} />
      <TextField value={url} label="Image Url" onChange={(val) => setUrl(val)} />
      <Select
        label="Category"
        options={options}
        onChange={(val) => setCat(val)}
        value={cat}
      />
      <TextField value={addr} label="Address" onChange={(val) => setAddr(val)} />
      <ChoiceList
        title={'Public'}
        choices={[
          {label: 'Yes', value: 'true'},
          {label: 'No', value: 'false'},
        ]}
        selected={choice}
        onChange={(val) => setChoice(val)}
      />
      <Button onClick={() => handleUpdate(name, desc, cat, addr, url, JSON.parse(choice[0]))} primary> Save </Button>
    </FormLayout>
  )
}
