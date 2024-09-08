import { pgTable, uuid, text, timestamp } from 'drizzle-orm/pg-core';

export const conversations = pgTable('conversations', {
  id: uuid('id').defaultRandom().primaryKey(),
  sessionId: uuid('session_id').notNull().unique(),
  title: text('title').notNull(),
  lastMessageDate: timestamp('last_message_date').defaultNow().notNull(),
  userId: uuid('user_id').notNull()
});

export const messages = pgTable('messages', {
  id: uuid('id').defaultRandom().primaryKey(),
  conversationId: uuid('conversation_id').references(() => conversations.sessionId),
  sender: text('sender').notNull(),
  content: text('content').notNull(),
  timestamp: timestamp('timestamp').defaultNow().notNull()
});