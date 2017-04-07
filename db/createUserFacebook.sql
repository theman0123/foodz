
insert into users (email, facebook_id) values ($1, $2) returning username, userid;