const express = require('express');
const store = require('../data/store');
const { validateEquipment } = require('../middleware/validate');

const router = express.Router();

router.get('/', (req, res) => {
  const { category } = req.query;
  const items = category ? store.findByCategory(category) : store.list();
  res.json(items);
});

router.get('/:id', (req, res) => {
  const item = store.findById(Number(req.params.id));
  if (!item) return res.status(404).json({ error: 'Equipment not found' });
  res.json(item);
});

// validateEquipment middleware handles body validation before the handler runs
router.post('/', validateEquipment, (req, res) => {
  const item = store.create(req.body);
  res.status(201).json(item);
});

router.put('/:id', validateEquipment, (req, res) => {
  const item = store.update(Number(req.params.id), req.body);
  if (!item) return res.status(404).json({ error: 'Equipment not found' });
  res.json(item);
});

router.delete('/:id', (req, res) => {
  const deleted = store.remove(Number(req.params.id));
  if (!deleted) return res.status(404).json({ error: 'Equipment not found' });
  res.status(204).end();
});

module.exports = router;
