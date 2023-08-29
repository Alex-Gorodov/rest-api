const express = require('express');
const path = require('path');
const {v4} = require('uuid');
const app = express();

let CONTACTS = [
  {id: v4(), name: 'Alex', value: '054-39-555-73', marked: false},
  {id: v4(), name: 'Michael', value: '053-39-444-73', marked: false},
  {id: v4(), name: 'Boris', value: '050-65-890-45', marked: false},
  {id: v4(), name: 'Max', value: '052-30-000-73', marked: false},
  {id: v4(), name: 'Helen', value: '054-24-222-32', marked: false},
  {id: v4(), name: 'Mark', value: '054-23-333-43', marked: false},
  {id: v4(), name: 'Olga', value: '053-43-34-555', marked: false},
];

app.use(express.json());

app.get('/api/contacts', (req, res) => {
  res.status(200).json(CONTACTS)
})

app.post('/api/contacts', (req, res) => {
  const contact = {...req.body, id: v4(), marked: false};
  CONTACTS.push(contact);
  res.status(201).json(contact);
})

app.delete('/api/contacts/:id', (req, res) => {
  CONTACTS = CONTACTS.filter(contact => contact.id !== req.params.id);
  res.status(200).json({message: 'deleted'});
})

app.put('/api/contacts/:id', (req, res) => {
  const idx = CONTACTS.findIndex(contact => contact.id === req.params.id);
  CONTACTS[idx] = req.body;
  res.json(CONTACTS[idx])
})

app.use(express.static(path.resolve(__dirname, 'client')));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client', 'index.html'));
})

app.listen(3000, () => console.log('server has been started on port 3000...'));
