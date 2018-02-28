var mongoose = require('mongoose');

var ProjetList = mongoose.model('ProjetList', {
  positon: {
    type:Number,
    

  },
  name:{
    type:String
  },
  cname:{
    type:String
  },
  symbol: {
  type:String
  },
 
});

module.exports = {ProjetList};
