import { useTheme } from '@emotion/react'
import styled from '@emotion/styled'
import { Box, Button, Grid, Paper, Typography } from '@mui/material'
import Image from '../svg/whiteBack.svg'
import { useNavigate } from 'react-router-dom'
const HeroPaper = styled(Box)(({ theme }) => ({
    color: theme.palette.primary.main,
    background: `url(${Image})`,
    backgroundSize: 'cover',
    height: '100vh',

    padding: theme.spacing(8),
    paddingTop: theme.spacing(16),
}))

const HeroTextWelcome = styled(Typography)(({ theme }) => ({
    color: theme.palette.primary.main,
    paddingBottom: theme.spacing(2),
    fontWeight: 'bold',
    fontSize: '3.5rem',
}))
const HeroTextDesc = styled(Typography)(({ theme }) => ({
    color: theme.palette.primary.main,

    fontWeight: 'bold',
    fontSize: '1.5rem',
}))
const Hero = () => {
    const navigate = useNavigate()
    return (
        <HeroPaper elevation={0}>
            <Grid container>
                <Grid item xs={12} md={5} lg={5}>
                    <HeroTextWelcome>Welcome to Craglist</HeroTextWelcome>

                    <HeroTextDesc>
                        Find the best crags, track your climbs, and level up
                        your skills with Craglist.
                    </HeroTextDesc>
                    <HeroTextDesc>
                        Join now and elevate your climbing experience.
                    </HeroTextDesc>
                </Grid>
                <Grid item xs={0} md={6} lg={6}></Grid>
                <Grid item xs={12} md={3} lg={3}>
                    <Button
                        fullWidth
                        sx={{ my: 4 }}
                        onClick={() => navigate('/finder/italy')}
                        variant="contained"
                    >
                        START!!
                    </Button>
                </Grid>
            </Grid>
        </HeroPaper>
    )
}
export default Hero
