import Controller from "@ember/controller";
import { computed } from "@ember/object";

export const PER_PAGE = 1;

export default Controller.extend({
  queryParams: ["speaker", "page", "book", "date"],
  speaker: "",
  book: "",
  date: "",
  page: 1,
  speakerValue: "",
  bookValue: "",
  dateValue: "",

  selectedSpeaker: computed("speakerValue", function () {
    const speaker = this.get("speakerValue");

    return speaker ? this.get("model.speakers").findBy("id", speaker) : null;
  }),

  selectedBook: computed("bookValue", function () {
    const book = this.get("bookValue");

    return book ? this.get("model.books").findBy("id", book) : null;
  }),

  pages: computed("model.meetings.meta.total", function () {
    const total = Number(this.get("model.meetings.meta.total"));
    if (Number.isNaN(total) || total <= 0) {
      return [];
    }

    return new Array(Math.ceil(total / PER_PAGE))
      .fill()
      .map((value, index) => index + 1);
  }),

  isNextActive: computed("page", function () {
    return this.get("pages").length !== this.get("page");
  }),

  isPrevActive: computed("page", function () {
    return 1 !== this.get("page");
  }),

  hasQuery: computed("book", "speaker", "date", function () {
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
      this.set("speakerValue", speaker ? speaker.get("id") : "");
    },

    changeBook(book) {
      this.set("bookValue", book ? book.get("id") : "");
    },

    filterReports(evt) {
      evt.preventDefault();

      this.set("book", this.get("bookValue"));
      this.set("speaker", this.get("speakerValue"));
      this.set("date", this.get("dateValue"));
    },

    resetFilters(evt) {
      evt.preventDefault();
      this.set("book", "");
      this.set("speaker", "");
      this.set("date", "");
      this.set("bookValue", "");
      this.set("speakerValue", "");
      this.set("dateValue", "");
    },

    clickNext(evt) {
      evt.preventDefault();
      if (this.get("pages").length !== this.get("page")) {
        this.set("page", this.get("page") + 1);
      }
    },

    clickPrev(evt) {
      evt.preventDefault();
      if (1 !== this.get("page")) {
        this.set("page", this.get("page") - 1);
      }
    },
  },
});
