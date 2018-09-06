/**
 * Baju
 *
 * @module      :: Model
 * @description :: Represent data model for the Clothes
 * @author      :: Gilda febriandini
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var Baju = new Schema({

  model:    {
    type    : String,
    require : true
  },
  size:   {
    type: String,
    require : true
  },
  color:   {
    type: String,
    require : true
  },
  price :   {
    type    : Number,
    require : true
  },
  modified: {
    type    : Date,
    default : Date.now
  }
});

Baju.path('model').validate(function (v) {
  return ((v != "") && (v != null));
});

module.exports = mongoose.model('Baju', Baju);