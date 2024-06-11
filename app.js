require("dotenv").config();
const express = require("express");
const app = express();

const connection = require("./config/connection");
const noticeboardroutes = require("./routes/noticeboard");
const eventroutes = require("./routes/event");
const helpdeskroutes = require("./routes/helpdesk");
const contactroutes = require("./routes/contact");
const userroutes = require("./routes/user");

//app settings
app.use(express.json());

//routes
app.use("/notice", noticeboardroutes);
app.use("/event", eventroutes);
app.use("/category", helpdeskroutes);
app.use("/contact", contactroutes);
app.use("/user", userroutes);

connection().then(() => console.log("DB CONNECTED"));
app.listen(process.env.PORT, () => { console.log("PORT CONNECTED"); });

