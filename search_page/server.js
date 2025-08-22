const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5001;

app.use("/api/search", require("./routes/searchRoutes"));

app.listen(PORT, () => {
  console.log(`Servidor Funcionando na porta ${PORT}`);
});
