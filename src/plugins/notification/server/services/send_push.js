const sendPush = async (jobData) => {
  console.log('Push triggered, data: ',jobData)

  return true;
}

module.exports = {sendPush};
