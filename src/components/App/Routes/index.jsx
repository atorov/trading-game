import React, { Suspense } from 'react'
import PropTypes from 'prop-types'

import {
    Redirect,
    Route,
    Switch,
    withRouter,
} from 'react-router-dom'

import ErrorBoundary from '../../ErrorBoundary'

import Fallback from './Fallback'

const CHome = React.lazy(() => import('../../Home'))
const CSettings = React.lazy(() => import('../../Settings'))

function Routes(props) {
    // Use ref -----------------------------------------------------------------
    const unlisten = React.useRef()

    // Use effect --------------------------------------------------------------
    React.useEffect(() => {
        unlisten.current = props.history.listen(() => window.scrollTo(0, 0))
        return () => unlisten.current()
    }, [props.history])

    return (
        <ErrorBoundary>
            <Suspense fallback={<Fallback />}>
                <Switch>
                    <Route
                        path="/"
                        exact
                        component={CHome}
                    />

                    <Route
                        path="/settings"
                        exact
                        component={CSettings}
                    />

                    <Redirect to="/" />
                </Switch>
            </Suspense>
        </ErrorBoundary>
    )
}

Routes.propTypes = {
    history: PropTypes.object.isRequired,
}

export default withRouter(Routes)
