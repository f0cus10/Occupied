import React, { useState } from 'react'
import {Form, FormLayout, Layout, TextField, Button, Select, ChoiceList} from '@shopify/polaris';

export default function SpaceEdit({ data, handleUpdate, uniqueCategories }) {
  const [name, setName] = useState(data.name);
  const [desc, setDesc] = useState(data.description);
  const [cat, setCat] = useState(data.category);
  const [url, setUrl] = useState(data.imageUrl);
  
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
      <Button onClick={() => handleUpdate(name, desc, cat, url)} primary> Save </Button>
    </FormLayout>
  )
}
