import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return this.store.peekAll('project');
  },

  setupController(controller, model) {
    controller.set('projects', model);
  }
});
