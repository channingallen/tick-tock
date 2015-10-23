import Ember from 'ember';

export default Ember.Component.extend({
  activeProjectIndex: null,

  classNames: ['entry-fields__project-input'],

  _decrementActiveIndex() {
    let currentActiveProjectIndex = this.get('activeProjectIndex');
    let numProjectOptions = this.get('numProjectOptions');

    if (currentActiveProjectIndex > 0) {
      this.set('activeProjectIndex', currentActiveProjectIndex - 1);
    } else {
      this.set('activeProjectIndex', numProjectOptions - 1);
    }
  },

  expanded: false,

  _incrementActiveIndex() {
    let currentActiveProjectIndex = this.get('activeProjectIndex');
    let numProjectOptions = this.get('numProjectOptions');

    if ((currentActiveProjectIndex + 1) < numProjectOptions) {
      this.set('activeProjectIndex', currentActiveProjectIndex + 1);
    } else {
      this.set('activeProjectIndex', 0);
    }
  },

  noActionsTaken: true,

  noNewOptionSelected: true,

  numProjectOptions: null,

  projectOptions: Ember.computed(
    'noActionsTaken',
    'activeProjectIndex',
    'inputValue',
    'projects.@each.name',
    function () {
      // Define the new project options array
      const projectOptions = [];
      this.get('projects').forEach((project) => {
        const option = Ember.Object.create({
          active: false,
          project: project
        });
        projectOptions.push(option);
      });
      this.set('numProjectOptions', projectOptions.length);

      // Return the array with the first item active in the first construction
      if (this.get('noActionsTaken')) {
        projectOptions.objectAt(0).set('active', true);
        this.set('activeProjectIndex', 0);
        return projectOptions;
      }

      const query = (this.get('inputValue') || '').toLowerCase();
      if (!query && this.get('noNewOptionSelected')) {
        projectOptions.objectAt(0).set('active', true);
        this.set('activeProjectIndex', 0);
        return projectOptions;
      }

      if (!query) {
        const newActiveProjectIndex = this.get('activeProjectIndex');
        projectOptions.objectAt(newActiveProjectIndex).set('active', true);
        return projectOptions;
      }

      const filteredProjectOptions = projectOptions.filter((option) => {
        const projectName = option.get('project.name').toLowerCase();
        return projectName.indexOf(query) !== -1;
      });
      this.set('numProjectOptions', filteredProjectOptions.length);

      if (!this.get('numProjectOptions')) {
        return filteredProjectOptions;
      }

      if (this.get('noNewOptionSelected')) {
        filteredProjectOptions.objectAt(0).set('active', true);
        this.set('activeProjectIndex', 0);
      } else {
        const newActiveProjectIndex = this.get('activeProjectIndex');
        filteredProjectOptions.objectAt(newActiveProjectIndex).set('active', true);
      }

      return filteredProjectOptions;
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
      this.set('noNewOptionSelected', true);

      if (this.attrs.expand) {
        this.attrs.expand();
      }
    },

    handleKeyUp(inputValue, event) {
      this.set('inputValue', inputValue);

      // report actions have been taken unless "tabbing in" with tab or shift
      if (event.keyCode !== 9 && event.keyCode !== 16) { // 9/16 === tab/shift
        this.set('noActionsTaken', false);
      }

      // report new options have been selected when up or down are pressed
      if (event.keyCode === 38 || event.keyCode === 40) { // 38/40 === up/down
        this.set('noNewOptionSelected', false);
      }

      // decrement the active index when up is pressed
      if (event.keyCode === 38) {
        this._decrementActiveIndex();
      }

      // increment the active index when down is pressed
      if (event.keyCode === 40) {
        this._incrementActiveIndex();
      }

      if (this.attrs.type) {
        this.attrs.type(inputValue);
      }

      console.log(event.keyCode); // TODO THIS COMMIT: remove keyCode logging
    }
  }
});
