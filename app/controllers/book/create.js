import Controller from "@ember/controller";
import { inject as service } from "@ember/service";

export default Controller.extend({
  dataService: service("data"),
  actions: {
    async saveBook(evt, book, uploadData) {
      evt.preventDefault();

      if (evt.submitter.dataset.name === "save") {
        let newBook = await this.get("store").createRecord("book", book);
        const uploadBook = await newBook.save();

        await this.get("dataService").uploadBookData(uploadBook, uploadData);
      }

      this.transitionToRoute("book.index");
    },
  },
});
