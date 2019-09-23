import React from 'react'

import { BrowserRouter } from 'react-router-dom'

import CssBaseline from '@material-ui/core/CssBaseline'

import AppStateProvider from './AppStateProvider'
import Routes from './Routes'

import TopBarL1 from '../TopBarL1'

import './style.css'

export default function App() {
    return (
        <>
            <CssBaseline />
            <AppStateProvider>
                {/* <BrowserRouter basename="/trading-game"> */}
                <BrowserRouter>
                    <TopBarL1 />
                    <Routes />
                </BrowserRouter>
            </AppStateProvider>
        </>
    )
}
