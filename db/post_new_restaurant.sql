insert into restaurants values
($1, $2, $3, $4, $5, $6, $7)
on conflict do nothing;

-- values (name, address, slim_address, rating, id, ??, menu_url)