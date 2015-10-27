import Ember from 'ember';

export default Ember.Component.extend({
  cursorWord: null,

  expanded: false,

  optionHotkeyHint: null,

  optionHotkeyHintPresent: Ember.computed('optionHotkeyHint', function () {
    if (this.get('optionHotkeyHint.length')) {
      return true;
    }
  }),

  optionStatus: null,

  optionStatusPresent: true,

  optionWarning: null,

  optionWarningPresent: false,

  _getCursorWord() {
    if (!this.get('inputValue')) {
      return;
    }

    const $input = this.$('.entry-fields__description-input');
    let cursorPosition = $input.prop('selectionStart');

    let cursorWord, firstCharIndex, lastCharIndex, i = cursorPosition;

    const query = this.get('inputValue');
    const charToLeftIsSpace = query.charAt(i - 1) === ' ';
    const noCharToLeft = query.charAt(i - 1) === '';
    const charToRightIsSpace = query.charAt(i + 1) === ' ';
    const noCharToRight = query.charAt(i + 1) === '';
    const charPresentAtCursor = query.charAt(i) !== ' ' &&
                                query.charAt(i) !== '';

    if (charPresentAtCursor && (noCharToLeft || charToLeftIsSpace)) {
      firstCharIndex = cursorPosition;
    }

    if (charPresentAtCursor && (noCharToRight || charToRightIsSpace)) {
      lastCharIndex = cursorPosition + 1;
    }

    if (!charPresentAtCursor && (!noCharToLeft && !charToLeftIsSpace)) {
      lastCharIndex = cursorPosition;
      cursorPosition--;
    }

    if (!firstCharIndex) {
      while (query.charAt(i - 1) !== ' ' && query.charAt(i - 1) !== '') {
        firstCharIndex = i - 1;
        i--;
      }
    }

    if (!lastCharIndex) {
      while (query.charAt(i + 1) !== ' ' && query.charAt(i + 1) !== '') {
        lastCharIndex = i + 2;
        i++;
      }
    }

    if (firstCharIndex >= 0 && lastCharIndex >= 0) {
      console.log(`returning word: ${query.substring(firstCharIndex, lastCharIndex)}`);
      cursorWord = query.substring(firstCharIndex, lastCharIndex);
      this.set('cursorWord', cursorWord);
      return cursorWord;
    }

    this.set('cursorWord', cursorWord);
    return cursorWord;
  },

  _optionMatchesCursorWord(option) {
    const cursorWord = this._getCursorWord();
    const tagName = option.get('tag.name').toLowerCase();

    if (!cursorWord) {
      return true;
    }

    if (cursorWord === '#') {
      this.set('optionHotkeyHint', '[Tab] cycle through tag completions');
      return true;
    }

    if (cursorWord.charAt(0) === '#' && cursorWord.length === 1) {
      return true;
    }

    if (cursorWord.charAt(0) !== '#') {
      return true;
    }

    return tagName.indexOf(cursorWord) !== -1; // return true if match found
  },

  _filterOptionsByQuery: Ember.observer(
    'inputValue',
    'cursorWord',
    function () {
      this.get('tagOptions').forEach((option) => {
        option.set('visible', this._optionMatchesCursorWord(option));
      });
    }
  ),

  tagOptions: Ember.computed('tags.[]', function () {
    return this.get('tags').map((tag) => {
      return Ember.Object.create({
        visible: true,
        tag: tag
      });
    });
  }),

  actions: {
    collapse() {
      this.set('expanded', false);

      if (this.attrs.collapse) {
        this.attrs.collapse();
      }
    },

    handleClick() {
      this._getCursorWord();

      if (this.attrs.click) {
        this.attrs.click();
      }
    },

    expand() {
      this.set('expanded', true);

      if (this.attrs.expand) {
        this.attrs.expand();
      }
    },

    handleKeyUp(inputValue) {
      this._getCursorWord();

      this.set('inputValue', inputValue);

      if (this.attrs.type) {
        this.attrs.type(inputValue);
      }
    }
  }
});
