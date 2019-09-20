import React from 'react'
import PropTypes from 'prop-types'

import withTheme from '@material-ui/core/styles/withTheme'

import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
// import LinearProgress from '@material-ui/core/LinearProgress'
import Typography from '@material-ui/core/Typography'

// import useAllApps from '../../lib/api/hooks/all-apps/use-all-apps'
// import parseAllAppsResponse from '../../lib/state-specific/parse-all-apps-response'

// import { AppDispatchContext } from '../App/AppStateProvider'
// import { AppsDispatchContext, AppsStateContext } from '../App/AppsStateProvider'
// import { AuthDispatchContext, AuthStateContext } from '../App/AuthStateProvider'
// import { PatientStateContext } from '../App/PatientStateProvider'

// import AppsGrid from './AppsGrid'
// import IFrameWrapper from './IFrameWrapper'

function Apps(props) {
    // // Use context -------------------------------------------------------------
    // const appDispatch = useContext(AppDispatchContext)

    // const appsDispatch = useContext(AppsDispatchContext)
    // const {
    //     launchedApp: {
    //         appId: launchedAppId = '',
    //     },
    // } = useContext(AppsStateContext)

    // const authDispatch = useContext(AuthDispatchContext)
    // const authState = useContext(AuthStateContext)

    // const { selected: selectedPatient } = useContext(PatientStateContext)

    // // Use custom hooks --------------------------------------------------------
    // const [allAppsStatus, , allApps, , , , fetchAllApps] = useAllApps(authDispatch, authState)

    // // TODO: Fetch all apps before each app launch
    // // Use effect --------------------------------------------------------------
    // // Init
    // useEffect(() => {
    //     document.querySelector('#app-main').style.backgroundImage = 'url("/provider-portal/img/apps-greetings-tiles-bgnd.png")'
    //     document.querySelector('#app-main').style.backgroundPosition = 'top right'
    //     document.querySelector('#app-main').style.backgroundRepeat = 'no-repeat'

    //     appDispatch({ type: ':appState/ui/RESET_IS_APPS_FULLSCREEN:' })
    //     appDispatch({
    //         type: ':appState/ui/PATCH_APPS:',
    //         payload: { selected: '' },
    //     })
    //     // Do not reset launched app on init
    //     // - that breaks CDS card app link functionality
    //     // appsDispatch({ type: ':appsState/launchedApp/RESET:' })
    //     return () => {
    //         document.querySelector('#app-main').style.background = 'none'
    //     }
    // }, [appDispatch])

    // // Fetch apps
    // useEffect(() => {
    //     if (allAppsStatus === ':INIT:') {
    //         fetchAllApps()
    //     }
    // }, [allAppsStatus, fetchAllApps])

    // // Set all apps data
    // useEffect(() => {
    //     if (allAppsStatus === ':READY:') {
    //         const parsed = parseAllAppsResponse(allApps, selectedPatient)
    //         appsDispatch({
    //             type: ':appsState/SET_DATA:',
    //             payload: parsed,
    //         })
    //         appsDispatch({
    //             type: ':appsState/SET_STATUS:',
    //             payload: ':READY:',
    //         })
    //     }
    // }, [allApps, allAppsStatus, appsDispatch, selectedPatient])

    // // -------------------------------------------------------------------------
    // if (launchedAppId) {
    //     return <IFrameWrapper />
    // }

    // if (allAppsStatus !== ':READY:') {
    //     return <LinearProgress />
    // }

    // Render content ----------------------------------------------------------
    return (
        <div
            className="app-container"
            style={{
                marginTop: 48,
                paddingTop: 48,
                paddingBottom: 48,
            }}
        >
            <Card
                style={{
                    maxWidth: props.theme.spacing(60),
                    margin: '0 auto',
                }}
            >
                <CardActionArea onClick={() => props.history.push('/settings')}>
                    <CardMedia
                        title="Settings"
                        component="img"
                        height={props.theme.spacing(20)}
                        image="/trading-game/img/settings.jpg"
                    />
                    <CardContent>
                        <Typography variant="h5" component="h2">
                            Settings
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
            <Card
                style={{
                    maxWidth: props.theme.spacing(60),
                    margin: '48px auto 0 auto',
                }}
            >
                <CardActionArea onClick={() => props.history.push('/competition')}>
                    <CardMedia
                        title="Trading Competition"
                        component="img"
                        height={props.theme.spacing(30)}
                        image="/trading-game/img/trading-competition.jpg"
                    />
                    <CardContent>
                        <Typography variant="h5" component="h2" gutterBottom>
                            Trading Competition
                        </Typography>
                        {/* <Typography variant="body2" component="p" color="textSecondary" /> */}
                    </CardContent>
                </CardActionArea>
            </Card>
        </div>
    )
}

Apps.propTypes = {
    history: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
}

export default withTheme(Apps)
