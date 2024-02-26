import { useState } from 'react';
import './App.css';
import Settingspage from './components/Settingspage';
import Timer from './components/Timer';
import SettingsContext from './contexts/SettingsContext';

function App() {

  const [showSettings, setShowSettings] = useState(false)
  const [workMinutes, setWorkMinutes] = useState(45)
  const [breakMinutes, setBreakMinutes] = useState(15)


  return (
    <main>
      <SettingsContext.Provider value={{
        workMinutes,
        setWorkMinutes,
        breakMinutes,
        setBreakMinutes,
        setShowSettings,
        showSettings
      }}>
        {showSettings ? <Settingspage /> : <Timer />}
      </SettingsContext.Provider>
    </main>
  );
}

export default App;
