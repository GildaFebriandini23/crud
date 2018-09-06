/**
 * Baju
 *
 * @module      :: Routes
 * @description :: Maps routes and actions
 * @author      :: Gilda febriandini
 */

var Baju = require('../models/baju.js');

module.exports = function(app) {


  /**
   * Find and retrieves all bajus
   * @param {Object} req HTTP request object.
   * @param {Object} res HTTP response object.
   */
  findAllBajus = function(req, res) {
    console.log("GET - /bajus");
    return Baju.find(function(err, bajus) {
      if(!err) {
        return res.send(bajus);
      } else {
        res.statusCode = 500;
        console.log('Internal error(%d): %s',res.statusCode,err.message);
        return res.send({ error: 'Server error' });
      }
    });
  };



  /**
   * Find and retrieves a single baju by its ID
   * @param {Object} req HTTP request object.
   * @param {Object} res HTTP response object.
   */
  findById = function(req, res) {

    console.log("GET - /baju/:id");
    return Baju.findById(req.params.id, function(err, baju) {

      if(!baju) {
        res.statusCode = 404;
        return res.send({ error: 'Not found' });
      }

      if(!err) {
        return res.send({ status: 'OK', baju:baju });
      } else {

        res.statusCode = 500;
        console.log('Internal error(%d): %s', res.statusCode, err.message);
        return res.send({ error: 'Server error' });
      }
    });
  };




  /**
   * Creates a new baju from the data request
   * @param {Object} req HTTP request object.
   * @param {Object} res HTTP response object.
   */
  addBaju = function(req, res) {

    console.log('POST - /baju');

    var baju = new Baju({
      model:    req.body.model,
      size:    req.body.size,
      color:    req.body.color,
      price:    req.body.price
    });

    baju.save(function(err) {

      if(err) {

        console.log('Error while saving baju: ' + err);
        res.send({ error:err });
        return;

      } else {

        console.log("Baju created");
        return res.send({ status: 'OK', baju:baju });

      }

    });

  };



  /**
   * Update a baju by its ID
   * @param {Object} req HTTP request object.
   * @param {Object} res HTTP response object.
   */
  updateBaju = function(req, res) {

    console.log("PUT - /baju/:id");
    return Baju.findById(req.params.id, function(err, baju) {

      if(!baju) {
        res.statusCode = 404;
        return res.send({ error: 'Not found' });
      }

      if (req.body.model != null) baju.model = req.body.model;
      if (req.body.size != null) baju.size = req.body.size;
      if (req.body.price != null) baju.price  = req.body.price;
      if (req.body.color != null) baju.color = req.body.color;

      return baju.save(function(err) {
        if(!err) {
          console.log('Updated');
          return res.send({ status: 'OK', baju:baju });
        } else {
          if(err.name == 'ValidationError') {
            res.statusCode = 400;
            res.send({ error: 'Validation error' });
          } else {
            res.statusCode = 500;
            res.send({ error: 'Server error' });
          }
          console.log('Internal error(%d): %s',res.statusCode,err.message);
        }

        res.send(baju);

      });
    });
  };



  /**
   * Delete a baju by its ID
   * @param {Object} req HTTP request object.
   * @param {Object} res HTTP response object.
   */
  deleteBaju = function(req, res) {

    console.log("DELETE - /baju/:id");
    return Baju.findById(req.params.id, function(err, baju) {
      if(!baju) {
        res.statusCode = 404;
        return res.send({ error: 'Not found' });
      }

      return baju.remove(function(err) {
        if(!err) {
          console.log('Removed baju');
          return res.send({ status: 'OK' });
        } else {
          res.statusCode = 500;
          console.log('Internal error(%d): %s',res.statusCode,err.message);
          return res.send({ error: 'Server error' });
        }
      })
    });
  }

  //Link routes and actions
  app.get('/baju', findAllBajus);
  app.get('/baju/:id', findById);
  app.post('/baju', addBaju);
  app.put('/baju/:id', updateBaju);
  app.delete('/baju/:id', deleteBaju);

}