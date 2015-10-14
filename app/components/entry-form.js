import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['entry-form-container'],

  tagName: 'div',

  actions: {
    handleTimeValue(timeInputValue) {
      this.attrs.addTimeDescription(timeInputValue);
    }
  }
});
