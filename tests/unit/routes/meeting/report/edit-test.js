import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | meeting/report/edit', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:meeting/report/edit');
    assert.ok(route);
  });
});
