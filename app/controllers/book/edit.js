import Controller from "@ember/controller";
import { inject as service } from "@ember/service";

export default Controller.extend({
  dataService: service("data"),
  actions: {
    async saveBook(evt, book, uploadData) {
      evt.preventDefault();
      let bookModel = this.get("model");

      if (evt.submitter.dataset.name === "save") {
        bookModel.set("title", book.title);
        bookModel.set("authorName", book.authorName);
        bookModel.set("pageCount", book.pageCount);
        bookModel.set("descriptionLink", book.descriptionLink);
        bookModel.set("rate", Math.floor(Math.random() * 5));
        bookModel.set("tags", book.tags);
        bookModel.set("coverURL", book.coverURL);

        const uploadBook = await bookModel.save();
        await this.get("dataService").uploadBookData(uploadBook, uploadData);
      }

      this.transitionToRoute("book.index");
    },
  },
});
