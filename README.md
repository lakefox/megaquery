# MegaQuery
MeagaQuery is a database that is designed to search billions of key's that are similar, like a license plate number or a [GeoKey](https://github.com/lakefox/goekey), and runs on very low end hardware like a laptop.

### Running:

First download this repository then
```
>>> cd megaquery
>>> node app.js
Running on http://localhost:8080
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