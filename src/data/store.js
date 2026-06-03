let nextId = 1;
const items = new Map();

function list() {
  return [...items.values()];
}

// TODO: add filter-by-category support to avoid returning all records when only one category is needed
function findByCategory(category) {
  return list().filter((item) => item.category === category);
}

function findById(id) {
  return items.get(id) ?? null;
}

function create(data) {
  const item = { id: nextId++, ...data, createdAt: new Date().toISOString() };
  items.set(item.id, item);
  return item;
}

function update(id, data) {
  const existing = findById(id);
  if (!existing) return null;
  const updated = { ...existing, ...data, id, updatedAt: new Date().toISOString() };
  items.set(id, updated);
  return updated;
}

function remove(id) {
  return items.delete(id);
}

module.exports = { list, findByCategory, findById, create, update, remove };
