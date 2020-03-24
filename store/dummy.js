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
      return reject(new Error(`${table} not found`))
    }
  })

  return user
}
async function upsert (table, data) {
  if (!db[table]) {
    db[table] = []
  }

  db[table].push(data)
  console.log(db)
  return true
}
async function remove (table, id) {
  return true
}

async function query (table, q) {
  const collection = await list(table)
  const keys = Object.keys(q)
  const key = keys[0]

  return collection.find(item => item[key] === q[key]) || null
}

module.exports = {
  list,
  get,
  upsert,
  remove,
  query
}
