import React, { useContext } from 'react'
import ReactSlider from 'react-slider'
import './slider.css'
import SettingsContext from '../contexts/SettingsContext'
import Backbutton from './Backbutton'

const Settingspage = () => {
    const context = useContext(SettingsContext)
    return (
        <div>
            <label>Work Minutes: {context.workMinutes}:00</label>
            <ReactSlider
                className='slider'
                thumbClassName='thumb'
                trackClassName='track'
                value={context.workMinutes}
                onChange={val => context.setWorkMinutes(val)}
                min={1}
                max={120}
            />
            <label>Break Minutes: {context.breakMinutes}:00 </label>
            <ReactSlider
                className='slider green'
                thumbClassName='thumb '
                trackClassName='track'
                value={context.breakMinutes}
                onChange={val => context.setBreakMinutes(val)}
                min={1}
                max={120}
            />

            <div style={{marginTop: '20px'}}>
                <Backbutton />
            </div>
        </div>
    )
}

export default Settingspage
