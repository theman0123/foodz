INSERT INTO users (username, facebook_id) 
VALUES ($1, $2) 
    ON CONFLICT (facebook_id) 
        DO UPDATE username = $1 
        RETURNING username, user_id;