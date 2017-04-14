insert into restaurants (name, address, slim_address, rating, id, cuisine_type, menu_url, user_id) values
($1, $2, $3, $4, $5, $6, $7, $8)
 on conflict do nothing returning user_id;

-- values (name, address, slim_address, rating, id, cuisine-type, menu_url, "facebook_id")