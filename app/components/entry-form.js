import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['entry-form'],

  tagName: 'div',

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
      if (this.get('unsavedEntry.time') &&
          this.get('unsavedEntry.project') &&
          this.get('unsavedEntry.description')) {

        this.attrs.submit(this.get('unsavedEntry'));

        this.set('unsavedEntryTime', '');
        this.set('unsavedEntryProject', '');
        this.set('unsavedEntryDescription', '');
      } else {
        alert('Fill out all the fields!');
      }
    },

    updateTimeValue(translatedTimeValue) {
      this.set('unsavedEntryTime', translatedTimeValue);
    },

    updateProjectValue(projectValue) {
      this.set('unsavedEntryProject', projectValue);
    }
  }
});
