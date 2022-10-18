import Route from "@ember/routing/route";

export default Route.extend({
  queryParams: {
    search: {
      refreshModel: true,
    },
  },
  async model({ search }) {
    const query = {};

    if (search) {
      query.q = search;
    }

    const errorLogger = this.get("errorLogger");
    try {
      return this.get("store").query("speaker", query);
    } catch (error) {
      const err = await errorLogger.createError(error);
      await this.get("store").createRecord("error", err).save();
    }
  },
});
