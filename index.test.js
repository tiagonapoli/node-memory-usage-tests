const go = require('./index')

test('Run index. Wanna check memory so run jest with --logHeapUsage', async () => {
    await go()
}, 60 * 1000)