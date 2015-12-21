var connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/podcasts';

module.exports = connectionString;