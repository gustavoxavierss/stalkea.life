export default async function handler(req, res) {
    const { username } = req.query;
    const RAPID_API_KEY = process.env.RAPID_API_KEY;

    if (!username) return res.status(400).json({ error: "Username missing" });

    const url = `https://instagram-data12.p.rapidapi.com/user/details-by-username/?username=${username}`;
    
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': RAPID_API_KEY,
                'X-RapidAPI-Host': 'instagram-data12.p.rapidapi.com'
            }
        });

        const data = await response.json();

        res.status(200).json({
            username: data.username,
            posts_count: data.edge_owner_to_timeline_media?.count || 0,
            followers_count: data.edge_followed_by?.count || 0,
            following_count: data.edge_follow?.count || 0,
            profile_pic_url: data.profile_pic_url_hd
        });
    } catch (error) {
        res.status(500).json({ error: "API Error" });
    }
}