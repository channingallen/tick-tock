import Ember from 'ember';

export default Ember.Component.extend({
  activeItemTitle: 'Today',

  navItems: [
    Ember.Object.create({
      active: false,
      title: '2D-ago'
    }),
    Ember.Object.create({
      active: false,
      title: 'Yesterday'
    }),
    Ember.Object.create({
      active: true,
      title: 'Today'
    }),
    Ember.Object.create({
      active: false,
      icon: 'calendar',
      title: 'Calendar'
    })
  ],

  sendActiveTitleAction: Ember.on('init', function () {
    if (this.attrs.click) {
      this.attrs.click(this.get('activeItemTitle'));
    }
  }),

  liveItems: Ember.computed('activeItemTitle', function () {
    return this.get('navItems').map((navItem) => {
      return Ember.Object.create({
        active: navItem.title === this.get('activeItemTitle'),
        icon: navItem.icon,
        title: navItem.title
      });
    });
  }),

  actions: {
    selectTab(title) {
      this.set('activeItemTitle', title);

      if (this.attrs.click) {
        this.attrs.click(title);
      }
    }
  }
});
