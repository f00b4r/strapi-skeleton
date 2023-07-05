const path = require("path");
const parse = require('pg-connection-string').parse;

module.exports = ({ env }) => {
  const client = env("DATABASE_TYPE", "postgres");

  // SQLite
  if (client === "sqlite") {
    return {
      defaultConnection: 'default',
      connections: {
        default: {
          connector: 'bookshelf',
          settings: {
            client: 'sqlite',
            filename: env('DATABASE_FILENAME', '.tmp/data.db'),
          },
          options: {
            useNullAsDefault: true,
          },
        },
      },
    };
  }

  // MySQL/MariaDB
  if (client === "mysql") {
    const config = parse(String(env('DATABASE_URL')));

    return {
      defaultConnection: 'default',
      connections: {
        default: {
          connector: 'bookshelf',
          settings: {
            client: 'mysql',
            host: config.host,
            port: config.port,
            database: config.database,
            username: config.user,
            password: config.password,
            ssl: env.bool("DATABASE_SSL", false),
          },
          options: {
            ssl: env.bool("DATABASE_SSL", false),
          },
        }
      },
    };
  }

  // PostgreSQL
  if (client === "postgres") {
    const config = parse(String(env('DATABASE_URL')));

    return {
      defaultConnection: 'default',
      connections: {
        default: {
          connector: 'bookshelf',
          settings: {
            client: 'postgres',
            host: config.host,
            port: config.port,
            database: config.database,
            username: config.user,
            password: config.password,
            ssl: env.bool("DATABASE_SSL", false),
          },
          options: {
            ssl: env.bool("DATABASE_SSL", false),
          },
        }
      },
    };
  }

  throw `Unsupported DATABASE_TYPE "${env("DATABASE_TYPE")}", please setup database.js`;
}
