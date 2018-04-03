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

knex('famous_people').select()
  .where('first_name', '=', firstName)
  .asCallback(function(err, rows) {
    if (err) return console.error("Connection Error", err);
    console.log("Searching ...")
    console.log (` Found ${rows.length} person(s) by the name '${firstName}':`);
    rows.forEach(function(person, index) {
          let date = moment(person.birthdate).format("YYYY-MM-DD");
          index +=1;
          console.log(`- ${index}: ${person.first_name} ${person.last_name}, born '${date}'`);
        });
    return knex.destroy();
  });

