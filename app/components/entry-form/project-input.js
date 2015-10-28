import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['project-input'],

  expanded: false,

  _getHighlightedOption() {
    return this.get('visibleOptions').find(option => {
      return !!option.get('highlight');
    });
  },

  _moveHighlightDown() {
    if (!this.get('visibleOptions.length')) {
      return;
    }

    const highlightedOption = this._getHighlightedOption();
    const visOptions = this.get('visibleOptions');
    const highlightedIndex = visOptions.indexOf(highlightedOption);
    const highlightedOptionIsLast = highlightedIndex === visOptions.length - 1;
    if (highlightedOption && !highlightedOptionIsLast) {
      highlightedOption.set('highlight', false);

      const nextOption = visOptions.objectAt(highlightedIndex + 1);
      nextOption.set('highlight', true);
    } else if (!highlightedOption) {
      this.set('visibleOptions.firstObject.highlight', true);
    }
  },

  _moveHighlightUp() {
    if (!this.get('visibleOptions.length')) {
      return;
    }

    const highlightedOption = this._getHighlightedOption();
    const highlightedIndex = this.get('visibleOptions').indexOf(highlightedOption);
    const highlightedOptionIsFirst = highlightedIndex === 0;
    if (highlightedOption && !highlightedOptionIsFirst) {
      highlightedOption.set('highlight', false);

      const previousOption = this.get('visibleOptions').objectAt(highlightedIndex - 1);
      previousOption.set('highlight', true);
    } else if (!highlightedOption) {
      this.set('visibleOptions.firstObject.highlight', true);
    }
  },

  _optionMatchesInputValue(option) {
    const inputValue = (this.get('inputValue') || '').toLowerCase();
    const projectName = option.get('project.name').toLowerCase();
    return projectName.indexOf(inputValue) !== -1;
  },

  _resetOptions() {
    // Note: This will automatically highlight the first option via
    // `_highlightFirstOption`, because it watches the `visibleOptions` and we
    // are changing that here.
    this.get('projectOptions').forEach((option) => {
      option.set('visible', true);
    });
  },

  _selectHighlightedProject() {
    const highlightedOption = this._getHighlightedOption();
    const project = highlightedOption.get('project');
    this._selectProject(project);
  },

  _selectProject(project) {
    this.set('selectedProject', project);

    if (this.attrs.select) {
      this.attrs.select(project);
    }
  },

  _highlightFirstOption: Ember.observer(
    'expanded',
    'visibleOptions.[]',
    function () {
      this.get('visibleOptions').forEach((option, index) => {
        option.set('highlight', index === 0);
      });
    }
  ),

  _filterOptionsByQuery: Ember.observer('inputValue', function () {
    this.get('projectOptions').forEach((option) => {
      option.set('visible', this._optionMatchesInputValue(option));
    });
  }),

  _maintainInputValue: Ember.observer('selectedProject.name', function () {
    this.set('inputValue', this.get('selectedProject.name'));
  }),

  _reset: Ember.observer('attrs.reset', function () {
    this.set('selectedProject', null);
  }),

  // TODO THIS COMMIT: make new function for filtering options by input values
  projectOptions: Ember.computed('projects.[]', function () {
    return this.get('projects').map((project) => {
      return Ember.Object.create({
        highlight: false,
        project: project,
        visible: true
      });
    });
  }),

  visibleOptions: Ember.computed('projectOptions.@each.visible', function () {
    return this.get('projectOptions').filterBy('visible');
  }),

  actions: {
    collapse() {
      this.set('expanded', false);

      if (this.attrs.collapse) {
        this.attrs.collapse();
      }
    },

    selectProject(project) {
      this._selectProject(project);
    },

    expand() {
      this.set('expanded', true);

      this._resetOptions();

      if (this.attrs.expand) {
        this.attrs.expand();
      }
    },

    handleEnter() {
      if (this.attrs.enter) {
        if (!this.get('expanded')) {
          this.attrs.enter();
        }
      }

      this._selectHighlightedProject();
    },

    handleKeyDown(inputValue, event) {
      if (event.which === 27) {
        this.set('expanded', !this.get('expanded'));
      }

      if (event.which === 38 || event.which === 40) {
        event.preventDefault();
      }

      // Decrement the highlight index when up is pressed.
      if (event.which === 38) {
        this._moveHighlightUp();
      }

      // Increment the highlight index when down is pressed.
      if (event.which === 40) {
        this._moveHighlightDown();
      }
    },

    handleKeyUp(inputValue, event) {
      const originalInputValue = this.get('inputValue');
      if (inputValue !== originalInputValue  && event.which !== 13) {
        this.set('inputValue', inputValue);
      }

      if (this.attrs['key-up']) {
        this.attrs['key-up'](inputValue);
      }
    }
  }
});
