/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import Calculator from './components/Calculator';
import HiddenDashboard from './components/HiddenDashboard';
import SOSMonitor from './components/SOSMonitor';
import AdminHQ from './components/AdminHQ';

enum AppState {
  HARMLESS = 'harmless',
  HIDDEN = 'hidden',
  SOS = 'sos'
}

export default function App() {
  const [state, setState] = useState<AppState>(AppState.HARMLESS);
  const [isDesktop, setIsDesktop] = useState(false);
  const [activeAlertId, setActiveAlertId] = useState<string | null>(null);

  // Auto-authenticate a test user to get a JWT token
  useEffect(() => {
    const authenticate = async () => {
      const token = localStorage.getItem('token');
      if (token) return; // Already have a token

      try {
        // Try to register a test user
        const res = await fetch('http://localhost:5000/api/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: 'Test User',
            email: 'testuser@safetrace.com',
            password: 'password123'
          })
        });

        const data = await res.json();
        
        if (res.ok) {
          localStorage.setItem('token', data.token);
        } else if (data.message === 'User already exists') {
          // If already registered, login to get the token
          const loginRes = await fetch('http://localhost:5000/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              email: 'testuser@safetrace.com',
              password: 'password123'
            })
          });
          const loginData = await loginRes.json();
          if (loginRes.ok) {
            localStorage.setItem('token', loginData.token);
          }
        }
      } catch (error) {
        console.error('Auth error:', error);
      }
    };

    authenticate();
  }, []);

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
              onStartSOS={(alertId) => {
                setActiveAlertId(alertId);
                setState(AppState.SOS);
              }}
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
            <SOSMonitor 
              activeAlertId={activeAlertId}
              onDeactivate={() => {
                setActiveAlertId(null);
                setState(AppState.HIDDEN);
              }} 
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
