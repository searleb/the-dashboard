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
