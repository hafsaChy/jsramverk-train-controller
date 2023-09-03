# jsramverk
Repository for jsramverk course (DV1677), maintained by haco22 and glpa22.

## Frontend

### Starting app
```
# To run the app on http://localhost:9000/frontend/:
python3 -m http.server 9000
```

## Backend

### Steps
```
# Check if node and npm are installed
node -v
npm -v
# Install dependencies
npm install 
```

### Starting app
```
# To run the app
node app.js
```

### Security audit
```
# To check vulnerabilities
npm audit
# To fix vulnerabilities
npm audit fix
```
#### Vulnerabilities found in Specifikation
11 vulnerabilities found where severity of 3 are moderate and 8 are high.

Vulnerabilities:

Inefficient Regular Expression Complexity vulnerability
ReDoS
Prototype Pollution

High severity vulnerabillies:

1. debug  <=2.6.8    -Inefficient Regular Expression Complexity vulnerability and ReDoS.
this is fixed by running <i>npm audit fix</i>
2. express  2.5.8 - 4.15.4 || 5.0.0-alpha.1 - 5.0.0-alpha.5    -Depends on vulnerable versions of debug, finalhandler, fresh, qs, send and serve-static.  
3. finalhandler  <=1.0.5   -Depends on vulnerable versions of debug
4. send  <=0.15.6 - Depends on vulnerable versions of debug, fresh, mime and ms.
5. serve-static  1.1.0 - 1.12.5   -Depends on vulnerable versions of send.
6. fresh  <0.5.2    -ReDoS.
7. node-fetch  <2.6.7   -vulnerable to Exposure of Sensitive Information to an Unauthorized Actor .
8. qs  <=6.2.3    -Prototype Pollution Protection Bypass.

Moderate severity vulnerabillies:
1. mime  <1.4.1   -ReDoS.
2. ms  <2.0.0    -Inefficient Regular Expression Complexity vulnerability.
3. semver  6.0.0 - 6.3.0 || 7.0.0 - 7.5.1   -ReDoS.



### Framework
what?
why?


### References

### design

### inspiration

### colors

### fonts
