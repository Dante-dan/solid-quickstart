import { mount, StartClient } from "solid-start/entry-client";
import { version as projectVersion } from '../package.json';
import { onLCP, onFID, onCLS, onFCP } from 'web-vitals';

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
Object.defineProperty(window.performance, 'timing', {
    value: {},
});

// @ts-ignore
Object.defineProperty(window.performance, 'timeOrigin', {
    value: undefined,
});


setTimeout(async () => {
    const Sentry = await import('@sentry/browser');
    const { BrowserTracing } = await import('@sentry/tracing');
    Sentry.init({
        dsn: "https://examplePublicKey@o0.ingest.sentry.io/0",
        debug: true,
        // Alternatively, use `process.env.npm_package_version` for a dynamic release version
        // if your build tool supports it.
        release: process.env.npm_package_version || projectVersion,
        integrations: [new BrowserTracing()],

        // Set tracesSampleRate to 1.0 to capture 100%
        // of transactions for performance monitoring.
        // We recommend adjusting this value in production
        tracesSampleRate: 1.0,
    });
}, 5000);

mount(() => <StartClient />, document);
