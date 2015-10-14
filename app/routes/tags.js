import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return this.store.peekAll('entry');
  },

  setupController(controller, model) {
    controller.set('entries', model);
  }
});
