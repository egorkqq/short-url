"use strict";

/**
 *  shortner controller
 */

const { createCoreController } = require("@strapi/strapi").factories;
module.exports = createCoreController(
  "api::shortner.shortner",
  ({ strapi }) => ({
    async find(ctx) {
      let { query } = ctx;
      let entity;
      const user = ctx.state.user;

      if (user) {
        query = { user: { $eq: user.id } };
        entity = await strapi
          .service("api::shortner.shortner")
          .find({ filters: query });
      } else {
        query = { alias: { $eq: query.alias } };
        entity = await strapi
          .service("api::shortner.shortner")
          .find({ filters: query });
        if (entity.results.length !== 0) {
          let id = entity.results[0].id;
          let vissit = Number(entity.results[0].vissit) + 1;
          await strapi
            .service("api::shortner.shortner")
            .update(id, { data: { vissit } });
        }
      }

      const sanitizedEntity = await this.sanitizeOutput(entity, ctx);
      return this.transformResponse(sanitizedEntity);
    },
    async create(ctx) {
      let entity;

      const data = {
        ...ctx.request.body.data,
        user: ctx.state.user.id,
      };

      entity = await strapi.service("api::shortner.shortner").create({ data });

      const sanitizedEntity = await this.sanitizeOutput(entity, ctx);
      return this.transformResponse(sanitizedEntity);
    },
    async delete(ctx) {
      let entity;
      let { id } = ctx.params;
      const user = ctx.state.user;
      const query = { user: { $eq: user.id }, id: { $eq: id } };

      entity = await strapi
        .service("api::shortner.shortner")
        .find({ filters: query });

      if (entity.results.length === 0) {
        return ctx.badRequest(null, [
          { messages: [{ id: "You can delete someone else content" }] },
        ]);
      }

      entity = await strapi.service("api::shortner.shortner").delete(id);

      const sanitizedEntity = await this.sanitizeOutput(entity, ctx);
      return this.transformResponse(sanitizedEntity);
    },
  })
);
