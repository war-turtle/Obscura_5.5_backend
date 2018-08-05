const env = process.env.NODE_ENV; // 'dev' or 'prod'

const dev = {
  app: {
    port: 3000,
  },
  db: {
    host: 'localhost',
    port: 27017,
    name: 'db',
  },
};

const prod = {
  app: {
    port: 3000,
  },
  db: {
    host: 'localhost',
    port: 27017,
    name: 'test',
  },
};

const config = {
  dev,
  prod,
};

export default config[env];
