CREATE TABLE `certificates` (
	`id` integer PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`alt` text NOT NULL,
	`src` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `certificates_id_unique` ON `certificates` (`id`);