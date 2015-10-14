import Ember from 'ember';

export default Ember.Controller.extend({
  unsavedEntryDescription: '',

  unsavedEntryProject: '',

  unsavedEntryTime: '',

  unsavedEntry: Ember.computed(
  'unsavedEntryTime.length',
  'unsavedEntryProject',
  'unsavedEntryDescription',
  function () {
    return {
      time: this.get('unsavedEntryTime'),
      project: this.get('unsavedEntryProject'),
      description: this.get('unsavedEntryDescription')
    };
  }),

  actions: {
    handleSubmitEntry(entry) {
      if (entry.time && entry.project && entry.description ) {
        this.store.createRecord('entry', {
          time: entry.time,
          project: entry.project,
          description: entry.description
        });
      } else {
        alert('Fill out all the fields!');
      }
    }
  }
});
