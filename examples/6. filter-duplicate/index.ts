import _ = require('lodash');
import Spider from '../../src/core/Spider';
import logger from '../../src/util/logger';

new Spider({
    level: 'log',
    rateLimit: {
        'httpbin.org': [1, 1]
    },
    handlers: [{
        pattern: '**',
        handle: async function (response) {
            let title = await response.xpath('//h1');
            logger.info(title.text());
            this.enqueue('https://httpbin.org/html');
        },
    }],
})
    .enqueue('https://httpbin.org/html')
    .start();
