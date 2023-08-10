-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_subtasks" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "task_id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "due_date" DATETIME,
    CONSTRAINT "subtasks_task_id_fkey" FOREIGN KEY ("task_id") REFERENCES "tasks" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_subtasks" ("completed", "due_date", "id", "task_id", "title") SELECT "completed", "due_date", "id", "task_id", "title" FROM "subtasks";
DROP TABLE "subtasks";
ALTER TABLE "new_subtasks" RENAME TO "subtasks";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
