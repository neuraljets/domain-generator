# domain-generator

Node.js available domain name generator, written in TypeScript.

## Installation

This package is not yet published to npm. To install it, you can install it directly from GitHub:

```bash
npm install --save neuraljets/domain-generator
```

Or you can clone the repository and install it from the local directory (assumed here to be `../domain-generator`):

```bash
npm install --save ../domain-generator
```

## Usage

```typescript
import { generateDomains } from "domain-generator";

const domains = generateDomains({
  root: "examplebiz",
  numDomains: 30,
});

console.log(domains);

// Output is an array of strings:
// [
//   'getexamplebiz.com',
//   'tryexamplebiz.com',
//    ...and so on
// ]
```
