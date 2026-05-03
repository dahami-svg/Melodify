import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// --- MOCK DATA ---

const SONGS = [
  { id: '1', title: "Solaris Beats", sub: "Playlist", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBCYA_3Z3_jcOFE7pbu13CIfMgvP_WTJKmxjD2G_vRS9FF8fbwuMVvHNUuEiiw5C5r9h7eAbvRy-skBsMuy0mPoHdQ5DiuUUSOMMeCuVvySqBXuGhJemof1ywBNYSy-mWgqYI-l67fGIHUwej852ZAdAGspG-7W-OreR_3aBVSOdWCKv4MkrujC1TJ5DV_kIJZy6ZEe0JZi6xUkDgRkeL-Mh6oHp-VRorW9-bXvjzE_uA0D0Emeov9KK5BvDj3hzTSz0t-51VgYRQ", audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" },
  { id: '2', title: "Midnight Funk", sub: "Vibe Collective", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBQHvB1XhqED1P4F-6I3CNkEYa2ia2BIBso-A09tldGUZ4wQoWsZO6-j8V7Vlt4V9QXfOYh1RZ3vpgARmDisxZQJ8a3XsRnNpxEZQOaWKjii2Q5EsNbig3SJtR315wqADmvJm0vDkKzo7lnDgAFZ1561JG5od0u_gNzGxNEdNRI_rIlq-0futr4vhb9g5TrMPFSmZT9pAZXYdXeC-EtttJIaXOsWuhVce910aBc8lT_zP27YYCxrP21n9LwteO8_xpltaQ1mX2rFA", audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3" },
  { id: '3', title: "Daily Mix 1", sub: "For You", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDIfyNpdYA-u7VsuPdDtQq64R_LuiyHWlOaARBHfUiGGHavO2LwaIBmUuno_BuQHuKJyKxr5hucy0W1_L9-szqyXp89cuBR99zlVeyAAehkrC_nC27SDc0HDFlD1VDkNTSMGw18AQEJOqyxrdiFzQxyuP_XiZ2QVhu4HgtNAE-jA73mlm8OLWvpZXd3XPQFK9Nwvt5jhN--c1Qd1cOtzaA_ejQ254NHfSq2mBjYM5zLZH5ovB-_lvUfKrxZEj8wTfRuxADohSqnQQ", audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3" },
];

const PLAYLISTS = [
  { id: 'p1', title: "Focus: Deep State", sub: "Lo-fi beats for absolute concentration.", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBEKgwm_tCYO-6mcS1dmQ-wm6R1vnH_fW5PdrF3ZXllc930iV-co3C_VCLDn3CKjWJTasYJ9ICRY03AXUHFnnQvTmtZNMe_WdZMF3xhi3LTvXPPwe0vlA5ei_uXtMOLmcfVoflpe2TsRngTY7qhWNkDUWSBPKB2yVx41NNcxw_DT8kx7pOiheNcvPiv8axljqUSxy4uGtsCsG86Ud7UvrodY0aLYWXBl7U0t4MgjDzZmzd5BNPlwa1Ot_mYPQUysG-y7CHrQBihaA", audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3" },
  { id: 'p2', title: "Organic House", sub: "Earthly rhythms meets electronic soul.", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDkpy96XLKql6Cg9D72kO1vmk6WRrHW-JjP1G_wCyEnjfCSjD7Hay3tXHyPwrrT3D2vwoNpsFkGmWlTiZ3-fhsRT4DHkPMcfcTj39CNUTYRV6a41GDBSLbmQp7RUTdG-8_yNuL9yueH9oQXuh3LAbS4xHeAlZlQmxWttieCn_44sI94eDvNbLycmfbWeMXBHm-2g2yoxBwuIpdN3ro8m5mdBbbyPrukDlqDB_X7lLL9Q_iMpCuBOB0dfpOFlxS74fgD3_blgvnSGA", audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3" },
];

const CHAT_HISTORY = [
  { id: 'm1', sender: 'Leo', content: "This drop is insane! 🎧", time: "2m ago" },
  { id: 'm2', sender: 'You', content: "Right? Adding it to our shared loop!", time: "Now" },
];

// --- ROUTES ---

// Music Data
app.get('/api/music/home', (req, res) => {
  res.json({
    recentlyPlayed: SONGS,
    trendingPlaylists: PLAYLISTS,
    featured: {
        title: "THE VELVET ECLIPSE",
        artist: "Luna Ray",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDW9Ckoxxm6Mhd_gfUOFO64RUcbIO0OqLfoSZEflCn89TPm180iGi-9dsbx6ebV_JI0SQBqPg2avb0w4V-94OdXqXLvZf18qnE3SXpSj6EmhpbtI-xr5l3IOIgxXLewt237gP5zRnOHiBao_4S6AOKo0c8Wh7WXcTKWPtrUD6m0r7hulEhrc29f3NZlGbd0r3kukHTo33kLbV5nCamUj5_Ow9NLu8o2Sr_kC1Vx0kU7to_Hsz5OIFyz1uuMBkbFIMBWW-HxdJa3Rg"
    }
  });
});

// Chat History
app.get('/api/chat/history', (req, res) => {
  res.json(CHAT_HISTORY);
});

// Feedback
app.post('/api/feedback', (req, res) => {
  const { feedback } = req.body;
  console.log('Received feedback:', feedback);
  res.status(201).json({ message: "Feedback received successfully!" });
});

// Login
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  // Simple mock login
  if (email && password) {
    res.json({ token: "mock-jwt-token", user: { name: "Alex", email } });
  } else {
    res.status(400).json({ error: "Email and password are required" });
  }
});

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
