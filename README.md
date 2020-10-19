# node-covid-alert-level
A simple library to determine the alert level and rules for your area


```sh
yarn add @half-shot/covid-alert-level
```

### Example


```js
import UkGovAreaProvider from "../src/providers/UkGov"

const ukProvider = new UkGovAreaProvider();
const result = await ukProvider.getLevelForPostalCode(DOWNING_STREET_POSTCODE);
console.log(result);
// {
//     level: "High",
//     guidanceUrl: "/guidance/local-covid-alert-level-high",
//     areaDescription: "City of Westminster"
// };
```