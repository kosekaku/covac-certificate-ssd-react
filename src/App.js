import React from 'react';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query';
import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";
import MainContent from './components/mainContent';
import 'reactjs-popup/dist/index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import styles from './App.module.css';

// monitering tool- sentry TODO- enable once app ready for production
// Sentry.init({
//   dsn: "https://63a599d57a274be28f43d1794a039661@o1163049.ingest.sentry.io/6250803",
//   integrations: [new BrowserTracing()],
//   // We recommend adjusting this value in production, or using tracesSampler
//   // for finer control
//   tracesSampleRate: 1.0,
// });


const appConfig = {
  baseUrl: 'https://southsudanhis.org/covid19southsudan/api/organisationUnits.json?fields=id,name,level,displayName,ancestors[id,name,level,displayName]&paging=false&=',
  apiVersion: 33,
};

const queryClient = new QueryClient();

export default function App() {
  return (
    // <Provider config={appConfig}>
    <QueryClientProvider client={queryClient}>
      <MainContent/>   
    </QueryClientProvider>
  //  </Provider>
  );
}