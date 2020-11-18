const app = require("../app");
const port = process.env.PORT || 3070;

app.listen(port, () => {
  console.log(`E-commerce application is listening at PORT ${port}`);
});