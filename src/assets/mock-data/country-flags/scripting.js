// Script to get flags from the API and save them to the assets folder to improve performance

const allCountries = require("../mockPastTrips.json");
const fromTheOtherFileCountries = require("../mockCountryDetails.json");

const axios = require("axios");
const fs = require("fs");

async function downloadFlag(flagUrl, countryName) {
  try {
    const response = await axios.get(flagUrl, { responseType: "arraybuffer" });
    const flagData = Buffer.from(response.data, "binary");
    countryName = countryName.replaceAll(" ", "_");
    fs.writeFileSync(countryName + "_flag.png", flagData);
    console.log("Flag downloaded successfully!");
  } catch (error) {
    console.error("Error downloading flag:", error.message);
  }
}

let allCountriesFlagsMemory = [];

for (let i = 0; i < allCountries.length; i++) {
  const country = allCountries[i];
  if (allCountriesFlagsMemory.includes(country.country)) {
    console.log(`Flag ${country.country} already downloaded!`);
    continue;
  }
  allCountriesFlagsMemory.push(country.flagUrl);
  const flagApiUrl = country.flagUrl;
  downloadFlag(flagApiUrl, country.country);
  console.log(`Flag ${country.country} downloaded successfully!`);
}

for (let j = 0; j < fromTheOtherFileCountries.length; j++) {
  const country = fromTheOtherFileCountries[j];
  if (allCountriesFlagsMemory.includes(country.name)) {
    console.log(`Flag ${country.name} already downloaded!`);
    continue;
  }
  allCountriesFlagsMemory.push(country.flag);
  const flagApiUrl = country.flag;
  downloadFlag(flagApiUrl, country.name);
  console.log(`Flag ${country.name} downloaded successfully!`);
}
