import {
    Box,
    Drawer,
    Toolbar,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    Divider,
    Tabs,
    Tab,
} from '@mui/material'
import MailIcon from '@mui/icons-material/Mail'
import MenuIcon from '@mui/icons-material/Menu'
import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
const TabLink = (props) => {
    return (
        <Tab
            component={Link}
            sx={{ color: 'secondary.main', fontWeight: 'bold' }}
            {...props}
        ></Tab>
    )
}
const UserDrawer = (props) => {
    const { window } = props
    const [mobileOpen, setMobileOpen] = useState(false)
    const location = useLocation()
    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen)
    }
    const container =
        window !== undefined ? () => window().document.body : undefined
    const drawerWidth = 180

    const [tab, setTab] = useState(location.pathname)
    const handleChange = (event, newValue) => {
        setTab(newValue)
    }
    return (
        <Box
            sx={{
                position: 'absolute',
                left: 0,
                top: 60,
            }}
        >
            <Drawer
                container={container}
                variant="temporary"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{
                    keepMounted: true, // Better open performance on mobile.
                }}
                sx={{
                    display: { xs: 'block', sm: 'none' },
                    '& .MuiDrawer-paper': {
                        boxSizing: 'border-box',
                        width: drawerWidth,
                    },
                }}
            ></Drawer>
            <Drawer
                variant="permanent"
                sx={{
                    position: 'relative',
                    zIndex: 0,
                    display: { xs: 'none', sm: 'block' },
                    '& .MuiDrawer-paper': {
                        marginTop: 10,

                        boxSizing: 'border-box',
                        width: drawerWidth,
                    },
                }}
                open
            >
                <Tabs
                    onChange={handleChange}
                    orientation="vertical"
                    value={tab}
                    aria-label="Vertical tabs example"
                    sx={{ borderRight: 1, borderColor: 'divider' }}
                >
                    <TabLink
                        label="Main"
                        to={'/user/main'}
                        value={'/user/main'}
                    />
                    <TabLink
                        label="Completed Routes"
                        to={'/user/completed'}
                        value={'/user/completed'}
                    />
                    <TabLink
                        label="W.I.P Routes"
                        to={'/user/wip'}
                        value={'/user/wip'}
                    />
                    <TabLink
                        label="Statistycs"
                        to={'/user/stats'}
                        value={'/user/stats'}
                    />
                </Tabs>
            </Drawer>
        </Box>
    )
}

export default UserDrawer
