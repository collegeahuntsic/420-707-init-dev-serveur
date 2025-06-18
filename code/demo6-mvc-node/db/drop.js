async function dropTables(db) {
  await db.execute('SET FOREIGN_KEY_CHECKS = 0');
  // await db.execute('DROP TABLE IF EXISTS items');
  // console.log('Table "items" supprimée.');

  // await db.execute('DROP TABLE IF EXISTS commandes');
  // console.log('Table "commandes" supprimée.');

  await db.execute('DROP TABLE IF EXISTS utilisateurs');
  console.log('Table "utilisateurs" supprimée.');

  await db.execute('SET FOREIGN_KEY_CHECKS = 1');
}

module.exports = {
  dropTables
};
