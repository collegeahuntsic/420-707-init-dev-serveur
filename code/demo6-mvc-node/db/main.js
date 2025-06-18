const { createDatabase, createTables } = require('./db/schema');
const { seedUsers } = require('./db/seed');
const { dropTables } = require('./db/drop');

const args = process.argv.slice(2);

async function main() {
  if (args.includes('--seed-only')) {
    await seedUsers(100);
    return;
  }

  if (args.includes('--reset')) {
    await dropTables();
    await createTables();
    await seedUsers(100);
    return;
  }

  // Par défaut : tout faire
  await createDatabase();
  await createTables();
  await seedUsers(100);
}

main().catch((err) => {
  console.error('❌ Erreur :', err);
});
