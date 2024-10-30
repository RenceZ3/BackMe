require('dotenv').config();
const app = express();
const fetch = require('node-fetch');
const fs = require('fs');
const port = 3000 || process.env.port;
const apiKey = process.env.apiKey;
const url = `https://www.googleapis.com/geolocation/v1/geolocate?key=${apiKey}`;

app.use(cors());
app.use(bodyParser.json({ limit: '1000mb' }));

async function geolocate() {
    const requestBody = {
        homeMobileCountryCode: 310,
        homeMobileNetworkCode: 410,
        radioType: "gsm",
        carrier: "Vodafone",
        considerIp: true
    };

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        console.log(result); 

        fs.writeFileSync('result.txt', JSON.stringify(result, null, 2), 'utf8');
        console.log('Result saved to result.txt');

    } catch (error) {
        console.error('Error:', error);
    }
}

// Call the function
geolocate();


app.listen(port, ()=>{
    console.log('Port listening...', port);
})