import fs from "fs/promises";
import path from "path";

export default async function handler(req, res) {
  try {
    const termo = (req.query.q || "").toLowerCase().trim();

    if (!termo) {
      return res.status(200).json([]);
    }

    const filePath = path.join(process.cwd(), "csvjson.json");
    const raw = await fs.readFile(filePath, "utf8");
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
        resultados.push(dados[i]);
        if (resultados.length >= 50) break;
      }
    }

    return res.status(200).json(resultados);

  } catch (erro) {
    console.error(erro);
    return res.status(500).json({ erro: "Erro interno no backend" });
  }
}

