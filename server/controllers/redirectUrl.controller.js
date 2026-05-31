import urlData from "../models/urlData.js";
import { getClientIp, getLocationFromIp } from "../utils/geoDetails.js";
import { connectDB } from "../connection.js";
import { Redis } from "@upstash/redis";

const getRedis = () => new Redis({
  url: "https://measured-guppy-133702.upstash.io",
  token: "gQAAAAAAAgpGAAIgcDJiZGIyNmQwNTJiODc0YjAzOGRiYTQ0OTUwZWUxOGUwYg",
});

export const handleGetRedirectUrl = async (req, res) => {
  const { id } = req.params;

  try {
    // 1. Verifica cache Redis primeiro
    const cached = await getRedis().get(`url:${id}`);
    if (cached) {
      console.log(`✅ Cache HIT: ${id}`);
      (async () => {
        try {
          await connectDB();
          const urlDoc = await urlData.findOne({ shortId: id });
          if (urlDoc) {
            const ip = getClientIp(req);
            const userAgent = req.headers["user-agent"];
            const location = await getLocationFromIp(ip);
            urlDoc.clicks.push({ ipAddress: ip, userAgent, location });
            await urlDoc.save();
          }
        } catch (e) {
          console.error("Erro ao registrar clique (cache):", e.message);
        }
      })();
      return res.status(200).json({ redirectUrl: cached });
    }

    // 2. Cache MISS — busca no MongoDB
    console.log(`❌ Cache MISS: ${id} — buscando no banco`);
    await connectDB();
    const RedirectURL = await urlData
      .findOne({ shortId: id })
      .select("originalUrl clicks");

    if (!RedirectURL) return res.status(404).json({ message: "No Short URL" });

    const ip = getClientIp(req);
    const userAgent = req.headers["user-agent"];
    const location = await getLocationFromIp(ip);

    RedirectURL.clicks.push({ ipAddress: ip, userAgent, location });
    await RedirectURL.save();

    // 3. Salva no Redis por 24 horas
    await getRedis().set(`url:${id}`, RedirectURL.originalUrl, { ex: 86400 });
    console.log(`💾 Salvo no cache: ${id}`);

    return res.status(200).json({ redirectUrl: RedirectURL.originalUrl });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};