import React from 'react'

import useTheme from '@material-ui/styles/useTheme'

import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Divider from '@material-ui/core/Divider'
import Typography from '@material-ui/core/Typography'

import { useHistory } from 'react-router-dom'

// import { AppDispatchContext, AppStateContext } from '../App/AppStateProvider'

export default function Home() {
    // Use context -------------------------------------------------------------
    // const appDispatch = React.useContext(AppDispatchContext)
    // const appState = React.useContext(AppStateContext)

    // Use hooks ---------------------------------------------------------------
    const history = useHistory()
    const theme = useTheme()

    // Render content ----------------------------------------------------------
    return (
        <div className="app-container">
            {/* Settings --------------------------------------------------- */}
            <Card
                style={{
                    maxWidth: theme.spacing(60),
                    margin: '0 auto',
                }}
            >
                <CardActionArea onClick={() => history.push('/settings')}>
                    <CardMedia
                        title="Settings"
                        component="img"
                        height={theme.spacing(20)}
                        image="/img/settings.jpg"
                    />
                    <CardContent>
                        <Typography variant="h5" component="h2">
                            Settings
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>

            {/* Trading competition ---------------------------------------- */}
            {/* <Card
                style={{
                    maxWidth: theme.spacing(60),
                    margin: '48px auto 0 auto',
                }}
            >
                <CardActionArea onClick={() => history.push('/competition')}>
                    <CardMedia
                        title="Trading Competition"
                        component="img"
                        height={theme.spacing(30)}
                        image="/img/trading-competition.jpg"
                    />
                    <CardContent>
                        <Typography variant="h5" component="h2" gutterBottom>
                            Trading Competition
                        </Typography>
                        <Typography variant="body2" component="p" color="textSecondary" />
                    </CardContent>
                </CardActionArea>
            </Card> */}

            {/* Footer note ------------------------------------------------ */}
            <Divider style={{ marginTop: 48 }} />
            <Typography variant="caption" color="textSecondary">
                version:&nbsp;
                {APP_VERSION.replace(/"/g, '')}
            </Typography>
        </div>
    )
}
