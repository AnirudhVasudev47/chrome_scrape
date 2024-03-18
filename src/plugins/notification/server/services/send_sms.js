const sendSms = async (jobData) => {
  console.log('SMS triggered, data: ',jobData)

  return true;
}

module.exports = {sendSms};
