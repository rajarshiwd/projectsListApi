var express = require('express');
var bodyParser = require('body-parser');
var {ObjectID} = require('mongodb');
const _ = require('lodash');
var {mongoose} = require('./db/mongoose');
var {ProjetList} = require('./models/projectlist');
var {User} = require('./models/user');

var app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/projects', (req, res) => {
  var project = new ProjetList({
    position: req.body.position,
    name: req.body.name,
    cname: req.body.cname,
    symbol: req.body.symbol
  });

  project.save().then((doc) => {
    res.send(doc);
  }, (e) => {
    res.status(400).send(e);
  });
});

app.get('/projects', (req, res) => {
  ProjetList.find().then((projects) => {
    res.send({projects});
  }, (e) => {
    res.status(400).send(e);
  });
});

app.get('/projects/:id', (req, res) => {
  var id = req.params.id;

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  ProjetList.findById(id).then((project) => {
    if (!project) {
      return res.status(404).send();
    }

    res.send({project});
  }).catch((e) => {
    res.status(400).send();
  });
});

app.patch('/projects/:id',  (req, res) => {
  var id = req.params.id;
  var body = _.pick(req.body, ['position', 'name','cname','symbol']);

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }


  ProjetList.findOneAndUpdate({_id: id}, {$set: body}, {new: true}).then((project) => {
    if (!project) {
      return res.status(404).send();
    }

    res.send({project});
  }).catch((e) => {
    res.status(400).send();
  })
});

app.listen(port, () => {
  console.log(`Started up at port ${port}`);
});

module.exports = {app};
