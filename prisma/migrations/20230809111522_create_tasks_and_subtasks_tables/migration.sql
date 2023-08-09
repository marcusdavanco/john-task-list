-- CreateTable
CREATE TABLE "tasks" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "due_date" DATETIME,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "subtasks" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "task_id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "due_date" DATETIME,
    CONSTRAINT "subtasks_task_id_fkey" FOREIGN KEY ("task_id") REFERENCES "tasks" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
