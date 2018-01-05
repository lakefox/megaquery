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

### Error's
```
curl "http://localhost:8080/database/?key=KEY&value=VALUE"

Outputting
>>> {error: 'file exists, overwrite with &overwrite=true'}
```