const { app } = require("./app");

const { User } = require("./models/user");
const { Repairs } = require("./models/reapairs");

const { db } = require("./utils/database");

db.authenticate()
  .then(() => console.log("authenticate"))
  .catch((err) => console.log(err));

User.hasMany(Repairs);
Repairs.belongsTo(User);

db.sync({ force: true })
  .then(() => console.log("synced"))
  .catch((err) => console.log(err));

const PORT = process.env.PORT || 4044;

app.listen(PORT, () => console.log("Listen on port: " + PORT));
