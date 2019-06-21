const express = require('express');
const router = express.Router();
const members = require('../../models/Member.js');
const uuid = require('uuid');

router.get('/', (req, res) => {
  res.json(members);
});

router.get('/:id', (req, res) => {
  const member = members.filter(member => member.id === parseInt(req.params.id))
  if (member.length > 0) {
    res.json(member);
  } else {
    res.status(400).json({ msg: 'Member not found' });
  }
});

router.post('/', (req, res) => {
  const newMember = {
    id: uuid.v4(),
    name: req.body.name,
    email: req.body.email,
    status: 'active'
  }

  if (!newMember.name || !newMember.email) {
   return res.status(400).json({msg: 'Please include name and email'});
  }

  members.push(newMember);

  res.json(members);
});

router.put('/:id', (req, res) => {
  const member = members.filter(member => member.id === parseInt(req.params.id))
  if (member.length > 0) {
    const updateMember = req.body;
    members.forEach(member => {
      if(member.id == parseInt(req.params.id)){
        member.name = updateMember.name ? updateMember.name : member.name;
        member.email = updateMember.email ? updateMember.email : member.email;

        res.json({msg: 'Member was updated', member});
      }
    })
    res.json(member);
  } else {
    res.status(400).json({ msg: 'Member not found' });
  }
});

module.exports = router;