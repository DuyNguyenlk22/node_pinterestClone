import express from "express";
import cors from "cors";
import rootRoute from "./routes/rootRoutes.js";

const app = express();

app.use(express.json());
app.use(cors());

// Định hướng vị trí file(đường dẫn)
app.use(express.static("."))
// app.use(express.static("./public/img"))


app.listen(8080);
app.use(rootRoute);
