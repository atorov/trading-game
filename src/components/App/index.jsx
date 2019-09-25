import React from 'react'

import { BrowserRouter } from 'react-router-dom'

import createMuiTheme, { ThemeOptions } from '@material-ui/core/styles/createMuiTheme'

import ThemeProvider from '@material-ui/styles/ThemeProvider'

import CssBaseline from '@material-ui/core/CssBaseline'

import AppStateProvider from './AppStateProvider'
import Routes from './Routes'

import TopBarL1 from '../TopBarL1'

import './style.css'

export default function App() {
    // Create custom theme -----------------------------------------------------
    const theme = createMuiTheme({
        // ...
        ...ThemeOptions,
    })

    // Render content ----------------------------------------------------------
    return (
        <>
            <CssBaseline />
            <ThemeProvider theme={theme}>
                <AppStateProvider>
                    {/* <BrowserRouter basename="/trading-game"> */}
                    <BrowserRouter>
                        <TopBarL1 />
                        <Routes />
                    </BrowserRouter>
                </AppStateProvider>
            </ThemeProvider>
        </>
    )
}
