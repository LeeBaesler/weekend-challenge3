CREATE TABLE tasks(
	"id" SERIAL PRIMARY KEY NOT NULL,
	"creator" VARCHAR (100) NOT NULL,
    "date_created" DATE,
    "task" VARCHAR (300) NOT NULL,
    "completed" BOOLEAN DEFAULT FALSE
);
