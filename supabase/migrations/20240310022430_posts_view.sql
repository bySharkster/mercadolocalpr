create view
  marketplace.posts as
select
  posts.uuid,
  posts.title,
  posts.description,
  posts.price,
  posts.photo_url,
  categories.name as category,
  locations.name as location
from
  marketplace.posts_projection posts
  left join marketplace.categories categories on categories.uuid = posts.category_id
  left join marketplace.locations locations on locations.uuid = posts.location_id
where
  posts.is_moderated = true;