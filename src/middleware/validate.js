const ALLOWED_CATEGORIES = ['ski', 'snowboard', 'helmet', 'boots', 'poles', 'other'];

function validateEquipment(req, res, next) {
  const { name, category, dailyRate } = req.body;
  const errors = [];

  if (!name || typeof name !== 'string' || name.trim() === '') {
    errors.push('name is required and must be a non-empty string');
  }

  if (!category || !ALLOWED_CATEGORIES.includes(category)) {
    errors.push(`category must be one of: ${ALLOWED_CATEGORIES.join(', ')}`);
  }

  if (dailyRate === undefined || typeof dailyRate !== 'number' || dailyRate <= 0) {
    errors.push('dailyRate is required and must be a positive number');
  }

  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  req.body.name = name.trim();
  next();
}

module.exports = { validateEquipment, ALLOWED_CATEGORIES };
