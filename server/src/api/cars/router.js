const router = require('express').Router();
const ctrl = require('./controller');

router.route('/')
  .post(ctrl.post)
  .get(ctrl.get);

router.route('/sell/:id')
  .post(ctrl.sell)//for security purpose we use post not put

module.exports = router;
