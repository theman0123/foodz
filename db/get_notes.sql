-- change to user_id or facebook_id && restaurant_id
-- or pull all notes from a user_id, store on front-end
-- and handle logic there.
select * from notes where (restaurant_id = $1 and user_id = $2);