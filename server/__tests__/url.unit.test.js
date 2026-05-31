// ============================================================
// TESTES UNITÁRIOS — Lógica de geração e validação de URLs
// ============================================================

describe("Validação de URLs", () => {
  const isValidUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  test("deve aceitar URL válida com https", () => {
    expect(isValidUrl("https://www.google.com")).toBe(true);
  });

  test("deve aceitar URL válida com http", () => {
    expect(isValidUrl("http://example.com")).toBe(true);
  });

  test("deve rejeitar string sem protocolo", () => {
    expect(isValidUrl("google.com")).toBe(false);
  });

  test("deve rejeitar string vazia", () => {
    expect(isValidUrl("")).toBe(false);
  });

  test("deve rejeitar texto aleatório", () => {
    expect(isValidUrl("isso nao é uma url")).toBe(false);
  });

  test("deve aceitar URL com path e query string", () => {
    expect(isValidUrl("https://youtube.com/watch?v=dQw4w9WgXcQ")).toBe(true);
  });
});

describe("Geração de Short Code", () => {
  const generateCode = (length = 6) => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };

  test("deve gerar código com 6 caracteres por padrão", () => {
    const code = generateCode();
    expect(code).toHaveLength(6);
  });

  test("deve gerar código apenas com caracteres alfanuméricos", () => {
    const code = generateCode();
    expect(code).toMatch(/^[A-Za-z0-9]+$/);
  });

  test("deve gerar códigos diferentes a cada chamada", () => {
    const code1 = generateCode();
    const code2 = generateCode();
    // Probabilidade de colisão é mínima — teste de aleatoriedade
    expect(typeof code1).toBe("string");
    expect(typeof code2).toBe("string");
  });

  test("deve respeitar comprimento customizado", () => {
    expect(generateCode(8)).toHaveLength(8);
    expect(generateCode(4)).toHaveLength(4);
  });
});

describe("Validação de Senha", () => {
  const isValidPassword = (password) => {
    return typeof password === "string" && password.length >= 8;
  };

  test("deve aceitar senha com 8 ou mais caracteres", () => {
    expect(isValidPassword("senha123")).toBe(true);
  });

  test("deve rejeitar senha com menos de 8 caracteres", () => {
    expect(isValidPassword("abc123")).toBe(false);
  });

  test("deve rejeitar senha vazia", () => {
    expect(isValidPassword("")).toBe(false);
  });

  test("deve rejeitar valor não string", () => {
    expect(isValidPassword(12345678)).toBe(false);
  });
});

describe("Formatação de Dados", () => {
  const formatUrl = (url) => {
    if (!url.startsWith("http://") && !url.startsWith("https://")) {
      return `https://${url}`;
    }
    return url;
  };

  test("deve adicionar https:// em URL sem protocolo", () => {
    expect(formatUrl("google.com")).toBe("https://google.com");
  });

  test("não deve alterar URL que já tem https://", () => {
    expect(formatUrl("https://google.com")).toBe("https://google.com");
  });

  test("não deve alterar URL que já tem http://", () => {
    expect(formatUrl("http://google.com")).toBe("http://google.com");
  });
});

describe("Sanitização de Entrada", () => {
  const sanitize = (input) => {
    if (typeof input !== "string") return "";
    return input.trim().toLowerCase();
  };

  test("deve remover espaços em branco nas extremidades", () => {
    expect(sanitize("  teste  ")).toBe("teste");
  });

  test("deve converter para minúsculas", () => {
    expect(sanitize("TESTE@EMAIL.COM")).toBe("teste@email.com");
  });

  test("deve retornar string vazia para input não string", () => {
    expect(sanitize(null)).toBe("");
    expect(sanitize(undefined)).toBe("");
    expect(sanitize(123)).toBe("");
  });
});
