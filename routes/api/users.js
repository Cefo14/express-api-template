const router = require('express').Router();

const {
  index,
  show,
  store,
  update,
  destroy,
} = require('../../controllers/users');
const {
  index: indexValidator,
  show: showValidator,
  store: storeValidator,
  update: updateValidator,
  destroy: destroyValidator,
} = require('../../validators/users');

router.get('/', indexValidator(), index);
router.get('/:id', showValidator(), show);
router.post('/', storeValidator(), store);
router.put('/:id', updateValidator(), update);
router.delete('/:id', destroyValidator(), destroy);

module.exports = router;
