'use strict';

const {beforeCreate, afterCreate} = require("./content-types/notification/lifecycles");
module.exports = ({strapi}) => {
  // bootstrap phase
  strapi.db.lifecycles.subscribe((event) => {
    if (event.action === 'beforeCreate') {
      beforeCreate(event)
    }
    if (event.action === 'afterCreate') {
      afterCreate(event)
    }

    if (strapi.isLoaded) {

    }
  });
};
