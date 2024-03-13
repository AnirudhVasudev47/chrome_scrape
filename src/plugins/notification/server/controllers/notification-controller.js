'use strict';

module.exports = ({strapi}) => ({

  index() {
    return 'Welcome to Strapi 🚀';
  },

  async find(ctx) {
    try {
      return await strapi
        .entityService
        .findMany("plugin::notification.notification", ctx.query)
    } catch (err) {
      ctx.throw(500, err);
    }
  },

  async delete(ctx) {
    try {
      return await strapi
        .entityService
        .delete("plugin::notification.notification", ctx.params.id);
    } catch (err) {
      ctx.throw(500, err);
    }
  },

  async create(ctx) {
    try {
      return await strapi
        .entityService
        .create("plugin::notification.notification", ctx.request.body);
    } catch (err) {
      ctx.throw(500, err);
    }
  },

  async update(ctx) {
    try {
      return await strapi
        .entityService
        .update("plugin::notification.notification", ctx.params.id, ctx.request.body);
    } catch (err) {
      ctx.throw(500, err);
    }
  },
});
