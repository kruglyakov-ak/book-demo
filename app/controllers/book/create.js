import Controller from "@ember/controller";
import { inject as service } from "@ember/service";

export default Controller.extend({
  dataService: service("data"),
  actions: {
    async saveBook(evt, book, uploadData) {
      evt.preventDefault();
      const errorLogger = this.get("errorLogger");

      if (evt.submitter.dataset.name === "save") {
        try {
          const newBook = await this.get("store").createRecord("book", book);
          const uploadBook = await newBook.save();

          await this.get("dataService").uploadBookData(uploadBook, uploadData);
        } catch (error) {
          const err = await errorLogger.createError(error);
          await this.get("store").createRecord("error", err).save();
        }
      }

      this.transitionToRoute("book.index");
    },
  },
});
