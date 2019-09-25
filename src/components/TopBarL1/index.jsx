import React from 'react'

import { Link, useHistory } from 'react-router-dom'

import useTheme from '@material-ui/core/styles/useTheme'

import AppBar from '@material-ui/core/AppBar'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'

import IHome from '@material-ui/icons/Home'
import IHomeVert from '@material-ui/icons/MoreVert'

export default function TopBarL1() {
    // Use hooks ---------------------------------------------------------------
    const history = useHistory()
    const theme = useTheme()

    // Use state ---------------------------------------------------------------
    const [anchorEl, setAnchorEl] = React.useState(null)
    const open = !!anchorEl

    // Render content ----------------------------------------------------------
    return (
        <AppBar position="fixed">
            <Toolbar variant="dense">
                <Link to="/">
                    <IconButton
                        edge="start"
                        color="inherit"
                        style={{ marginRight: theme.spacing(2) }}
                    >
                        <IHome />
                    </IconButton>
                </Link>
                <Typography variant="h6" style={{ flexGrow: 1 }}>
                    Trading Game
                </Typography>
                <div>
                    <IconButton
                        color="inherit"
                        onClick={(event) => setAnchorEl(event.currentTarget)}
                    >
                        <IHomeVert />
                    </IconButton>
                    <Menu
                        anchorEl={anchorEl}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={open}
                        onClose={() => setAnchorEl(null)}
                    >
                        <MenuItem
                            onClick={() => {
                                setAnchorEl(null)
                                history.push('/')
                            }}
                        >
                            Home
                        </MenuItem>
                        <Divider />
                        <MenuItem
                            onClick={() => {
                                setAnchorEl(null)
                                history.push('/settings')
                            }}
                        >
                            Settings
                        </MenuItem>
                        <MenuItem
                            onClick={() => {
                                setAnchorEl(null)
                                history.push('/competition')
                            }}
                        >
                            Trading Competition
                        </MenuItem>
                    </Menu>
                </div>
            </Toolbar>
        </AppBar>
    )
}
