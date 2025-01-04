const axios = require('axios');

text = "I have never watched this film before, and its name always seemed unattractive to me. However, I did change my mind afterward as Citizen Kane impressed me a lot and made me contemplate some things in life. One aspect that was gripping to me was the transition from one scene...";

console.log("ACCESS_TOKEN", process.env['ACCESS_TOKEN']);  
console.log("text: ", text);

async function summarizeText(text) {

   
   let data = JSON.stringify({
     "inputs": text,
     "parameters": {
       "max_length": 100,
       "min_length": 30
     }
   });
   

   let config = {
     method: 'post',
     maxBodyLength: Infinity,
     url: 'https://api-inference.huggingface.co/models/facebook/bart-large-cnn',
     headers: { 
       'Content-Type': 'application/json',
       'Authorization': 'Bearer ' + process.env['ACCESS_TOKEN']
     },
     data : data
   };

 //  async function makeRequest() {
     try {
       const response = await axios.request(config);
       return response.data[0];
     }
     catch (error) {
       console.log(error);
     }


 }

 makeRequest();

 module.exports = summarizeText;
