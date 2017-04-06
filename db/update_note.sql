update notes
  set note_message = $1,
      photo = $2,
      note_title = $3,
      restaurant_id = COALESCE(@restaurant_id, restaurant_id)
  where note_id = $4;
  

  
  