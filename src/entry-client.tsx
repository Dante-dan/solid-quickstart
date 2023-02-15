import { mount, StartClient } from "solid-start/entry-client";
import { version as projectVersion } from '../package.json';
import { onLCP, onFID, onCLS, onFCP } from 'web-vitals';
import * as Sentry from '@sentry/browser';
import { BrowserTracing } from '@sentry/tracing';

onFCP(v => console.log('==== onFCP ====', v));
onCLS(v => console.log('==== onCLS ====', v));
onFID(v => console.log('==== onFID ====', v));
onLCP(v => console.log('==== onLCP ====', v));

new PerformanceObserver((entryList) => {
    for (const entry of entryList.getEntriesByName('first-contentful-paint')) {
        console.log('FCP candidate:', entry.startTime, entry);
    }
}).observe({ type: 'paint', buffered: true });


// @ts-ignore
// Object.defineProperty(window.performance, 'timing', {
//     value: {},
// });

// @ts-ignore
// Object.defineProperty(window.performance, 'timeOrigin', {
//     value: undefined,
// });

// @ts-ignore
// Object.defineProperty(window.performance, 'now', {
//     value: undefined,
// });

Sentry.init({
    dsn: "https://99be236fbebc420783c58ae108afbf49@o4504683956600832.ingest.sentry.io/4504683957846016",
    debug: true,
    // Alternatively, use `process.env.npm_package_version` for a dynamic release version
    // if your build tool supports it.
    release: projectVersion,
    integrations: [new BrowserTracing()],

    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in production
    tracesSampleRate: 1.0,
});

mount(() => <StartClient />, document);
