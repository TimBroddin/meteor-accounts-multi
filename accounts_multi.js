orig_updateOrCreateUserFromExternalService = Accounts.updateOrCreateUserFromExternalService;
Accounts.updateOrCreateUserFromExternalService = function(serviceName, serviceData, options) {
    var loggedInUser = Meteor.user();

    if (loggedInUser && typeof(loggedInUser.services[serviceName]) === 'undefined') {
        var setAttr = {};
        setAttr['services.' + serviceName] = serviceData;
        Meteor.users.update(loggedInUser._id, {
            $set: setAttr
        });
    }

    return orig_updateOrCreateUserFromExternalService.apply(this, arguments);
};

Meteor.methods({
    'getUserServices': function() {
        var user = Meteor.user();
        if (user) {
            var result = [];
            _.each(user.services, function(v, k) {
                console.log(v, k);
                result.push(k);
            });
            return result;
        }
        return false;
    }
});

Array.prototype.remove = function(from, to) {
    var rest = this.slice((to || from) + 1 || this.length);
    this.length = from < 0 ? this.length + from : from;
    return this.push.apply(this, rest);
};