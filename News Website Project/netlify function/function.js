const fetch = require("node-fetch");

exports.handler = async function (event, context) {
  const apiKey = "dc77d3eedfc544d7b1ccb73400898fb0"; 
  //const url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=${apiKey}`;
  fetch("/.netlify/functions/function")


  try {
    const response = await fetch(url);
    const data = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to fetch news" }),
    };
  }
};
