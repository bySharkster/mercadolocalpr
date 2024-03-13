alter table "moderation"."reports" drop constraint "reports_pkey";

drop index if exists "moderation"."reports_pkey";

alter table "moderation"."reports" drop column "id";

create unique index reports_pkey ON moderation.reports using btree (uuid);

alter table "moderation"."reports" add constraint "reports_pkey" PRIMARY KEY using index "reports_pkey";