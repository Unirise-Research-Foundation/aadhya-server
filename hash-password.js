const bcrypt = require('bcrypt');

// Get password from command line argument or use default
const password = process.argv[2] || 'glenn@octalogic.in';

async function hashPassword() {
  try {
    const hash = await bcrypt.hash(password, 10);
    console.log('\n========================================');
    console.log('Password:', password);
    console.log('Hashed:', hash);
    console.log('========================================\n');
    console.log('You can use this hash in your database or SQL insert statements.');
    console.log('\nExample SQL:');
    console.log(`INSERT INTO person (id, username, password, name, yob, "createdAt", "updatedAt")`);
    console.log(`VALUES (uuid_generate_v4(), 'glenn', '${hash}', 'Glenn', 1990, NOW(), NOW());`);
    console.log('========================================\n');
  } catch (error) {
    console.error('Error hashing password:', error);
  }
}

hashPassword();

