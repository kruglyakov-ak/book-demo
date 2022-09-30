import Controller from "@ember/controller";

export default Controller.extend({
  actions: {
    async saveBook(evt, book) {
      evt.preventDefault();

      if (evt.submitter.dataset.name === "save") {
        let newBook = await this.get("store").createRecord("book", book);
        await newBook.save();
      }

      this.transitionToRoute("book.index");
    },
  },
});
