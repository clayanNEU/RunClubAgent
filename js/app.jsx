import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import RunnerDashboard from './components/RunnerDashboard';
import RunnerPortal from './components/RunnerPortal';

const App = () => {
  const [view, setView] = useState('dashboard');
  
  return (
    <div>
      <div style={{ padding: '1rem', background: '#f0f0f0', textAlign: 'center' }}>
        <button 
          style={{ padding: '0.5rem 1rem', margin: '0 0.5rem', background: view === 'dashboard' ? '#3b82f6' : '#e5e7eb', color: view === 'dashboard' ? 'white' : 'black', borderRadius: '0.25rem' }}
          onClick={() => setView('dashboard')}
        >
          Organizer Dashboard
        </button>
        <button 
          style={{ padding: '0.5rem 1rem', margin: '0 0.5rem', background: view === 'portal' ? '#3b82f6' : '#e5e7eb', color: view === 'portal' ? 'white' : 'black', borderRadius: '0.25rem' }}
          onClick={() => setView('portal')}
        >
          Runner Portal
        </button>
      </div>
      
      {view === 'dashboard' ? <RunnerDashboard /> : <RunnerPortal />}
    </div>
  );
};

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', () => {
  // Look for or create the root element
  let rootElement = document.getElementById('react-app');
  
  // If element doesn't exist, create it
  if (!rootElement) {
    rootElement = document.createElement('div');
    rootElement.id = 'react-app';
    document.body.appendChild(rootElement);
  }
  
  ReactDOM.render(<App />, rootElement);
});