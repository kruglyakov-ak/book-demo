import Controller from "@ember/controller";
import { inject as service } from "@ember/service";
import { computed } from "@ember/object";
import ENV from "book-demo/config/environment";

export default Controller.extend({
  session: service(),
  currentUser: service(),
  i18n: service(),

  currentLocale: ENV.i18n.defaultLocale,

  isRussian: computed("currentLocale", function () {
    return this.get("currentLocale") === "ru";
  }),

  isEnglish: computed("currentLocale", function () {
    return this.get("currentLocale") === "en";
  }),

  actions: {
    async logout(e) {
      e.preventDefault();

      this.get("session").invalidate();
    },

    changeLocale(e) {
      this.set('currentLocale', e.target.value);
      this.set('i18n.locale', this.get('currentLocale'));
    }
  },

  init() {
    this._super(...arguments);
    this.set("i18n.locale", this.get("currentLocale"));
  },
});
