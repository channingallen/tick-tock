import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    handleValueTranslation() {
      this.set('translatedInputValue', '');

      if (!this.get('rawInputValue') || !this.get('rawInputValue').length) {
        return;
      }

      const inputAsArray = this.get('rawInputValue').split('');
      const okChars = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
      inputAsArray.forEach((numString) => {
        if (okChars.indexOf(numString) === -1) {
          console.log(`Error: the string number ${numString} was not matched with a number!`);
          if (this.get('translatedInputValue')) {
            this.set('translatedInputValue', `0:00`);
          }
          return;
        }
      });

      //this._translateTimeInput();
      this.set('translatedInputValue', `${this.get('rawInputValue')}:00`);
      this.attrs.type(this.get('translatedInputValue'));
      this.set('rawInputValue', this.get('translatedInputValue'));
    }
  }
});
