import React, { useContext } from 'react'
import SettingsContext from '../contexts/SettingsContext'

const Backbutton = () => {
    const {showSettings, setShowSettings} = useContext(SettingsContext)
    return (
        <div>
            <button className='with-text' onClick={() => setShowSettings(!showSettings)}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                </svg>

                Back
            </button>
        </div>
    )
}

export default Backbutton
