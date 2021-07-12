var { createCar, getCars, sellCar } = require('./service');

exports.post = (req, res, next)=>{
  var {price, sku, model, name} = req.body;
  let is_valid = price && sku && model && name;
  if (!is_valid) { //if required fields are not provided
    req.errStatus = 400;
    let errString = 'price, sku, model and name fields are required';
    next(new Error(errString));
  } else {
    createCar({price: price, sku: sku, model: model, name:name})
      .then(results=>{
        res.status(201).json(results);
      })
      .catch(err=>{
        next(err);
      });
  }
}

exports.get = (req, res, next)=>{
  getCars()
    .then(results=>{
      res.status(200).json(results);
    })
    .catch(err=>{
      next(err);
    });
}

exports.sell = (req, res, next)=>{
  sellCar(req.params.id)
    .then(results=>{
      res.status(201).json(results);
    })
    .catch(err=>{
      next(err);
    });
}
