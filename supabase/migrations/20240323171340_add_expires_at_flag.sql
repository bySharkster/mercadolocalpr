drop view if exists "marketplace"."posts";

alter table "marketplace"."posts_projection" add column "expires_at" timestamp without time zone;

alter table "marketplace"."posts_projection" alter column "created_at" set data type timestamp without time zone using "created_at"::timestamp without time zone;

create or replace view "marketplace"."posts" as  SELECT posts.uuid,
    posts.created_at,
    posts.expires_at,
    posts.title,
    posts.description,
    posts.price,
    posts.photo_url,
    posts.is_closed,
    categories.name AS category,
    locations.name AS location
   FROM ((marketplace.posts_projection posts
     LEFT JOIN marketplace.categories categories ON ((categories.uuid = posts.category_id)))
     LEFT JOIN marketplace.locations locations ON ((locations.uuid = posts.location_id)))
  WHERE ((posts.is_moderated = true) AND ((now() >= posts.created_at) AND (now() <= COALESCE(posts.expires_at, '2999-12-31 00:00:00'::timestamp without time zone))));




