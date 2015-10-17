import Ember from 'ember';

export default Ember.Route.extend({

  beforeModel() {
    this.store.createRecord('entry', {id: 1, time: '3:00', project: 'Tick Tock', description: 'Initiated the Tick Tock application'});
    this.store.createRecord('entry', {id: 2, time: '1:00', project: 'Handle', description: 'Helped Courtland with the application'});
    this.store.createRecord('entry', {id: 3, time: '2:45', project: 'Tick Tock', description: 'Implemented time tracking functionality'});
    this.store.createRecord('entry', {id: 4, time: '4:30', project: 'The River Six', description: 'Made progress on the final chapter'});
    this.store.createRecord('project', {id: 1, name: 'Tick Tock', entries: []});
    this.store.createRecord('project', {id: 2, name: 'Handle', entries: []});
    this.store.createRecord('project', {id: 3, name: 'The River Six', entries: []});
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
