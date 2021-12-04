require("./db").connectDb();

const app = require("express")();

require("./config").config(app);
// require("./config/session.config").sessionInit(app);

// app.use((req, res, next) => {
//   console.log("session", req.session);
//   next();
// });

// const indexRoutes = require("./routes");
// app.use("/", indexRoutes);

// const authRoutes = require("./routes/auth.routes");
// app.use("/", authRoutes);


module.exports = app;
