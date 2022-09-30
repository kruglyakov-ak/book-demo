import Component from "@ember/component";
import { htmlSafe } from "@ember/template";
import { computed } from "@ember/object";
import ENV from "book-demo/config/environment";

export default Component.extend({
  rateWidth: computed("report.rate", function () {
    return htmlSafe(`width: ${this.get("report.rate")}%;`);
  }),
  rootURL: computed(function () {
    return ENV.rootURL;
  }),
});
