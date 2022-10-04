import Component from "@ember/component";

export default Component.extend({
  actions: {
    async submitForm(evt) {
      evt.preventDefault();

      this.onsubmit(evt, {
        id: this.get("id"),
        date: this.get("date"),
        reports: this.get("reports"),
      });
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
