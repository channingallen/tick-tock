import Ember from 'ember';

export default Ember.Route.extend({

  beforeModel() {
    this.store.createRecord('entry', { id: 1, time: 'random time', project: 'this project', description: 'that description' });
    this.store.createRecord('entry', { id: 2, time: 'random time', project: 'this project', description: 'that description' });
    this.store.createRecord('entry', { id: 3, time: 'random time', project: 'this project', description: 'that description' });
    this.store.createRecord('entry', { id: 4, time: 'random time', project: 'this project', description: 'that description' });
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
