import { pgTable, uuid, text, varchar , timestamp ,
  pgEnum } from "drizzle-orm/pg-core";


export const userRoleEnum = pgEnum('user_role', ['USER', 'ADMIN']);

export const usersTable = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),

  name: varchar("name", { length: 255 }).notNull(),

  email: varchar("email", { length: 255 }).notNull().unique(),
  role: userRoleEnum().notNull().default('USER'),
  password: text("password").notNull(),

  salt: text("salt").notNull()
});

export const userSessions = pgTable('user_session', {
  id: uuid("id").defaultRandom().primaryKey(),

  userId: uuid("userId")
    .notNull()
    .references(() => usersTable.id),

  createdAt: timestamp("createdAt")
    .defaultNow()
    .notNull()
});