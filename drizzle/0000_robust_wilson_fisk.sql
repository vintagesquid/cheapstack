CREATE TABLE `stack` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text(256)
);
--> statement-breakpoint
CREATE TABLE `technology` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`provider` text(256),
	`has_free_tier` integer,
	`category_id` integer,
	FOREIGN KEY (`category_id`) REFERENCES `technology_category`(`id`) ON UPDATE cascade ON DELETE set null
);
--> statement-breakpoint
CREATE TABLE `technology_category` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text(256)
);
--> statement-breakpoint
CREATE TABLE `technology_stack` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`technology_id` integer,
	`stack_id` integer,
	FOREIGN KEY (`technology_id`) REFERENCES `technology`(`id`) ON UPDATE cascade ON DELETE cascade,
	FOREIGN KEY (`stack_id`) REFERENCES `stack`(`id`) ON UPDATE cascade ON DELETE cascade
);
