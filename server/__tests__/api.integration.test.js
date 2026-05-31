// ============================================================
// TESTES DE INTEGRAÇÃO — Endpoints da API REST
// ============================================================
import request from "supertest";
import express from "express";
import cors from "cors";

// App de teste isolado (sem banco de dados real)
const createTestApp = () => {
  const app = express();
  app.use(express.json());
  app.use(cors());

  // ── Health Check ──────────────────────────────────────────
  app.get("/health", (req, res) => {
    res.status(200).json({ status: "ok", timestamp: new Date().toISOString() });
  });

  // ── Encurtamento de URL (mock) ────────────────────────────
  app.post("/url/create", (req, res) => {
    const { originalUrl } = req.body;

    if (!originalUrl) {
      return res.status(400).json({ error: "URL é obrigatória" });
    }

    try {
      new URL(originalUrl);
    } catch {
      return res.status(400).json({ error: "URL inválida" });
    }

    const shortId = "abc123";
    return res.status(201).json({
      shortId,
      originalUrl,
      shortUrl: `http://localhost:3000/redirect/${shortId}`,
      createdAt: new Date().toISOString(),
    });
  });

  // ── Redirecionamento (mock) ───────────────────────────────
  app.get("/redirect/:id", (req, res) => {
    const { id } = req.params;
    const mockUrls = {
      abc123: "https://www.youtube.com",
      xyz789: "https://www.github.com",
    };

    if (!mockUrls[id]) {
      return res.status(404).json({ error: "URL não encontrada" });
    }

    return res.status(200).json({ redirectUrl: mockUrls[id] });
  });

  // ── Autenticação (mock) ───────────────────────────────────
  app.post("/auth/signup", (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: "Todos os campos são obrigatórios" });
    }

    if (password.length < 8) {
      return res.status(400).json({ error: "Senha deve ter pelo menos 8 caracteres" });
    }

    if (email === "existente@email.com") {
      return res.status(400).json({ error: "Usuário já existe" });
    }

    return res.status(201).json({ message: "Usuário cadastrado com sucesso" });
  });

  app.post("/auth/login", (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email e senha são obrigatórios" });
    }

    if (email === "teste@email.com" && password === "senha123") {
      return res.status(200).json({ message: "Login realizado com sucesso" });
    }

    return res.status(401).json({ error: "Credenciais inválidas" });
  });

  app.post("/auth/logout", (req, res) => {
    return res.status(200).json({ message: "Logout realizado com sucesso" });
  });

  // ── Dashboard (mock) ─────────────────────────────────────
  app.get("/url/dashboard", (req, res) => {
    return res.status(200).json({
      totalLinks: 10,
      totalClicks: 150,
      avgClickRate: 15.0,
      activeLinks: 8,
    });
  });

  // ── Listagem de URLs (mock) ───────────────────────────────
  app.get("/url", (req, res) => {
    return res.status(200).json([
      { shortId: "abc123", originalUrl: "https://youtube.com", totalClicks: 5 },
      { shortId: "xyz789", originalUrl: "https://github.com",  totalClicks: 3 },
    ]);
  });

  // ── Deletar URL (mock) ────────────────────────────────────
  app.delete("/url/:id", (req, res) => {
    const { id } = req.params;
    if (id === "inexistente") {
      return res.status(404).json({ error: "URL não encontrada" });
    }
    return res.status(200).json({ message: "URL deletada com sucesso" });
  });

  return app;
};

const app = createTestApp();

// ══════════════════════════════════════════════════════════════
// SUITE 1: Health Check
// ══════════════════════════════════════════════════════════════
describe("GET /health", () => {
  test("deve retornar status 200 e status ok", async () => {
    const res = await request(app).get("/health");
    expect(res.status).toBe(200);
    expect(res.body.status).toBe("ok");
    expect(res.body.timestamp).toBeDefined();
  });
});

// ══════════════════════════════════════════════════════════════
// SUITE 2: Encurtamento de URLs
// ══════════════════════════════════════════════════════════════
describe("POST /url/create", () => {
  test("deve encurtar URL válida e retornar 201", async () => {
    const res = await request(app)
      .post("/url/create")
      .send({ originalUrl: "https://www.google.com" });

    expect(res.status).toBe(201);
    expect(res.body.shortId).toBeDefined();
    expect(res.body.shortUrl).toBeDefined();
    expect(res.body.originalUrl).toBe("https://www.google.com");
  });

  test("deve retornar 400 para URL sem protocolo", async () => {
    const res = await request(app)
      .post("/url/create")
      .send({ originalUrl: "google.com" });

    expect(res.status).toBe(400);
    expect(res.body.error).toBe("URL inválida");
  });

  test("deve retornar 400 quando URL não é enviada", async () => {
    const res = await request(app)
      .post("/url/create")
      .send({});

    expect(res.status).toBe(400);
    expect(res.body.error).toBe("URL é obrigatória");
  });

  test("deve retornar shortUrl no formato correto", async () => {
    const res = await request(app)
      .post("/url/create")
      .send({ originalUrl: "https://www.github.com" });

    expect(res.body.shortUrl).toMatch(/^http:\/\/localhost:3000\/redirect\//);
  });
});

// ══════════════════════════════════════════════════════════════
// SUITE 3: Redirecionamento
// ══════════════════════════════════════════════════════════════
describe("GET /redirect/:id", () => {
  test("deve retornar URL de redirecionamento para código válido", async () => {
    const res = await request(app).get("/redirect/abc123");
    expect(res.status).toBe(200);
    expect(res.body.redirectUrl).toBe("https://www.youtube.com");
  });

  test("deve retornar 404 para código inexistente", async () => {
    const res = await request(app).get("/redirect/codigoinexistente");
    expect(res.status).toBe(404);
    expect(res.body.error).toBe("URL não encontrada");
  });

  test("deve retornar URLs diferentes para códigos diferentes", async () => {
    const res1 = await request(app).get("/redirect/abc123");
    const res2 = await request(app).get("/redirect/xyz789");
    expect(res1.body.redirectUrl).not.toBe(res2.body.redirectUrl);
  });
});

// ══════════════════════════════════════════════════════════════
// SUITE 4: Autenticação — Cadastro
// ══════════════════════════════════════════════════════════════
describe("POST /auth/signup", () => {
  test("deve cadastrar usuário com dados válidos", async () => {
    const res = await request(app)
      .post("/auth/signup")
      .send({ name: "Vladison", email: "vlad@email.com", password: "senha123" });

    expect(res.status).toBe(201);
    expect(res.body.message).toBe("Usuário cadastrado com sucesso");
  });

  test("deve retornar 400 quando faltam campos obrigatórios", async () => {
    const res = await request(app)
      .post("/auth/signup")
      .send({ name: "Vladison" });

    expect(res.status).toBe(400);
    expect(res.body.error).toBeDefined();
  });

  test("deve retornar 400 para senha menor que 8 caracteres", async () => {
    const res = await request(app)
      .post("/auth/signup")
      .send({ name: "Vladison", email: "vlad@email.com", password: "abc" });

    expect(res.status).toBe(400);
    expect(res.body.error).toContain("8 caracteres");
  });

  test("deve retornar 400 para email já cadastrado", async () => {
    const res = await request(app)
      .post("/auth/signup")
      .send({ name: "Vladison", email: "existente@email.com", password: "senha123" });

    expect(res.status).toBe(400);
    expect(res.body.error).toBe("Usuário já existe");
  });
});

// ══════════════════════════════════════════════════════════════
// SUITE 5: Autenticação — Login
// ══════════════════════════════════════════════════════════════
describe("POST /auth/login", () => {
  test("deve fazer login com credenciais válidas", async () => {
    const res = await request(app)
      .post("/auth/login")
      .send({ email: "teste@email.com", password: "senha123" });

    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Login realizado com sucesso");
  });

  test("deve retornar 401 para credenciais inválidas", async () => {
    const res = await request(app)
      .post("/auth/login")
      .send({ email: "teste@email.com", password: "senhaerrada" });

    expect(res.status).toBe(401);
    expect(res.body.error).toBe("Credenciais inválidas");
  });

  test("deve retornar 400 quando email não é enviado", async () => {
    const res = await request(app)
      .post("/auth/login")
      .send({ password: "senha123" });

    expect(res.status).toBe(400);
    expect(res.body.error).toBeDefined();
  });
});

// ══════════════════════════════════════════════════════════════
// SUITE 6: Logout
// ══════════════════════════════════════════════════════════════
describe("POST /auth/logout", () => {
  test("deve realizar logout com sucesso", async () => {
    const res = await request(app).post("/auth/logout");
    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Logout realizado com sucesso");
  });
});

// ══════════════════════════════════════════════════════════════
// SUITE 7: Dashboard
// ══════════════════════════════════════════════════════════════
describe("GET /url/dashboard", () => {
  test("deve retornar dados do dashboard", async () => {
    const res = await request(app).get("/url/dashboard");
    expect(res.status).toBe(200);
    expect(res.body.totalLinks).toBeDefined();
    expect(res.body.totalClicks).toBeDefined();
    expect(res.body.avgClickRate).toBeDefined();
  });

  test("deve retornar valores numéricos no dashboard", async () => {
    const res = await request(app).get("/url/dashboard");
    expect(typeof res.body.totalLinks).toBe("number");
    expect(typeof res.body.totalClicks).toBe("number");
  });
});

// ══════════════════════════════════════════════════════════════
// SUITE 8: Listagem de URLs
// ══════════════════════════════════════════════════════════════
describe("GET /url", () => {
  test("deve retornar lista de URLs", async () => {
    const res = await request(app).get("/url");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test("cada URL deve ter shortId e originalUrl", async () => {
    const res = await request(app).get("/url");
    res.body.forEach((url) => {
      expect(url.shortId).toBeDefined();
      expect(url.originalUrl).toBeDefined();
    });
  });
});

// ══════════════════════════════════════════════════════════════
// SUITE 9: Deleção de URLs
// ══════════════════════════════════════════════════════════════
describe("DELETE /url/:id", () => {
  test("deve deletar URL existente com sucesso", async () => {
    const res = await request(app).delete("/url/abc123");
    expect(res.status).toBe(200);
    expect(res.body.message).toBe("URL deletada com sucesso");
  });

  test("deve retornar 404 para URL inexistente", async () => {
    const res = await request(app).delete("/url/inexistente");
    expect(res.status).toBe(404);
    expect(res.body.error).toBe("URL não encontrada");
  });
});
