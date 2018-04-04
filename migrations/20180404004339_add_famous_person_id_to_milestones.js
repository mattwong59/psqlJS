
exports.up = function(knex) {
  return Promise.all([
    knex.schema.alterTable('milestones', function(table){
      table.integer('famous_person_id').references('id').inTable('famous_people').notNull();
    })
  ]);
  // return knex.schema.table('milestones', function(t) {
  //   t.integer('famous_person_id')
  //   .notNullable()
  //   .references('id')
  //   .inTable('famous_people')
  // })
};

exports.down = function(knex) {
  return knex.schema.table('milestones', function(t) {
    t.dropColumn('famous_person_id');
  })

};
