import { resolve } from 'rsvp';
import Service from '@ember/service';
import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

const templateServiceStub = Service.extend({
  getOneTemplate() {
    return resolve([
      { id: 3, name: 'baz', version: '3.0.0', namespace: 'foo' },
      { id: 2, name: 'baz', version: '2.0.0', namespace: 'foo' },
      { id: 1, name: 'baz', version: '1.0.0', namespace: 'foo' },
      { id: 6, name: 'baz', version: '3.0.0', namespace: 'bar' },
      { id: 5, name: 'baz', version: '2.0.0', namespace: 'bar' },
      { id: 4, name: 'baz', version: '1.0.0', namespace: 'bar' }
    ]);
  },
  getTemplateTags(namespace, name) {
    return resolve([
      { id: 5, name, version: '3.0.0', tag: 'latest' },
      { id: 6, name, version: '3.0.0', tag: 'stable' },
      { id: 7, name, version: '2.0.0', tag: 'meeseeks' }
    ]);
  }
});

module('Unit | Route | templates/detail', function(hooks) {
  setupTest(hooks);

  // Specify the other units that are required for this test.
  // needs: ['controller:foo']
  hooks.beforeEach(function beforeEach() {
    this.owner.register('service:template', templateServiceStub);
  });

  test('it asks for the list of templates for a given name', function(assert) {
    let route = this.owner.lookup('route:templates/detail');

    assert.ok(route);

    return route.model({ namespace: 'foo', name: 'baz' }).then(templates => {
      assert.equal(templates.length, 3);
      assert.equal(templates[0].namespace, 'foo');
      assert.equal(templates[0].name, 'baz');
    });
  });
});
