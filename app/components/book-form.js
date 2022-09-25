import Component from "@ember/component";

export default Component.extend({
  actions: {
    async submitForm(evt) {
      evt.preventDefault();
      this.onsubmit(evt, {
        id: this.get("id"),
        title: this.get("title"),
        authorName: this.get("authorName"),
        pageCount: this.get("pageCount"),
        descriptionLink: this.get("descriptionLink"),
        rate: Math.floor(Math.random() * 100),
        tags: this.get("tags"),
        coverURL: this.get("coverURL"),
      });
    },

    resetCover() {
      this.set("coverURL", "");
    },

    changeTags(newTags) {
      this.set('tags', [...newTags]);

      // eslint-disable-next-line no-console
      console.log(this.get('tags'));
    },
  },

  didReceiveAttrs() {
    this._super(...arguments);

    this.setProperties({
      id: this.get("book.id"),
      title: this.get("book.title"),
      authorName: this.get("book.authorName"),
      pageCount: this.get("book.pageCount"),
      descriptionLink: this.get("book.descriptionLink"),
      tags: this.get("book.tags"),
      coverURL: this.get("book.coverURL"),
    });
  },
});
