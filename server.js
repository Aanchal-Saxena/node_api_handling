const express = require("express");
require('dotenv').config();

const app = express();

app.use(express.json()); // To parse JSON data

app.use("/users", require("./routes/users.route"));

//========== Middleware for invalid routes =================== //
app.use((req, res) => {
  res.status(404).json({ message: "Route not found"})
})

console.log(process.env.PORT)
const PORT = process.env.PORT || 3001; //defining port
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
