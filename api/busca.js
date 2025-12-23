import fs from "fs";
import path from "path";

export default function handler(req, res) {
  try {
    const termo = (req.query.q || "").toLowerCase().trim();

    if (!termo) {
      return res.status(200).json([]);
    }

    const filePath = path.join(process.cwd(), "csvjson.json");
    const raw = fs.readFileSync(filePath, "utf8");
    const json = JSON.parse(raw);

    let dados = [];

    if (Array.isArray(json)) {
      dados = json;
    } else {
      const v = Object.values(json)[0];
      if (Array.isArray(v)) dados = v;
    }

    const resultados = [];

    for (let i = 0; i < dados.length; i++) {
      if (JSON.stringify(dados[i]).toLowerCase().includes(termo)) {
        resultados.pu
