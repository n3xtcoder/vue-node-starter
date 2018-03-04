const records = [
    {
        id: 1,
        username: 'admin',
        password: 'password',
        displayName: 'Dr Nick Riviera',
        role: 'admin'
    },
    {
        id: 2,
        username: 'user',
        password: 'password',
        displayName: 'Homer Simpson',
        role: 'user',
    },
];

exports.findByUsername = function findByUsername(username, done) {
    process.nextTick(() => {
        for ( const i in records ) { // eslint-disable-line guard-for-in,no-restricted-syntax
            const item = records[i];
            if ( item.username === username ) {
                return done(null, item);
            }
        }
        return done(null, null);
    });
};
