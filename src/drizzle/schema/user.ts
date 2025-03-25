import {
  integer,
  pgEnum,
  pgTable,
  text,
  uuid,
  timestamp,
} from "drizzle-orm/pg-core";
import { createdAt, id, updatedAt } from "../schemaHelp";
import { CourseSectionTable } from "./courseSection";
import { relations } from "drizzle-orm";
import { LessonTabel } from "./lesson";
import { UserCourseAccessTable } from "./userCourseAccess";

export const userRoles = ["user", "admin"] as const;
export type UserRole = (typeof userRoles)[number];
export const userRoleEnum = pgEnum("lesson_status", userRoles);

export const UserTabel = pgTable("users", {
  id,
  clertUserId: text().notNull().unique(),
  email: text().notNull(),
  name: text().notNull(),
  role: userRoleEnum().notNull().default("user"),
  imageUrl: text(),
  deletedAt: timestamp({ withTimezone: true }),
  createdAt,
  updatedAt,
});

export const LessonRelationships = relations(LessonTabel, ({ one, many }) => ({
  section: one(CourseSectionTable, {
    fields: [LessonTabel.sectionId],
    references: [CourseSectionTable.id],
  }),
}));

export const CourseRelationships = relations(UserTabel, ({ many }) => ({
  userCourseAccesses: many(UserCourseAccessTable),
}));
