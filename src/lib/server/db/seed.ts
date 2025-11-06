import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { user, scan } from './schema';
import { eq } from 'drizzle-orm';

// Create database connection for seeding (can't use SvelteKit's $env)
if (!process.env.DATABASE_URL) throw new Error('DATABASE_URL is not set (in src/lib/server/db/seed.ts)');
const client = postgres(process.env.DATABASE_URL);
const db = drizzle(client);

async function seedUsers() {
	console.log('👤 Seeding users...');

	const users = [
		{
			email: 'thomasdorissen@gmail.com',
			emailVerified: true,
			firstName: 'Thomas',
			lastName: 'Dorissen'
		}
		// Add more users here:
		// {
		//   email: 'jane@example.com',
		//   emailVerified: true,
		//   firstName: 'Jane',
		//   lastName: 'Doe'
		// }
	];

	const createdUsers = [];

	for (const userData of users) {
		const existingUser = await db
			.select()
			.from(user)
			.where(eq(user.email, userData.email))
			.limit(1);

		if (existingUser.length > 0) {
			console.log(`   ℹ️  User ${userData.email} already exists, skipping...`);
			createdUsers.push(existingUser[0]);
			continue;
		}

		const [newUser] = await db.insert(user).values(userData).returning();
		console.log(`   ✅ Created user: ${userData.email} (${userData.firstName} ${userData.lastName})`);
		createdUsers.push(newUser);
	}

	return createdUsers;
}

async function seedScans(users: Array<{ id: number; email: string }>) {
	console.log('📊 Seeding scans...');

	const scans = [
		{
			userId: users[0].id, // Thomas's user ID
			completed: false
		}
		// Add more scans here:
		// {
		//   userId: users[0].id,
		//   completed: true
		// },
		// {
		//   userId: users[1].id, // Second user's scan
		//   completed: false
		// }
	];

	for (const scanData of scans) {
		const [newScan] = await db.insert(scan).values(scanData).returning();
		const userEmail = users.find((u) => u.id === scanData.userId)?.email || 'unknown';
		console.log(
			`   ✅ Created scan ID ${newScan.id} for ${userEmail} (completed: ${scanData.completed})`
		);
	}
}

async function seed() {
	console.log('🌱 Seeding database...\n');

	try {
		const users = await seedUsers();
		await seedScans(users);

		console.log('\n✅ Database seeded successfully!');
	} catch (error) {
		console.error('❌ Seeding failed:', error);
		throw error;
	} finally {
		await client.end();
		process.exit(0);
	}
}

seed();
