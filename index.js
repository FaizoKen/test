// Original JSON data
const jsonData = {
    "data": [
        {
            "bot_id": "1280984633739186318",
            "shard_id": "0",
            "last_updated": "1739286600881",
            "last_uptime": "1739091735933",
            "cached_guilds": "67",
            "cached_users": "43433",
            "current_latency": "285",
            "is_online": true,
            "is_public": true
        },
        {
            "bot_id": "1154259093989629963",
            "shard_id": "0",
            "last_updated": "1739286600516",
            "last_uptime": "1739092203940",
            "cached_guilds": "1",
            "cached_users": "12",
            "current_latency": "291",
            "is_online": true,
            "is_public": false
        }
    ],
    "expired": "1739287065797"
};

// Function to process JSON
function transformJson(data) {
    return {
        data: data.data.map(bot => ({
            ...bot,
            last_updated: String(Math.floor(Number(bot.last_updated) / 1000)),
            last_uptime: String(Math.floor(Number(bot.last_uptime) / 1000))
        })),
        expired: String(Math.floor(Number(data.expired) / 1000))
    };
}

// Transform JSON
const transformedData = transformJson(jsonData);

// Convert to string format
const jsonString = JSON.stringify(transformedData, null, 4);

// Create Blob and provide a downloadable JSON file
const blob = new Blob([jsonString], { type: "application/json" });
const url = URL.createObjectURL(blob);

// Display link to download JSON
const a = document.createElement("a");
a.href = url;
a.download = "data.json";
a.textContent = "Download JSON File";
document.body.appendChild(a);
