<h1 align=center>
  albertId Library
</h1>

<p align=center>
  This is a private ID generation library for <a href="https://github.com/MoleculeEngineering">MoleculeEngineering</a> and the package details and how we can extend and configure it will be explained below.  
</p>


## What is albertId library?

It is an _albert Id generation library_, which generates sequential id for a category from input. 

## Installation

### Node.js

`lib-albertid` is available on [npm](http://npmjs.org). To install it, type:

    $ npm install --save-dev @moleculeengineering/lib-albertid

## Usage

Import the library in your code, and then pick `generate` to generate token:

### Pre-Native Modules Usage (_as local variables_)

```js
const AlbertId = require("@moleculeengineering/lib-albertid");
let albertId = await AlbertId.generate(tenantId, entity, categoryId)
```

### Related Projects

api-company (https://github.com/MoleculeEngineering/api-company)
api-inventory (https://github.com/MoleculeEngineering/api-inventory)

### Contributors

Geetha Selvaraj