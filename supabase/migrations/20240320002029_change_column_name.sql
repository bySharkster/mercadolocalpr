alter table "marketplace"."posts_events" drop column "eventType";

alter table "marketplace"."posts_events" drop column "postId";

alter table "marketplace"."posts_events" drop column "postType";

alter table "marketplace"."posts_events" add column "event_type" character varying;

alter table "marketplace"."posts_events" add column "post_id" uuid;

alter table "marketplace"."posts_events" add column "post_type" text not null default 'Generic'::text;



