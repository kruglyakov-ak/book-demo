import Component from "@ember/component";
import { inject as service } from '@ember/service';

export default Component.extend({
  moment: service(),
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
      date: this.get('moment').moment(new Date()).format('YYYY-MM-DD'),
      reports: this.get("meeting.reports"),
    });
  },
});
