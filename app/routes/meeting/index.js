import Route from "@ember/routing/route";
import RSVP from "rsvp";

export default Route.extend({
  queryParams: {
    page: {
      refreshModel: true,
    },
    speaker: {
      refreshModel: true,
    },
    book: {
      refreshModel: true,
    },
    date: {
      refreshModel: true,
    },
  },

  model({ book, speaker, date }) {
    const query = {};

    if (book) {
      query.book = book;
    }

    if (speaker) {
      query.speaker = speaker;
    }

    if (date) {
      query.date_like = date;
    }

    return RSVP.hash({
      speakers: this.get("store").findAll("speaker"),
      books: this.get("store").findAll("book"),
      meetings: this.get("store").query("meeting", query),
    });
  },
});
