const fs = require("fs");
const https = require("https");

const API_URL = "https://status.faizo.top/api/quicksupport";

https.get(API_URL, (res) => {
    let data = "";

    res.on("data", (chunk) => {
        data += chunk;
    });

    res.on("end", () => {
        try {
            const jsonData = JSON.parse(data);

            // Transform JSON
            const transformedData = {
                data: jsonData.data.map(bot => ({
                    ...bot,
                    last_updated: String(Math.floor(Number(bot.last_updated) / 1000)),
                    last_uptime: String(Math.floor(Number(bot.last_uptime) / 1000))
                })),
                expired: String(Math.floor(Number(jsonData.expired) / 1000))
            };

            // Save to file (Minified JSON)
            fs.writeFileSync("data.json", JSON.stringify(transformedData));
            console.log("JSON transformation complete!");
        } catch (error) {
            console.error("Error parsing JSON:", error);
        }
    });

}).on("error", (err) => {
    console.error("Error fetching JSON:", err);
});
