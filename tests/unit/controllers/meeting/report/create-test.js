import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Controller | meeting/report/create', function(hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  test('it exists', function(assert) {
    let controller = this.owner.lookup('controller:meeting/report/create');
    assert.ok(controller);
  });
});
