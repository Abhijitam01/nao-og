import 'dotenv/config';

import { eq } from 'drizzle-orm';
import { afterEach, describe, expect, it } from 'vitest';

import { db } from '../src/db/db';
import { NewUser, usersTable } from '../src/db/schema';

describe('usersTable', () => {
	const testUser: NewUser = {
		name: 'John',
		age: 30,
		email: 'john@example.com',
	};

	afterEach(async () => {
		await db.delete(usersTable).where(eq(usersTable.email, testUser.email));
	});

	it('should insert a new user', async () => {
		await db.insert(usersTable).values(testUser);

		const users = await db.select().from(usersTable).where(eq(usersTable.email, testUser.email));

		expect(users).toHaveLength(1);
		expect(users[0].name).toBe('John');
		expect(users[0].age).toBe(30);
		expect(users[0].email).toBe('john@example.com');
	});

	it('should update a user', async () => {
		await db.insert(usersTable).values(testUser);

		await db.update(usersTable).set({ age: 31 }).where(eq(usersTable.email, testUser.email));

		const users = await db.select().from(usersTable).where(eq(usersTable.email, testUser.email));

		expect(users).toHaveLength(1);
		expect(users[0].age).toBe(31);
	});

	it('should delete a user', async () => {
		await db.insert(usersTable).values(testUser);

		await db.delete(usersTable).where(eq(usersTable.email, testUser.email));

		const users = await db.select().from(usersTable).where(eq(usersTable.email, testUser.email));

		expect(users).toHaveLength(0);
	});
});
