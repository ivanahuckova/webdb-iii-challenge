module.exports = {
  development: {
    client: 'sqlite3',
    useNullAsDefaul: true,
    connection: {
      filename: './data/lambda.sqlite3'
    },
    migrations: {
      directory: './data/migrations'
    },
    seeds: {
      directory: './data/seeds'
    }
  }
}