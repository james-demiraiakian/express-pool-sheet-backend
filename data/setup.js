// const path = require('node:path');
// const url = require('node:url');

const fs = require('fs').promises;

module.exports = async (pool) => {
  // // eslint-disable-next-line no-global-assign
  // __dirname = path.dirname(url.fileURLToPath(import.meta.url));
  return fs
    .readFile(`${__dirname}/../sql/setup.sql`, { encoding: 'utf-8' })
    .then((sql) => pool.query(sql))
    .then(() => console.log('✅ Database setup complete!'))
    .catch((error) => {
      const dbNotFound = error.message.match(/database "(.+)" does not exist/i);

      if (dbNotFound) {
        const [err, db] = dbNotFound;
        console.error('❌ Error: ' + err);
        console.info(
          `Try running \`createdb -U postgres ${db}\` in your terminal`
        );
      } else {
        console.error(error);
        console.error('❌ Error: ' + error.message);
      }
    });
};
