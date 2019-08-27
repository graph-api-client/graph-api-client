const { GraphApiGraphqlClient, graphApiGraphqlSchema } = require('../../src');
console.log(graphApiGraphqlSchema);

const id = '106920977344317';
const token =
  'EAAeZCOc98l00BAAlWn0kBX0cZBAYq1NOVMWBoArWZBAXUZBdi1ma0bZClwiZAtScTXGWJVsdCWfx0ZAm1yeEEwmqsTJ9bXV0RZBHYCEBv6sMz26w1pEO7zxHGUM4DcFklegZBzgQoRbjSavwImfGTBh2jUUKwywcGPqb4hfKmVAcJlUG2EprLgmWmjZAHRye7CZCS2qSILBjZCtD7nrUWYZBqS86W6ZBPTewn9nrUja1mDIInkWVXS1BxSu90CJLcvfETLtZCAZD';
const graphApiClient = new GraphApiGraphqlClient(token, id);
graphApiClient.ig.init('Ecol Influa');

const query = `query hello {
  hello
}`;

// graphApiClient.query(query).then(result => {
//   console.log(result);
// });
