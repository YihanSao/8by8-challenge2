// TestPage.tsx
import React from 'react';
import { HeaderContextProvider } from '../header-context';
import { UserContext } from '@/contexts/user-context';
import { AlertsContextProvider } from '@/contexts/alerts-context';
import { StartChallengeModal } from './start_model';

const TestPage: React.FC = () => {
  return (

          <StartChallengeModal />


  );
};

export default TestPage;