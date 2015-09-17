import Ember from 'ember';

export
default Ember.Route.extend({
    model() {
        return [{
            name: "Brent Schooley",
            twitter: "@brentschooley"
        }, {
            name: "Sam Agnew",
            twitter: "@sagnewshreds"
        }, {
            name: "Eddie Zaneski",
            twitter: "@eddiezane"
        }];
    }
});
