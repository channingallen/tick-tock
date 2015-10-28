import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('entry-form/nav-buttons', 'Integration | Component | entry form/nav buttons', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(2);

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{entry-form/nav-buttons}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#entry-form/nav-buttons}}
      template block text
    {{/entry-form/nav-buttons}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
