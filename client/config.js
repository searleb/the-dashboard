// Login options
Accounts.ui.config({
    requestPermissions:{
        google:['https://www.googleapis.com/auth/calendar', 'email', 'openid']
    },
    requestOfflineToken: {
        google: true
    },
    forceApprovalPrompt: {
        google: true
    }
});

// restrict signups to only @mentallyfriendly.com email addresses
Accounts.config({
    restrictCreationByEmailDomain: 'mentallyfriendly.com'
});

// cms accounts options
AccountsTemplates.configure({
    forbidClientAccountCreation: true,
    hideSignUpLink: true
});
