const settings = require("./settings");
const knex = require("knex") ({
  client: 'pg',
  connection: {
    user     : settings.user,
    password : settings.password,
    database : settings.database,
    host     : settings.hostname,
    port     : settings.port,
    ssl      : settings.ssl
  }
});

const moment = require("moment");

let firstName = process.argv[2];
let lastName = process.argv[3];
let date = process.argv[4];

knex('famous_people')
  .insert({first_name: firstName, last_name: lastName, birthdate: date}).returning('*')
  .asCallback(function(err, rows) {
    if (err) return console.error("Connection Error", err);
    console.log(`Added ${firstName} ${lastName} to the database`);

    return knex.destroy();
  });