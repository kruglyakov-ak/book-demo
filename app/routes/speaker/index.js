import Route from "@ember/routing/route";

export default Route.extend({
  queryParams: {
    search: {
      refreshModel: true,
    },
  },
  async model() {
    return this.get("store").findAll("speaker");
  },
});
