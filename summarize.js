const axios = require('axios');
require('dotenv').config();

// text = "I have never watched this film before, and its name always seemed unattractive to me. However, I did change my mind afterward as Citizen Kane impressed me a lot and made me contemplate some things in life. One aspect that was gripping to me was the transition from one scene...";
// text = "Cultural diversity in the workplace enriches organizations by bringing multiple perspectives into the professional environment, fostering innovation, creativity, and decision-making that reflects global consumer markets. Teams that embrace diversity can outperform their peers by exploiting a broader range of experiences and insights, which is particularly advantageous in problem-solving situations. Moreover, culturally diverse teams are better equipped to enter new markets and connect with a varied customer base, understanding and integrating different consumer needs and cultural preferences into their strategies and offerings. However, leveraging the full potential of a diverse workforce entails overcoming inherent challenges such as communication barriers, cultural misunderstandings, and potential conflicts. Leadership plays a crucial role in this context by promoting an inclusive culture through proactive diversity policies, regular training, and team-building exercises that emphasize mutual respect and appreciation of different viewpoints. Additionally, these measures help in reducing workplace discrimination and enhancing employee engagement and satisfaction. When managed effectively, cultural diversity becomes a key driver of internal innovation and market expansion, providing companies with a competitive edge and a robust platform for sustainable growth."
// console.log("ACCESS_TOKEN", process.env['ACCESS_TOKEN']);  
// console.log("text: ", text);

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

   try {
     const response = await axios.request(config);
     return response.data[0];
   }
   catch (error) {
     console.log(error);
   }
}

// Call the summarizeText function
// summarizeText(text).then(result => console.log(result));

module.exports = summarizeText;