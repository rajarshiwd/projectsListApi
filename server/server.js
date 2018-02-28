var express = require('express');
var bodyParser = require('body-parser');
var {ObjectID} = require('mongodb');
const _ = require('lodash');
var {mongoose} = require('./db/mongoose');
var {ProjetList} = require('./models/projectlist');
var {User} = require('./models/user');
var cors = require('cors');

var app = express();
const port = process.env.PORT || 3000;

app.use(cors());

app.use(bodyParser.json());

app.post('/projects', (req, res) => {
  console.log("hey I am called");
  var project = new ProjetList({
    positon: req.body.positon,
    name: req.body.name,
    cname: req.body.cname,
    symbol: req.body.symbol
  });

  console.log(project);

  project.save().then((doc) => {
    res.send(doc);
  }, (e) => {
    res.status(400).send(e);
  });
});

app.get('/projects', (req, res) => {
  console.log("hey I am called");
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
  var body = _.pick(req.body, ['positon', 'name','cname','symbol']);

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
