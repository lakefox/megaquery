# MegaQuery
MeagaQuery is a database that is designed to search billions of key's that are similar, like a license plate number or a [GeoKey](https://github.com/lakefox/geokey), and runs on very low end hardware like a laptop.

### Running:

First download this megaquery
```
npm install megaquery
```
then run it in your application 
```
const megaquery = require('megaquery');
megaquery(8080); // Your can use any port you want
```

### Storing a value

```
curl "http://localhost:8080/database/?key=KEY&value=VALUE"

Outputting
>>> {sucess: true}
```
Replace KEY with the key you want to look up the value with, and replace VALUE with the data you want to store.

### Error's
```
curl "http://localhost:8080/database/?key=KEY&value=VALUE"

Outputting
>>> {error: 'file exists, overwrite with &overwrite=true'}
```
This mean's you have already created a file with that key, but you can overwrite that file with the overwrite flag at the end of the url.
```
curl "http://localhost:8080/database/?key=KEY&value=VALUE&overwrite=true"

Outputting
>>> {sucess: true}
```

### Reading a value
```
curl "http://localhost:8080/database/?q=KEY"

Outputting
>>> VALUE
```
Replace KEY with the key you previously used to store the value, VALUE is what ever you stored on the server with the KEY

### Error's
```
curl "http://localhost:8080/database/?q=KEY"

Outputting
>>> {error: 'value doesn't exist'}
```
This means you have store any value with the corresponding key
