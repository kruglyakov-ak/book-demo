import Component from "@ember/component";
import { inject as service } from "@ember/service";

export default Component.extend({
  currentUser: service(),
  actions: {
    async submitForm(evt) {
      evt.preventDefault();

      this.onsubmit(evt, {
        id: this.get("id"),
        date: this.get("date"),
        reports: this.get("reports"),
        user: this.get("currentUser.user"),
      });
    },

    async deleteReport(report) {
      await report.destroyRecord();
      await this.get("store").unloadRecord(report);
    },
  },

  didReceiveAttrs() {
    this._super(...arguments);
    this.setProperties({
      reports: this.get("meeting.reports"),
      date: this.get("meeting.date"),
    });
  },
});
