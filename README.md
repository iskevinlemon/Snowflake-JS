# Snowflake JS
State management library.
<br/>

# At a glance

**Get all data** <br>
```html
<script>
// Get all data as object
var allData = Snowflake.getAll();
</script>
```

**Set data** <br>
```html
<script>
// Set data --> .set(key, value)
Snowflake.set("fruit", "apple"); 
</script>
```

**Update data** <br>
```html
<script>
// Update data --> .update(key, value)
Snowflake.update("fruit", "lemon"); 
</script>
```

**Delete data** <br>
```html
<script>
// Delete data --> .delete(key)
Snowflake.delete("fruit"); 
</script>
```

**Reset all data** <br>
```html
<script>
// Reset data --> .reset()
Snowflake.reset(); 
</script>
```