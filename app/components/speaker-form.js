import Component from "@ember/component";

export default Component.extend({
  actions: {
    async submitForm(evt) {
      evt.preventDefault();

      this.onsubmit(evt, {
        id: this.get("id"),
        name: this.get("name"),
        surname: this.get("surname"),
        patronymic: this.get("patronymic"),
      });
    },
  },

  didReceiveAttrs() {
    this._super(...arguments);

    this.setProperties({
      name: this.get("speaker.name"),
      surname: this.get("speaker.surname"),
      patronymic: this.get("speaker.patronymic"),
      id: this.get("speaker.id"),
    });
  },
});
