ALTER TABLE `technology` RENAME COLUMN "has_free_tier" TO "free_tier";--> statement-breakpoint
ALTER TABLE `technology` ALTER COLUMN "free_tier" TO "free_tier" text;