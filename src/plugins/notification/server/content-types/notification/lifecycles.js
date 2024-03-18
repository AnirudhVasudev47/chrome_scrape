module.exports = {
  beforeCreate(event) {
    const {data, where, select, populate} = event.params;
  },

  afterCreate(event) {
    const {addToQueue} = require("../../queues/queue-service");
    const {result, params} = event;

    console.log('Result: ', result, '\n', 'params: ', params);
    addToQueue(result).then(r => {
      console.log('result: ', result)
    });
  },
};
