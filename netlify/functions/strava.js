const CLIENT_ID = "214832";
const CLIENT_SECRET = "9b55521fb90a20d155bad778149fc1a78b62289c";
const REFRESH_TOKEN = "d3753032db12cab19ef713d9bab3c7839520bdee";

exports.handler = async () => {
  try {
    // Renouvelle le token
    const refreshRes = await fetch("https://www.strava.com/oauth/token", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        refresh_token: REFRESH_TOKEN,
        grant_type: "refresh_token"
      })
    });
    const tokens = await refreshRes.json();
    const accessToken = tokens.access_token;

    // Récupère les activités
    const actsRes = await fetch(
      "https://www.strava.com/api/v3/athlete/activities?per_page=20",
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );
    const activities = await actsRes.json();

    return {
      statusCode: 200,
      headers: { "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify(activities)
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    };
  }
};
