CREATE TABLE `resumes` (
	`id` integer PRIMARY KEY NOT NULL,
	`data` blob NOT NULL,
	`user_id` integer NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer
);
