import Controller from "@ember/controller";
import { computed } from "@ember/object";
import { inject as service } from "@ember/service";

export const PER_PAGE = 1;

export default Controller.extend({
  session: service(),
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
      this.setProperties({
        book: this.get("bookValue"),
        speaker: this.get("speakerValue"),
        date: this.get("dateValue"),
        page: 1,
      });
    },

    resetFilters(evt) {
      evt.preventDefault();
      this.setProperties({
        book: "",
        speaker: "",
        date: "",
        bookValue: "",
        speakerValue: "",
        dateValue: "",
        page: 1,
      });
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

    async deleteMeeting(meeting) {
      await meeting.destroyRecord();
      await this.get("store").unloadRecord(meeting);
      this.set("page", this.get("page") - 1);
    },
  },
});
