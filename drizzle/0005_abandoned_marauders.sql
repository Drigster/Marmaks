ALTER TABLE `certificates` RENAME COLUMN `title` TO `name`;--> statement-breakpoint
ALTER TABLE `certificates` ADD `images` text NOT NULL;--> statement-breakpoint
ALTER TABLE `certificates` DROP COLUMN `alt`;--> statement-breakpoint
ALTER TABLE `certificates` DROP COLUMN `src`;