import React from 'react'
import PropTypes from 'prop-types'

import withTheme from '@material-ui/core/styles/withTheme'

import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'

function Apps(props) {
    // Render content ----------------------------------------------------------
    return (
        <div className="app-container">
            {/* Settings --------------------------------------------------- */}
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

            {/* Trading competition ---------------------------------------- */}
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
