import Component from "@ember/component";
import { inject as service } from "@ember/service";

export default Component.extend({
  currentUser: service(),
  actions: {
    submitForm(evt) {
      evt.preventDefault();

      this.onsubmit(evt, {
        id: this.get("id"),
        date: this.get("date"),
        reports: this.get("reports"),
        user: this.get("currentUser.user"),
      });
    },

    async deleteReport(report) {
      const errorLogger = this.get("errorLogger");

      try {
        await report.destroyRecord();
        await this.get("store").unloadRecord(report);
      } catch (error) {
        const err = await errorLogger.createError(error);
        await this.get("store").createRecord("error", err).save();
      }
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
