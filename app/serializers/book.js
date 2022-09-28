import DS from "ember-data";

export default DS.JSONSerializer.extend({
  normalize(model, hash) {
    hash = this._super(...arguments);
    // let hashCopy = Object.assign({}, hash);
    // hashCopy.attributes = {};
    // hashCopy.attributes.title = hashCopy.title;
    // hashCopy.attributes.authorName = hashCopy.authorName;
    // hashCopy.attributes.pageCount = hashCopy.pageCount;
    // hashCopy.attributes.descriptionLink = hashCopy.descriptionLink;
    // hashCopy.attributes.rate = hashCopy.rate;
    // hashCopy.attributes.tags = hashCopy.tags;
    // hashCopy.attributes.coverURL = hashCopy.coverURL;
    // delete hashCopy.title;
    // delete hashCopy.authorName;
    // delete hashCopy.pageCount;
    // delete hashCopy.descriptionLink;
    // delete hashCopy.rate;
    // delete hashCopy.tags;
    // delete hashCopy.coverURL;
    // hash = {
    //   data: hashCopy,
    // };

    return hash;
  },

  serialize(snapshot) {
    let json = this._super(...arguments);
    json.type = snapshot.modelName;
    return json;
  },
});
