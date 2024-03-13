const Queue = require('bull');
const sendPush = require("../services/send_push");
const sendSms = require("../services/send_sms");
const sendEmail = require("../services/send_email");

const notificationEmailQueue = new Queue('notification_email_queue', {
  redis: {
    host: '127.0.0.1',
    port: 6379,
  }
});
const notificationSmsQueue = new Queue('notification_sms_queue', {
  redis: {
    host: '127.0.0.1',
    port: 6379,
  }
});
const notificationPushQueue = new Queue('notification_push_queue', {
  redis: {
    host: '127.0.0.1',
    port: 6379,
  }
});

const NOTIFYJOB = 'notifyJob'

const addToQueue = async (jobData) => {
  let data = {
    "id": 1,
    "type": "Push Notification",
    "to": "c3432weqqw",
    "title": "qweqweqwe",
    "message": "qweqweqweqwe",
    "start": "2024-03-13T19:15:00.000Z",
    "end": "2024-03-21T19:15:00.000Z",
    "createdAt": "2024-03-10T19:04:19.431Z",
    "updatedAt": "2024-03-13T02:32:20.426Z",
    "uuid": "qweqweqweqwe",
    "hasEnding": false,
    "repeat": 'None'
  }

  const scheduleDate = new Date(data.start);

  const minute = scheduleDate.getMinutes();
  const hour = scheduleDate.getHours();
  const dayOfMonth = scheduleDate.getDate();
  const month = scheduleDate.getMonth() + 1; // getMonth() returns 0-11
  const dayOfWeek = scheduleDate.getDay(); // getDay() returns 0-6 (0 for Sunday)

  let cronString;
  switch (data.repeat.toLowerCase()) {
    case 'none':
      // Run once at a specific time and date
      cronString = `${minute} ${hour} ${dayOfMonth} ${month} *`;
      break;
    case 'monthly':
      // Run monthly at a specific time
      cronString = `${minute} ${hour} ${dayOfMonth} * *`;
      break;
    case 'weekly':
      // Run weekly at a specific time
      cronString = `${minute} ${hour} * * ${dayOfWeek}`;
      break;
    case 'daily':
      // Run daily at a specific time
      cronString = `${minute} ${hour} * * *`;
      break;
    default:
      throw new Error('Unsupported occurrence type');
  }

  const options = {
    repeat: {
      cron: cronString, // CRON pattern for yearly execution on January 1st
    },
  };

  switch (data.type.toLowerCase()) {
    case 'push notification':
      // Run once at a specific time and date
      notificationPushQueue.add(NOTIFYJOB, jobData, options).then(r => {
        console.log('resp: ', r)
      }).catch(e => {
        console.log('error: ', e)
      });
      break;
    case 'sms':
      // Run monthly at a specific time
      notificationSmsQueue.add(NOTIFYJOB, jobData, options).then(r => {
        console.log('resp: ', r)
      }).catch(e => {
        console.log('error: ', e)
      });;
      break;
    case 'email':
      // Run weekly at a specific time
      notificationEmailQueue.add(NOTIFYJOB, jobData, options).then(r => {
        console.log('resp: ', r)
      }).catch(e => {
        console.log('error: ', e)
      });
      break;
    default:
      throw new Error('Unsupported occurrence type');
  }

}

notificationPushQueue.process(NOTIFYJOB, async (job) => {
  const now = new Date();
  let data = job.data
  const endDate = new Date(data.end);

  if (data.hasEnding && now > endDate) {
    console.log('ending job!!')
    await notificationPushQueue.removeRepeatableByKey(job.opts.repeat.key);
  }

  await sendPush(data);
})

notificationEmailQueue.process(NOTIFYJOB, async (job) => {
  const now = new Date();
  let data = job.data
  const endDate = new Date(data.end);

  if (data.hasEnding && now > endDate) {
    console.log('ending job!!')
    await notificationEmailQueue.removeRepeatableByKey(job.opts.repeat.key);
  }

  await sendEmail(data);
})

notificationSmsQueue.process(NOTIFYJOB, async (job) => {
  const now = new Date();
  let data = job.data
  const endDate = new Date(data.end);

  if (data.hasEnding && now > endDate) {
    console.log('ending job!!')
    await notificationSmsQueue.removeRepeatableByKey(job.opts.repeat.key);
  }

  await sendSms(data);
})
