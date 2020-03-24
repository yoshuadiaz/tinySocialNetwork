const db = {
  user: [
    { id: 1, name: 'Yoshua' }
  ]
}

const list = (table) => {
  return db[table]
}
const get = (table, id) => {
  const collection = list(table)
  return collection.find(item => item.id === id) || null
}
const upsert = (table, data) => {
  const collection = list(table)
  db[collection].push(data)
  return true
}
const remove = (table, id) => {
  return true
}

module.exports = {
  list,
  get,
  upsert,
  remove
}
