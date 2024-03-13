alter table "moderation"."reports" alter column "uuid" set not null;

create unique index reports_ukey on moderation.reports using btree (uuid);