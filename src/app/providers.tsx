'use client';

import { ProgressProvider } from '@bprogress/next/app';

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <ProgressProvider height="4px" color="#539dfd" options={{ showSpinner: false }} shallowRouting>
      {children}
    </ProgressProvider>
  );
};

export default Providers;
