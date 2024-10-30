require('dotenv').config();
const fetch = require('node-fetch');
const fs = require('fs');

const apiKey = process.env.apiKey;
const url = `https://www.googleapis.com/geolocation/v1/geolocate?key=${apiKey}`;

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
