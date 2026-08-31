import { pgTable, serial, text, unique } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"



export const blogs = pgTable("blogs", {
	id: serial().primaryKey().notNull(),
	title: text().notNull(),
	author: text().notNull(),
	url: text().notNull(),
	likes: text().notNull(),
});

export const users = pgTable("users", {
	id: serial().primaryKey().notNull(),
	username: text().notNull(),
	name: text().notNull(),
}, (table) => [
	unique("users_username_unique").on(table.username),
]);
