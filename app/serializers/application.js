import DS from 'ember-data';

export default DS.JSONSerializer.extend({
  extractRelationship(relationshipModelName, relationshipHash) {
    let hash = relationshipHash.id ? relationshipHash.id : relationshipHash;
    return this._super.call(this, relationshipModelName, hash);
  },
});
