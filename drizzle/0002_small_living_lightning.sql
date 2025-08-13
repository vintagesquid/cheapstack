CREATE TABLE `stack_category` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text
);
--> statement-breakpoint
ALTER TABLE `stack` ALTER COLUMN "name" TO "name" text;--> statement-breakpoint
ALTER TABLE `stack` ADD `category_id` integer REFERENCES stack_category(id);--> statement-breakpoint
ALTER TABLE `technology` ALTER COLUMN "provider" TO "provider" text;--> statement-breakpoint
ALTER TABLE `technology_category` ALTER COLUMN "name" TO "name" text;--> statement-breakpoint
PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_technology_stack` (
	`technology_id` integer,
	`stack_id` integer,
	PRIMARY KEY(`stack_id`, `technology_id`),
	FOREIGN KEY (`technology_id`) REFERENCES `technology`(`id`) ON UPDATE cascade ON DELETE cascade,
	FOREIGN KEY (`stack_id`) REFERENCES `stack`(`id`) ON UPDATE cascade ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `__new_technology_stack`("technology_id", "stack_id") SELECT "technology_id", "stack_id" FROM `technology_stack`;--> statement-breakpoint
DROP TABLE `technology_stack`;--> statement-breakpoint
ALTER TABLE `__new_technology_stack` RENAME TO `technology_stack`;--> statement-breakpoint
PRAGMA foreign_keys=ON;