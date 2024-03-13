"use strict";

module.exports = ({strapi}) => ({
  async find(query) {
    return await strapi.entityService.findMany("plugin::notification.notification", query);
  },

  async delete(id) {
    return await strapi.entityService.delete("plugin::notification.notification", id);
  },

  async create(data) {
    return await strapi.entityService.create("plugin::notification.notification", data);
  },

  async update(id, data) {
    return await strapi.entityService.update("plugin::notification.notification", id, data);
  },
});
