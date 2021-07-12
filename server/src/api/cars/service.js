const Car = require('./model');

exports.createCar = (car)=>{
  return new Promise((resolve, reject)=>{
    Car.create(car)
      .then(saved=>{
        resolve(saved);
      })
      .catch(err=>{
        reject(err);
      });
  });
}

exports.getCars = ()=>{
  return new Promise(function(resolve, reject) {
    Car.find({})
      .then(res=>{
        resolve(res);
      })
      .catch(err=>{
        reject(err);
      });
  });
}

exports.sellCar = async (id)=>{
  return new Promise(function(resolve, reject) {
    Car.findOneAndUpdate({_id: id}, {status: 'sold out', soldAt: Date.now()}, {new: true})
      .then(updated=>{
        resolve(updated);
      })
      .catch(err=>{
        reject(err);
      });
  });
}
