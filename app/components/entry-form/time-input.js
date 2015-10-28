import Ember from 'ember';

export default Ember.Component.extend({
  inputValue: null,

  _reset: Ember.observer('attrs.reset', function () {
    this.set('inputValue', '');
  }),

  actions: {
    handleKeyUp(inputValue) {
      this.set('inputValue', inputValue);

      if (this.attrs['key-up']) {
        this.attrs['key-up'](inputValue);
      }
    }
  }
});
