import Ember from 'ember';

export default Ember.Component.extend({
  expanded: false,

  actions: {
    collapse() {
      this.set('expanded', false);
    },

    expand() {
      this.set('expanded', true);
    }
  }
});
