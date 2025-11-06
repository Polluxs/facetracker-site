import { pgTable, text, timestamp, boolean, bigserial, } from 'drizzle-orm/pg-core';

export const user = pgTable('user', {
	id: bigserial('id', { mode: 'number' }).primaryKey(),
	email: text('email').notNull().unique(),
	emailVerified: boolean('email_verified').default(false),
	// TODO: Make these non-nullable once registration flow is updated
	// For now nullable to test infrastructure
	firstName: text('first_name'),
	lastName: text('last_name'),
	createdAt: timestamp('created_at', { withTimezone: true, mode: 'date' }).notNull().defaultNow(),
	updatedAt: timestamp('updated_at', { withTimezone: true, mode: 'date' }).notNull().defaultNow()
});
