require('dotenv').config();
const express = require('express');
const app = express();
const port = 3000 || process.env.PORT;
const indexRouter = require('./routes/indexRoute');
const path = require('path');
const categoriesRouter = require('./routes/categoriesRoute');
const newRoute = require('./routes/newRoute');
const detailsRouter = require('./routes/detailsRouter');

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

app.use("/", indexRouter);
app.use("/categories",categoriesRouter);
app.use("/games",detailsRouter)

app.use('/new',newRoute);

app.use("*", (req, res) => {
  res.render("404");
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});