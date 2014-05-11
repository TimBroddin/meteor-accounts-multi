Package.describe({
    summary: "Allows a user to login with multiple services."
});

Package.on_use(function(api) {
    api.use(['deps', 'service-configuration', 'accounts-base',
        'underscore', 'templating', 'session'
    ], 'client');
    api.use(['accounts-base'], 'server');
    // Export Accounts (etc) to packages using this one.
    api.imply('accounts-base', ['client', 'server']);

    // Allow us to call Accounts.oauth.serviceNames, if there are any OAuth
    // services.
    api.use('accounts-oauth', {
        weak: true
    });
    // Allow us to directly test if accounts-password (which doesn't use
    // Accounts.oauth.registerService) exists.
    api.use('accounts-password', {
        weak: true
    });

    api.add_files([
        'accounts_multi.js',
        'accounts_ui.js',
        'login_buttons.html',
        'login_buttons_single.html',
        'login_buttons_dropdown.html',
        'login_buttons_dialogs.html',

        'login_buttons_session.js',

        'login_buttons.js',
        'login_buttons_single.js',
        'login_buttons_dropdown.js',
        'login_buttons_dialogs.js',

        'login_buttons.css'
    ], 'client');
    api.imply('accounts-base', ['client', 'server']);

    api.add_files(['accounts_multi.js'], 'server');
});

Package.on_test(function(api) {
    api.use('accounts-multi');
    api.use('tinytest');
    api.add_files('accounts_ui_tests.js', 'client');
});