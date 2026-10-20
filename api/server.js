import "dotenv/config";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import { randomUUID } from "node:crypto";
import { pool } from "./db.js";

const app = express();
const port = Number(process.env.PORT || 3000);
const allowedOrigins = (process.env.FRONTEND_ORIGIN || "https://leorbr27.github.io")
  .split(",").map((origin) => origin.trim()).filter(Boolean);

app.disable("x-powered-by");
app.use(helmet());
app.use(cors({
  origin(origin, callback) {
    if (!origin || allowedOrigins.includes(origin) ||
        /^http:\/\/localhost:\d+$/.test(origin) ||
        /^http:\/\/127\.0\.0\.1:\d+$/.test(origin)) return callback(null, true);
    return callback(new Error("Origem não autorizada pelo CORS."));
  },
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));
app.use(express.json({ limit: "1mb" }));

const localToDb = {
  CONDOMINIO: "CONDOMINIO_RESIDENCIAL",
  CONDOMINIO_RESIDENCIAL: "CONDOMINIO_RESIDENCIAL",
  EMPRESA: "EMPRESA_ESCRITORIO",
  EMPRESA_ESCRITORIO: "EMPRESA_ESCRITORIO",
  ACADEMIA: "ACADEMIA",
  HOSPITAL: "HOSPITAL",
  COMERCIO: "COMERCIO",
  OUTROS: "OUTROS"
};
const localFromDb = {
  CONDOMINIO_RESIDENCIAL: "CONDOMINIO",
  EMPRESA_ESCRITORIO: "EMPRESA",
  ACADEMIA: "ACADEMIA",
  HOSPITAL: "HOSPITAL",
  COMERCIO: "COMERCIO",
  OUTROS: "OUTROS"
};
const offerToDb = {
  MINI: "MINI_MERCADO_AUTONOMO",
  MINI_MERCADO_AUTONOMO: "MINI_MERCADO_AUTONOMO",
  VENDING: "VENDING_MACHINE",
  VENDING_MACHINE: "VENDING_MACHINE",
  AMBOS: "AMBOS"
};
const offerFromDb = {
  MINI_MERCADO_AUTONOMO: "MINI",
  VENDING_MACHINE: "VENDING",
  AMBOS: "AMBOS"
};
const validStatuses = new Set(["PENDENTE", "EM_NEGOCIACAO", "REJEITADO", "CONTRATO_FECHADO"]);
const validChannels = new Set(["presencial", "ligacao", "whatsapp", "email", "linkedin", "outro"]);
const validInterests = new Set(["nao_avaliado", "nenhum", "baixo", "medio", "alto", "muito_alto"]);
const validOutcomes = new Set(["tentativa_contato", "contato_realizado", "aguardando_retorno", "reuniao_agendada", "proposta_solicitada", "proposta_enviada", "negociacao", "recusado", "convertido", "outro"]);
const nullableText = (value) => value == null || value === "" ? null : String(value).trim();
const dateOrNull = (value) => value == null || value === "" ? null : new Date(value);
const mapProspect = (row) => ({
  id: row.id,
  company: row.companyName,
  contact: row.contactName || "",
  phone: row.phone || "",
  email: row.email || "",
  local: localFromDb[row.localType] || "OUTROS",
  offer: offerFromDb[row.offerType] || "AMBOS",
  status: row.status,
  date: row.contactedAt ? new Date(row.contactedAt).toISOString().slice(0, 10) : "",
  notes: row.notes || "",
  address: row.address || "",
  source: row.source || "",
  responsible: row.responsible || "",
  createdAt: row.createdAt,
  updatedAt: row.updatedAt
});
const mapConversation = (row) => ({
  id: row.id,
  prospectionId: row.prospectionId,
  occurredAt: row.occurredAt,
  location: row.location || "",
  personName: row.personName || "",
  jobTitle: row.jobTitle || "",
  phone: row.phone || "",
  email: row.email || "",
  channel: row.channel,
  summary: row.summary || "",
  interestLevel: row.interestLevel,
  objections: row.objections || "",
  nextStep: row.nextStep || "",
  nextContactAt: row.nextContactAt,
  outcome: row.outcome,
  isConfirmedRejection: row.isConfirmedRejection,
  responsibleUserId: row.responsibleUserId || "",
  notes: row.notes || "",
  createdAt: row.createdAt,
  updatedAt: row.updatedAt
});

app.get("/health", async (_req, res) => {
  try {
    await pool.query("SELECT 1");
    res.json({ status: "ok", database: "connected" });
  } catch (error) {
    console.error("Health check failed:", error.message);
    res.status(503).json({ status: "error", database: "unavailable" });
  }
});

app.get("/prospects", async (_req, res, next) => {
  try {
    const { rows } = await pool.query(
      'SELECT * FROM public."Prospect" ORDER BY "contactedAt" DESC, "createdAt" DESC'
    );
    res.json(rows.map(mapProspect));
  } catch (error) { next(error); }
});

app.post("/prospects", async (req, res, next) => {
  try {
    const b = req.body || {};
    if (!String(b.company || b.companyName || "").trim()) {
      return res.status(400).json({ error: "O nome da empresa é obrigatório." });
    }
    const localType = localToDb[b.local || b.localType];
    const offerType = offerToDb[b.offer || b.offerType];
    const status = b.status || "PENDENTE";
    if (!localType || !offerType || !validStatuses.has(status)) {
      return res.status(400).json({ error: "Tipo de local, oferta ou status inválido." });
    }
    const id = String(b.id || randomUUID());
    const now = new Date();
    const { rows } = await pool.query(
      `INSERT INTO public."Prospect"
       (id, "companyName", "contactName", phone, email, "localType", "offerType", status, notes,
        address, source, responsible, "contactedAt", "createdAt", "updatedAt")
       VALUES ($1,$2,$3,$4,$5,$6::"LocalType",$7::"OfferType",$8::"ProspectStatus",$9,$10,$11,$12,$13,$14,$14)
       ON CONFLICT (id) DO UPDATE SET
        "companyName"=EXCLUDED."companyName", "contactName"=EXCLUDED."contactName",
        phone=EXCLUDED.phone, email=EXCLUDED.email, "localType"=EXCLUDED."localType",
        "offerType"=EXCLUDED."offerType", status=EXCLUDED.status, notes=EXCLUDED.notes,
        address=EXCLUDED.address, source=EXCLUDED.source, responsible=EXCLUDED.responsible,
        "contactedAt"=EXCLUDED."contactedAt", "updatedAt"=EXCLUDED."updatedAt"
       RETURNING *`,
      [id, String(b.company || b.companyName).trim(), nullableText(b.contact || b.contactName),
       nullableText(b.phone), nullableText(b.email), localType, offerType, status, nullableText(b.notes),
       nullableText(b.address), nullableText(b.source), nullableText(b.responsible),
       dateOrNull(b.date || b.contactedAt) || now, b.createdAt ? new Date(b.createdAt) : now]
    );
    res.status(201).json(mapProspect(rows[0]));
  } catch (error) { next(error); }
});

app.put("/prospects/:id", async (req, res, next) => {
  try {
    const b = req.body || {};
    if (!String(b.company || b.companyName || "").trim()) {
      return res.status(400).json({ error: "O nome da empresa é obrigatório." });
    }
    const localType = localToDb[b.local || b.localType];
    const offerType = offerToDb[b.offer || b.offerType];
    const status = b.status || "PENDENTE";
    if (!localType || !offerType || !validStatuses.has(status)) {
      return res.status(400).json({ error: "Tipo de local, oferta ou status inválido." });
    }
    const { rows } = await pool.query(
      `UPDATE public."Prospect" SET "companyName"=$2, "contactName"=$3, phone=$4, email=$5,
       "localType"=$6::"LocalType", "offerType"=$7::"OfferType", status=$8::"ProspectStatus",
       notes=$9, address=$10, source=$11, responsible=$12, "contactedAt"=$13, "updatedAt"=now()
       WHERE id=$1 RETURNING *`,
      [req.params.id, String(b.company || b.companyName).trim(), nullableText(b.contact || b.contactName),
       nullableText(b.phone), nullableText(b.email), localType, offerType, status, nullableText(b.notes),
       nullableText(b.address), nullableText(b.source), nullableText(b.responsible),
       dateOrNull(b.date || b.contactedAt) || new Date()]
    );
    if (!rows[0]) return res.status(404).json({ error: "Prospecção não encontrada." });
    res.json(mapProspect(rows[0]));
  } catch (error) { next(error); }
});

app.patch("/prospects/:id/status", async (req, res, next) => {
  try {
    const status = req.body?.status;
    if (!validStatuses.has(status)) return res.status(400).json({ error: "Status inválido." });
    const { rows } = await pool.query(
      'UPDATE public."Prospect" SET status=$2::"ProspectStatus", "updatedAt"=now() WHERE id=$1 RETURNING *',
      [req.params.id, status]
    );
    if (!rows[0]) return res.status(404).json({ error: "Prospecção não encontrada." });
    res.json(mapProspect(rows[0]));
  } catch (error) { next(error); }
});

app.delete("/prospects/:id", async (req, res, next) => {
  try {
    const { rowCount } = await pool.query('DELETE FROM public."Prospect" WHERE id=$1', [req.params.id]);
    if (!rowCount) return res.status(404).json({ error: "Prospecção não encontrada." });
    res.status(204).end();
  } catch (error) { next(error); }
});

app.get("/conversations", async (req, res, next) => {
  try {
    const prospectId = req.query.prospectId;
    const { rows } = prospectId
      ? await pool.query('SELECT * FROM public."Conversation" WHERE "prospectionId"=$1 ORDER BY "occurredAt" DESC', [String(prospectId)])
      : await pool.query('SELECT * FROM public."Conversation" ORDER BY "occurredAt" DESC LIMIT 5000');
    res.json(rows.map(mapConversation));
  } catch (error) { next(error); }
});

function validateConversation(b) {
  if (!b.prospectionId) return "A empresa da conversa é obrigatória.";
  if (!validChannels.has(b.channel || "presencial")) return "Canal inválido.";
  if (!validInterests.has(b.interestLevel || "nao_avaliado")) return "Nível de interesse inválido.";
  if (!validOutcomes.has(b.outcome || "contato_realizado")) return "Resultado inválido.";
  if (b.isConfirmedRejection && (b.outcome || "contato_realizado") !== "recusado") {
    return "Uma rejeição confirmada precisa ter resultado 'recusado'.";
  }
  return null;
}

async function writeConversation(req, res, next, update) {
  try {
    const b = req.body || {};
    const validationError = validateConversation(b);
    if (validationError) return res.status(400).json({ error: validationError });
    const id = String(update ? req.params.id : (b.id || randomUUID()));
    const values = [id, String(b.prospectionId), dateOrNull(b.occurredAt) || new Date(),
      nullableText(b.location), nullableText(b.personName), nullableText(b.jobTitle),
      nullableText(b.phone), nullableText(b.email), b.channel || "presencial",
      nullableText(b.summary), b.interestLevel || "nao_avaliado", nullableText(b.objections),
      nullableText(b.nextStep), dateOrNull(b.nextContactAt), b.outcome || "contato_realizado",
      Boolean(b.isConfirmedRejection), nullableText(b.responsibleUserId), nullableText(b.notes)];
    const sql = update
      ? `UPDATE public."Conversation" SET "prospectionId"=$2, "occurredAt"=$3, location=$4,
          "personName"=$5, "jobTitle"=$6, phone=$7, email=$8, channel=$9, summary=$10,
          "interestLevel"=$11, objections=$12, "nextStep"=$13, "nextContactAt"=$14,
          outcome=$15, "isConfirmedRejection"=$16, "responsibleUserId"=$17, notes=$18,
          "updatedAt"=now() WHERE id=$1 RETURNING *`
      : `INSERT INTO public."Conversation"
          (id, "prospectionId", "occurredAt", location, "personName", "jobTitle", phone, email,
           channel, summary, "interestLevel", objections, "nextStep", "nextContactAt", outcome,
           "isConfirmedRejection", "responsibleUserId", notes)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18)
         ON CONFLICT (id) DO UPDATE SET "prospectionId"=EXCLUDED."prospectionId",
           "occurredAt"=EXCLUDED."occurredAt", location=EXCLUDED.location,
           "personName"=EXCLUDED."personName", "jobTitle"=EXCLUDED."jobTitle",
           phone=EXCLUDED.phone, email=EXCLUDED.email, channel=EXCLUDED.channel,
           summary=EXCLUDED.summary, "interestLevel"=EXCLUDED."interestLevel",
           objections=EXCLUDED.objections, "nextStep"=EXCLUDED."nextStep",
           "nextContactAt"=EXCLUDED."nextContactAt", outcome=EXCLUDED.outcome,
           "isConfirmedRejection"=EXCLUDED."isConfirmedRejection",
           "responsibleUserId"=EXCLUDED."responsibleUserId", notes=EXCLUDED.notes,
           "updatedAt"=now() RETURNING *`;
    const { rows } = await pool.query(sql, values);
    if (update && !rows[0]) return res.status(404).json({ error: "Conversa não encontrada." });
    res.status(update ? 200 : 201).json(mapConversation(rows[0]));
  } catch (error) { next(error); }
}
app.post("/conversations", (req, res, next) => writeConversation(req, res, next, false));
app.put("/conversations/:id", (req, res, next) => writeConversation(req, res, next, true));
app.delete("/conversations/:id", async (req, res, next) => {
  try {
    const { rowCount } = await pool.query('DELETE FROM public."Conversation" WHERE id=$1', [req.params.id]);
    if (!rowCount) return res.status(404).json({ error: "Conversa não encontrada." });
    res.status(204).end();
  } catch (error) { next(error); }
});

app.use((req, res) => res.status(404).json({ error: "Endpoint não encontrado." }));
app.use((error, _req, res, _next) => {
  if (error.message?.includes("Origem não autorizada")) return res.status(403).json({ error: error.message });
  console.error("Erro na API:", error.message);
  if (error.code === "23503") return res.status(400).json({ error: "A empresa vinculada não existe." });
  if (error.code === "23514" || error.code === "22P02") return res.status(400).json({ error: "Dados inválidos para o banco." });
  res.status(500).json({ error: "Erro interno da API." });
});

export default app;

// A Vercel importa o app como Serverless Function; localmente o processo escuta a porta.
if (!process.env.VERCEL) {
  const server = app.listen(port, () => console.log(`API 100 Rejeições disponível na porta ${port}`));
  async function shutdown() {
    server.close(async () => { await pool.end(); process.exit(0); });
  }
  process.on("SIGTERM", shutdown);
  process.on("SIGINT", shutdown);
}
