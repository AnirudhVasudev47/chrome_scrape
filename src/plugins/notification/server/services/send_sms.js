const axios = require("axios");
const sendSms = async (jobData) => {
  // let data = {
  //   "id": 1,
  //   "type": "Push Notification",
  //   "to": "c3432weqqw",
  //   "title": "qweqweqwe",
  //   "message": "qweqweqweqwe",
  //   "start": "2024-03-13T19:15:00.000Z",
  //   "end": "2024-03-21T19:15:00.000Z",
  //   "createdAt": "2024-03-10T19:04:19.431Z",
  //   "updatedAt": "2024-03-13T02:32:20.426Z",
  //   "uuid": "qweqweqweqwe",
  //   "hasEnding": false,
  //   "repeat": 'None'
  // }
  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: `http://enterprise.smsgupshup.com/GatewayAPI/rest?method=sendMessage&send_to=${jobData.to}&msg=${jobData.message}&msg_type=TEXT&userid=2000120010&auth_scheme=plain&password=bgxtmsVfj&v=1.1&format=text`,
  };

  axios.request(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));
    })
    .catch((error) => {
      console.log(error);
    });

  console.log('SMS triggered, data: ', jobData)

  return true;
}

module.exports = {sendSms};
