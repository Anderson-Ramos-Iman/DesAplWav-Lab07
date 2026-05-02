import bcrypt from 'bcrypt';
import User from '../models/User.js';
import Role from '../models/Role.js';

export default async function seedUsers() {
    const adminRole = await Role.findOne({ name: 'admin' });
    if (!adminRole) return;

    const existing = await User.findOne({ email: 'admin@test.com' });
    if (existing) return;

    const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS ?? '10', 10);
    const hashed = await bcrypt.hash('Admin@123', saltRounds);

    const userRole = await Role.findOne({ name: 'user' });

    await User.create({
        email: 'admin@test.com',
        password: hashed,
        name: 'Admin',
        lastName: 'Principal',
        phoneNumer: '999999999',
        birthdate: new Date('1990-01-01'),
        roles: [adminRole._id, userRole._id]
    });

    console.log('Seeded admin user: admin@test.com / Admin@123');
}
