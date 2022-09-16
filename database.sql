CREATE TABLE tasks(
	"id" SERIAL PRIMARY KEY NOT NULL,
	"author" VARCHAR (100) NOT NULL,
    "created" DATE,
    "task" VARCHAR (300) NOT NULL,
    "completed" BOOLEAN DEFAULT FALSE
);