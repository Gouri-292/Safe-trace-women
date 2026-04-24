/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import Calculator from '../src/components/Calculator';
import HiddenDashboard from '../src/components/HiddenDashboard';
import SOSMonitor from '../src/components/SOSMonitor';
import AdminHQ from '../src/components/AdminHQ';

enum AppState {
  HARMLESS = 'harmless',
  HIDDEN = 'hidden',
  SOS = 'sos'
}

export default function App() {
  const [state, setState] = useState<AppState>(AppState.HARMLESS);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkSize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    checkSize();
    window.addEventListener('resize', checkSize);
    return () => window.removeEventListener('resize', checkSize);
  }, []);

  // Desktop always shows the Admin/HQ view
  if (isDesktop) {
    return <AdminHQ />;
  }

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      <AnimatePresence mode="wait">
        {state === AppState.HARMLESS && (
          <motion.div
            key="harmless"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4 }}
          >
            <Calculator onUnlock={() => setState(AppState.HIDDEN)} />
          </motion.div>
        )}

        {state === AppState.HIDDEN && (
          <motion.div
            key="hidden"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 120 }}
          >
            <HiddenDashboard
              onStartSOS={() => setState(AppState.SOS)}
              onNavigateHome={() => setState(AppState.HARMLESS)}
            />
          </motion.div>
        )}

        {state === AppState.SOS && (
          <motion.div
            key="sos"
            initial={{ opacity: 0, backgroundColor: '#fff' }}
            animate={{ opacity: 1, backgroundColor: '#2a1425' }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <SOSMonitor onDeactivate={() => setState(AppState.HIDDEN)} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
