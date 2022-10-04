import Controller from "@ember/controller";
import { computed } from "@ember/object";

export default Controller.extend({
  queryParams: ["speaker", "book", "search"],
  speaker: "",
  book: "",
  search: "",
  date: "",

  selectedSpeaker: computed("model.speaker", function () {
    const speaker = this.get("speaker");

    return speaker ? this.get("model.speakers").findBy("id", speaker) : null;
  }),

  selectedBook: computed("model.book", function () {
    const book = this.get("book");

    return book ? this.get("model.books").findBy("id", book) : null;
  }),

  hasQuery: computed(function () {
    return !this.get("book") && !this.get("speaker") && !this.get("date");
  }),

  actions: {
    clickOnCreateButton() {
      this.transitionToRoute("meeting.create");
    },

    clickOnEditButton(id) {
      this.transitionToRoute(`/meetings/${id}/edit`);
    },

    changeSpeaker(speaker) {
      this.set("speaker", speaker ? speaker.get("id") : "");
    },

    changeBook(book) {
      this.set("book", book ? book.get("id") : "");
    },

    resetFilters(evt) {
      evt.preventDefault();
      this.set("book", "");
      this.set("speaker", "");
      this.set("date", "");
    },
  },
});
