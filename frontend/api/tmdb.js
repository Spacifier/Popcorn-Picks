import axios from "axios";

export default async function handler(req, res) {
  const { path, ...params } = req.query;
  const API_KEY = process.env.TMDB_API_KEY;

  if (!path) {
    return res.status(400).json({ error: "Missing TMDB path" });
  }

  try {
    const response = await axios.get(`https://api.themoviedb.org/3/${path}`, {
      params: {
        ...params,
        api_key: API_KEY,
      },
    });

    res.status(200).json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: "Failed to fetch from TMDB" });
  }
}
