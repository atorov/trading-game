import React from 'react'

import LinearProgress from '@material-ui/core/LinearProgress'

export default function Fallback() {
    return (
        <div className="app-container">
            <LinearProgress />
        </div>
    )
}
