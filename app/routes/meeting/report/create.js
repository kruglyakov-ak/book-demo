import EmberObject from "@ember/object";
import Route from "@ember/routing/route";
import RSVP from "rsvp";

export default Route.extend({
  async model({ id }) {
    const speakers = await this.get("store").findAll("speaker");
    const books = await this.get("store").findAll("book");
    const meeting = await this.get("store").findRecord("meeting", id);
    const report = EmberObject.create({
      date: meeting.date,
      meeting: meeting,
      rate: "",
      URLPresentation: "",
      URLVideo: "",
      book: null,
      speaker: null,
      review: "",
    });

    return RSVP.hash({
      speakers: speakers,
      books: books,
      meeting: meeting,
      report: report,
    });
  },
});
