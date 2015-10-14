import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'span',

  actions: {
    handleSubmitAction() {
      alert(`this.attrs.getAsdf: ${this.attrs.getAsdf}`);
    }
  }
});
