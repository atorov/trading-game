import React, { Suspense } from 'react'

import {
    Redirect,
    Route,
    Switch,
    useHistory,
} from 'react-router-dom'

import ErrorBoundary from '../../ErrorBoundary'

import Fallback from './Fallback'

const CHome = React.lazy(() => import('../../Home'))
const CSettings = React.lazy(() => import('../../Settings'))

export default function Routes() {
    // Use ref -----------------------------------------------------------------
    const unlisten = React.useRef()

    // Use hooks ---------------------------------------------------------------
    const history = useHistory()

    // Use effect --------------------------------------------------------------
    React.useEffect(() => {
        unlisten.current = history.listen(() => window.scrollTo(0, 0))
        return () => unlisten.current()
    }, [history])

    return (
        <ErrorBoundary>
            <Suspense fallback={<Fallback />}>
                <Switch>
                    <Route path="/" exact>
                        <CHome />
                    </Route>
                    <Route path="/settings" exact>
                        <CSettings />
                    </Route>
                    <Redirect to="/" />
                </Switch>
            </Suspense>
        </ErrorBoundary>
    )
}
