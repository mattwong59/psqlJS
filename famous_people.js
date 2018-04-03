const pg = require("pg");
const settings = require("./settings");
const moment = require("moment");

const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});

client.connect((err) => {
  if (err) {
    return console.error("Connection Error", err);
  }
  console.log("Searching ...")
  client.query("SELECT * FROM famous_people WHERE first_name = $1", [process.argv[2]], (err, result) => {
    if (err) {
      return console.error("error running query", err);
    }
    console.log (` Found ${result.rowCount} person(s) by the name '${process.argv[2]}':`);

    result.rows.forEach(function(person, index) {
      let date = moment(person.birthdate).format("YYYY-MM-DD");
      index +=1;
      console.log(`- ${index}: ${person.first_name} ${person.last_name}, born '${date}'`);
    });
    client.end();
  });
});