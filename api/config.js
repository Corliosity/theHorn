var connectionString = process.env.DATABASE_URL + '?ssl=true' || 'postgres://localhost:5432/podcasts';

module.exports = connectionString;