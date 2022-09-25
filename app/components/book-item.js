import Component from "@ember/component";

export default Component.extend({
  actions: {
    route(tag) {
      this.routeByTag(tag);
    },
  },
});
