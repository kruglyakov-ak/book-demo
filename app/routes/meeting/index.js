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

  async model({ book, speaker, date, page }) {
    const errorLogger = this.get("errorLogger");
    const query = {
      _page: page,
    };

    if (book) {
      query.book = book;
    }

    if (speaker) {
      query.speaker = speaker;
    }

    if (date) {
      query.date_like = date;
    }

    try {
      return RSVP.hash({
        speakers: this.get("store").findAll("speaker"),
        books: this.get("store").findAll("book"),
        meetings: this.get("store").query("meeting", query),
      });
    } catch (error) {
      const err = await errorLogger.createError(error);
      await this.get("store").createRecord("error", err).save();
    }
  },
});
