import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['entry-fields__project-input'],

  expanded: false,

  filteredProjects: Ember.computed(
    'inputValue',
    'noActionsTaken',
    'projects.@each.name',
    function () {
      const query = (this.get('inputValue') || '').toLowerCase();
      if (!query) {
        return this.get('projects');
      }

      if (this.get('noActionsTaken')) {
        this.set('noActionsTaken', false);
        return this.get('projects');
      }

      return this.get('projects').filter((project) => {
        const projectName = project.get('name').toLowerCase();
        return projectName.indexOf(query) !== -1;
      });
    }
  ),

  actions: {
    collapse() {
      this.set('expanded', false);

      if (this.attrs.collapse) {
        this.attrs.collapse();
      }
    },

    selectProject(project) {
      this.set('selectedProject', project);

      if (this.attrs.select) {
        this.attrs.select(project);
      }
    },

    expand() {
      this.set('expanded', true);
      this.set('noActionsTaken', true);

      if (this.attrs.expand) {
        this.attrs.expand();
      }
    },

    updateInputValue(inputValue) {
      this.set('inputValue', inputValue);
    }
  }
});
