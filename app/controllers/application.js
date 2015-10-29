import Ember from 'ember';

export default Ember.Controller.extend({
  _getNewEntryId() {
    let newId = 1;
    this.store.peekAll('entry').forEach(function () {
      newId++;
    });
    return newId;
  },

  actions: {
    handleSubmitEntry(entry) {
      if (entry) {
        this.store.createRecord('entry', {
          id: this._getNewEntryId(),
          date: entry.date,
          time: entry.time,
          project: entry.project,
          description: entry.description
        });
      }
    }
  }
});
