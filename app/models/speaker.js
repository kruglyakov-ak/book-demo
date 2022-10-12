import DS from "ember-data";
import { computed } from '@ember/object';

export default DS.Model.extend({
  name: DS.attr("string"),
  surname: DS.attr("string"),
  patronymic: DS.attr("string"),

  fullName: computed('surname', 'name', function() {
    return `${this.get('surname')} ${this.get('name')}`;
  }),
  user: DS.belongsTo('user'),
});
