import Component from "@ember/component";
import { computed } from "@ember/object";

export default Component.extend({
  selectedSpeaker: computed("model.report.speaker", function () {
    const speaker = this.get("model.report.speaker");

    return speaker ? this.get("model.speakers").findBy("id", speaker.id) : null;
  }),

  selectedBook: computed("model.report.book", function () {
    const book = this.get("model.report.book");

    return book ? this.get("model.books").findBy("id", book.id) : null;
  }),

  actions: {
    async submitForm(evt) {
      evt.preventDefault();

      this.onsubmit(
        evt,
        {
          meeting: this.get("model.report.meeting"),
          rate: this.get("model.report.rate"),
          URLPresentation: this.get("model.report.URLPresentation"),
          URLVideo: this.get("model.report.URLVideo"),
          book: this.get("model.report.book"),
          speaker: this.get("model.report.speaker"),
          review: this.get("model.report.review"),
        },
        this.get("model.report.meeting.id")
      );
    },
  },
});
