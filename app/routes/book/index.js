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
  model({search, searchByTags}) {
    const query = {};

    if (search) {
      query.q = search;
    }

    if (searchByTags) {
      query.tags_like = searchByTags;
    }
    return this.get("store").query("book", query);
  },
});
