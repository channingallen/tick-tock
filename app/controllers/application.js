import Ember from 'ember';

export default Ember.Controller.extend({
  unsavedEntryDescription: '',

  unsavedEntryProject: '',

  unsavedEntryTime: '',

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
  }),

  _getNewEntryId() {
    let newId = 1;
    this.store.peekAll('entry').forEach(function () {
      newId++;
    })
    return newId;
  },

  actions: {
    handleSubmitEntry() {
      if (this.get('unsavedEntry.time') && this.get('unsavedEntry.project') && this.get('unsavedEntry.description')) {
        this.store.createRecord('entry', {
          id: this._getNewEntryId(),
          time: this.get('unsavedEntry.time'),
          project: this.get('unsavedEntry.project'),
          description: this.get('unsavedEntry.description')
        });

        this.set('unsavedEntryTime', '');
        this.set('unsavedEntryProject', '');
        this.set('unsavedEntryDescription', '');
      } else {
        alert('Fill out all the fields!');
      }
    }
  }
});
