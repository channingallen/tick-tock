import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['entry-form'],

  // Increment this number to reset the values on the child input fields.
  reset: 1,

  tagName: 'div',

  _reset() {
    this.set('unsavedEntryDate', '');
    this.set('unsavedEntryDescription', '');
    this.set('unsavedEntryProject', '');
    this.set('unsavedEntryTime', '');

    this.incrementProperty('reset');
  },

  unsavedEntry: Ember.computed(
    'unsavedEntryDate',
    'unsavedEntryDescription',
    'unsavedEntryProject',
    'unsavedEntryTime',
    function () {
      return {
        date: this.get('unsavedEntryDate'),
        description: this.get('unsavedEntryDescription'),
        project: this.get('unsavedEntryProject'),
        time: this.get('unsavedEntryTime')
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
          !this.get('unsavedEntry.description') ||
          !this.get('unsavedEntry.date')) {
        alert('Fill out all the fields!');
        return;
      }

      if (this.attrs.submit) {
        this.attrs.submit(this.get('unsavedEntry'));
      }

      this._reset();
    },

    updateEntryDate(inputValue) {
      this.set('unsavedEntryDate', inputValue);
    },

    updateEntryDescription(inputValue) {
      this.set('unsavedEntryDescription', inputValue);
    },

    updateEntryTime(inputValue) {
      this.set('unsavedEntryTime', inputValue);
    },

    updateEntryProject(inputValue) {
      this.set('unsavedEntryProject', inputValue);
    }
  }
});
