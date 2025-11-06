import { pgTable, text, timestamp, boolean, bigserial, bigint, uuid, customType } from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';

// Custom vector type for pgvector extension
const vector = customType<{ data: number[]; config: { dimensions: number } }>({
	dataType(config) {
		return `vector(${config?.dimensions})`;
	}
});

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

export const session = pgTable('session', {
	id: bigserial('id', { mode: 'number' }).primaryKey(),
	userId: bigint('user_id', { mode: 'number' })
		.notNull()
		.references(() => user.id),
	expiresAt: timestamp('expires_at', { withTimezone: true, mode: 'date' }).notNull(),
	token: text('token').unique(),
	ipAddress: text('ip_address'),
	userAgent: text('user_agent'),
	createdAt: timestamp('created_at', { withTimezone: true, mode: 'date' }).notNull().defaultNow(),
	updatedAt: timestamp('updated_at', { withTimezone: true, mode: 'date' }).notNull().defaultNow()
});

export const account = pgTable('account', {
	id: bigserial('id', { mode: 'number' }).primaryKey(),
	userId: bigint('user_id', { mode: 'number' })
		.notNull()
		.references(() => user.id),
	accountId: text('account_id').notNull(),
	providerId: text('provider_id').notNull(),
	accessToken: text('access_token'),
	refreshToken: text('refresh_token'),
	idToken: text('id_token'),
	expiresAt: timestamp('expires_at', { withTimezone: true, mode: 'date' }),
	password: text('password'),
	createdAt: timestamp('created_at', { withTimezone: true, mode: 'date' }).notNull().defaultNow(),
	updatedAt: timestamp('updated_at', { withTimezone: true, mode: 'date' }).notNull().defaultNow()
});

export const verification = pgTable('verification', {
	id: bigserial('id', { mode: 'number' }).primaryKey(),
	identifier: text('identifier').notNull(),
	value: text('value').notNull(),
	expiresAt: timestamp('expires_at', { withTimezone: true, mode: 'date' }).notNull(),
	createdAt: timestamp('created_at', { withTimezone: true, mode: 'date' }).notNull().defaultNow(),
	updatedAt: timestamp('updated_at', { withTimezone: true, mode: 'date' }).notNull().defaultNow()
});


export const scan = pgTable('scan', {
	id: bigserial('id', { mode: 'number' }).primaryKey(),
	userId: bigint('user_id', { mode: 'number' })
		.notNull()
		.references(() => user.id),
	completed: boolean('completed').default(false).notNull(),
	createdAt: timestamp('created_at', { withTimezone: true, mode: 'date' }).notNull().defaultNow(),
	updatedAt: timestamp('updated_at', { withTimezone: true, mode: 'date' }).notNull().defaultNow()
});

export const uniqueImage = pgTable('unique_image', {
	id: bigserial('id', { mode: 'number' }).primaryKey(),
	// Hash of the DINOv2 vector for grouping duplicate/similar images
	dinoV2Hash: text('dino_v2_hash').notNull().unique(),
	createdAt: timestamp('created_at', { withTimezone: true, mode: 'date' }).notNull().defaultNow(),
	updatedAt: timestamp('updated_at', { withTimezone: true, mode: 'date' }).notNull().defaultNow()
});

export const resultImage = pgTable('result_image', {
	id: bigserial('id', { mode: 'number' }).primaryKey(),
	scanId: bigint('scan_id', { mode: 'number' })
		.notNull()
		.references(() => scan.id),
	// Reference to unique image - assigned when vector is extracted
	uniqueImageId: bigint('unique_image_id', { mode: 'number' })
		.notNull()
		.references(() => uniqueImage.id),
	// URL of the detected image
	url: text('url').notNull(),
	// UUID v5 hash of URL for efficient uniqueness checking - auto-generated from url
	// Uses DNS namespace (6ba7b810-9dad-11d1-80b4-00c04fd430c8) as base
	urlHash: uuid('url_hash').generatedAlwaysAs(sql`uuid_generate_v5('6ba7b810-9dad-11d1-80b4-00c04fd430c8'::uuid, url)`).notNull().unique(),
	// DINOv2 vector extraction (768 dimensions) - requires pgvector extension
	dinoV2Vector: vector('dino_v2_vector', { dimensions: 768 }).notNull(),
	createdAt: timestamp('created_at', { withTimezone: true, mode: 'date' }).notNull().defaultNow(),
	updatedAt: timestamp('updated_at', { withTimezone: true, mode: 'date' }).notNull().defaultNow()
});

export type Session = typeof session.$inferSelect;
export type User = typeof user.$inferSelect;
export type Account = typeof account.$inferSelect;
export type Verification = typeof verification.$inferSelect;
export type Scan = typeof scan.$inferSelect;
export type UniqueImage = typeof uniqueImage.$inferSelect;
export type ResultImage = typeof resultImage.$inferSelect;