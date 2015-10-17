import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['entry-fields__project-input'],

  expanded: false,

  actions: {
    expand() {
      this.set('expanded', true);
    },

    collapse() {
      this.set('expanded', false);
    }
  }
});
