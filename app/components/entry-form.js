import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['entry-form'],

  // Increment this number to reset the values on the child input fields.
  reset: 1,

  tagName: 'div',

  _reset() {
    this.set('unsavedEntryTime', '');
    this.set('unsavedEntryProject', '');
    this.set('unsavedEntryDescription', '');

    this.incrementProperty('reset');
  },

  unsavedEntry: Ember.computed(
    'unsavedEntryTime',
    'unsavedEntryProject',
    'unsavedEntryDescription',
    function () {
      return {
        time: this.get('unsavedEntryTime'),
        project: this.get('unsavedEntryProject'),
        description: this.get('unsavedEntryDescription')
      };
    }
  ),

  actions: {
    focusOnDescriptionInput() {
      this.$('.entry-fields__description-input').focus();
    },

    handleSubmitEntry() {
      if (!this.get('unsavedEntry.time') ||
          !this.get('unsavedEntry.project') ||
          !this.get('unsavedEntry.description')) {
        alert('Fill out all the fields!');
        return;
      }

      if (this.attrs.submit) {
        this.attrs.submit(this.get('unsavedEntry'));
      }

      this._reset();
    },

    updateDescriptionValue(inputValue) {
      this.set('unsavedEntryDescription', inputValue);
    },

    updateTimeValue(inputValue) {
      this.set('unsavedEntryTime', inputValue);
    },

    updateProjectValue(inputValue) {
      this.set('unsavedEntryProject', inputValue);
    }
  }
});
