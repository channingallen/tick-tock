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
    this.store.createRecord('tag', {id: 1, name: '#firsttag'});
    this.store.createRecord('tag', {id: 2, name: '#writing'});
    this.store.createRecord('tag', {id: 3, name: '#famous'});
    this.store.createRecord('tag', {id: 4, name: '#hardwork'});
    this.store.createRecord('tag', {id: 5, name: '#coding'});
    this.store.createRecord('tag', {id: 6, name: '#emberJS'});
    this.store.createRecord('tag', {id: 7, name: '#1'});
    this.store.createRecord('tag', {id: 8, name: '#specialchar%'});
    this.store.createRecord('tag', {id: 9, name: '#thisplusthat'});
  },

  model() {
    const entryFilterObject = this.store.filter('entry', function () {
      return true;
    });

    const projectFilterObject = this.store.filter('project', function () {
      return true;
    });

    const tagFilterObject = this.store.filter('tag', function () {
      return true;
    });

    return {
      entryFilterObject: entryFilterObject,
      projectFilterObject: projectFilterObject,
      tagFilterObject: tagFilterObject
    };
  },

  setupController(controller, model) {
    controller.set('entries', model.entryFilterObject);
    controller.set('projects', model.projectFilterObject);
    controller.set('tags', model.tagFilterObject);
  }
});
