import DS from 'ember-data';

export default DS.Model.extend({
  time: DS.attr('string'),
  project: DS.attr('string'),
  description: DS.attr('string')
});
