import Component from "@ember/component";
import { htmlSafe } from "@ember/template";
import { computed } from "@ember/object";

export default Component.extend({
  actions: {
    route(tag) {
      this.routeByTag(tag);
    },
  },

  rateWidth: computed(function () {
    return htmlSafe(`width: ${this.get("book.rate") * 20}%;`);
  }),
  rate: computed(function () {
    return htmlSafe(this.get("book.rate") * 20);
  }),
});
