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
  model() {
    return this.get("store").findAll("book");
  },
});
