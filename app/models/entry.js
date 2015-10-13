import DS from 'ember-data';

export default DS.Model.extend({
  createdAt: DS.attr('string', {
    defaultValue: function() { return new Date(); }
  }),
  time: DS.attr('string'),
  project: DS.attr('string'),
  description: DS.attr('string')
});
