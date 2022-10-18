import Controller from "@ember/controller";
import { inject as service } from "@ember/service";

export default Controller.extend({
  dataService: service("data"),
  actions: {
    async saveBook(evt, book, uploadData) {
      evt.preventDefault();
      let bookModel = this.get("model");
      const errorLogger = this.get("errorLogger");

      if (evt.submitter.dataset.name === "save") {
        try {
          bookModel.set("title", book.title);
          bookModel.set("authorName", book.authorName);
          bookModel.set("pageCount", book.pageCount);
          bookModel.set("descriptionLink", book.descriptionLink);
          bookModel.set("rate", Math.floor(Math.random() * 5));
          bookModel.set("tags", book.tags);
          bookModel.set("coverURL", book.coverURL);

          const uploadBook = await bookModel.save();
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
