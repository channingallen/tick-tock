import DS from 'ember-data';

export default DS.Model.extend({
  date: DS.attr('string'),
  description: DS.attr('string'),
  project: DS.attr('string'),
  time: DS.attr('string')
});
