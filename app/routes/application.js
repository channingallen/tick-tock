import Ember from 'ember';

export default Ember.Route.extend({

  beforeModel() {
    this.store.createRecord('entry', { id: 1, description: 'eat' });
    this.store.createRecord('entry', { id: 2, description: 'sleep' });
    this.store.createRecord('entry', { id: 3, description: 'fuck', completed: true });
    this.store.createRecord('entry', { id: 4, description: 'code' });
  },

  model() {
    return this.store.filter('entry', function () {
      return true;
    });
  },

  setupController(controller, model) {
    controller.set('entries', model);
  }
});
