import React, { useState } from 'react'
import {FormLayout, TextField, Button, Select} from '@shopify/polaris';

export default function CreateSpaceModal({handleUpdate}) {
  const [name, setName] = useState('Bathroom');
  const [desc, setDesc] = useState('This is a space!');
  const [cat, setCat] = useState('Restroom');
  const [exp, setExp] = useState('30');
  const [url, setUrl] = useState('http://www.propertybazaar.com/content/img/no-user-Image.png');
  
  return (
    <FormLayout>
      <TextField value={name} label="Name" onChange={(val) => setName(val)} />
      <TextField value={desc} label="Description" onChange={(val) => setDesc(val)} />
      <TextField value={url} label="Image Url" onChange={(val) => setUrl(val)} />
      <TextField value={cat} label="Category" onChange={(val) => setCat(val)} />
      <TextField value={exp} label="Expiration Time (in minutes)" onChange={(val) => setExp(val)} />
      <Button onClick={() => handleUpdate(name, desc, cat, exp, url)} primary> Create </Button>
    </FormLayout>
  )
}
