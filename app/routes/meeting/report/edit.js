import Route from "@ember/routing/route";
import RSVP from "rsvp";

export default Route.extend({
  async model({ id, report_id }) {
    const errorLogger = this.get("errorLogger");
    try {
      const speakers = await this.get("store").findAll("speaker");
      const books = await this.get("store").findAll("book");
      const meeting = await this.get("store").findRecord("meeting", id);
      const report = await this.get("store").findRecord("report", report_id);
      report.set("date", meeting.get("date"));

      return RSVP.hash({
        speakers: speakers,
        books: books,
        meeting: meeting,
        report: report,
      });
    } catch (error) {
      const err = await errorLogger.createError(error);
      await this.get("store").createRecord("error", err).save();
    }
  },
});
