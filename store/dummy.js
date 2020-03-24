const db = {
  user: [
    { id: '1', name: 'Yoshua' },
    { id: '2', name: 'Monni' }
  ]
}

async function list (table) {
  return db[table]
}
async function get (table, id) {
  const collection = await list(table)
  const user = new Promise((resolve, reject) => {
    const userRecord = collection.find(item => item.id === id) || null
    if (userRecord) {
      return resolve(userRecord)
    } else {
      return reject(`${table} not found`)
    }
  })

  return user
}
async function upsert (table, data) {
  const collection = await list(table)
  db[collection].push(data)
  return true
}
async function remove (table, id) {
  return true
}

module.exports = {
  list,
  get,
  upsert,
  remove
}
