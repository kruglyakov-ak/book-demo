import Route from "@ember/routing/route";

export default Route.extend({
  queryParams: {
    search: {
      refreshModel: true,
    },
    searchByTags: {
      refreshModel: true,
    },
  },
  async model({ search, searchByTags }) {
    const query = {};
    const errorLogger = this.get("errorLogger");

    if (search) {
      query.q = search;
    }

    if (searchByTags) {
      query.tags_like = searchByTags;
    }

    try {
      return this.get("store").query("book", query);
    } catch (error) {
      const err = await errorLogger.createError(error);
      await this.get("store").createRecord("error", err).save();
    }
  },
});
