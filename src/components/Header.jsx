import React from 'react'
import AppBar from '@mui/material/AppBar'
import Container from '@mui/material/Container'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { CryptoState } from '../cryptoContext'


const darkTheme = createTheme({
  palette : {
    mode : "dark",
    primary : {
      main : "#ffffff"
    }
  }
})








const Header = () => {

  const {currency,setCurrency} = CryptoState();
  

  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar color='transparent' position='static'>
        <Container>
          <Toolbar>
            <Typography variant='h5' sx={{
              flex : 1,
              color : "gold",
              fontWeight : "bold",
              cursor : "pointer"
            }}>
              
              Crypto-Tracker
            </Typography >
            <Select
            variant='outlined'
            style={{ width: 100, height: 40, marginLeft: 15,border:"white" }}
            value={currency}
            onChange={(e)=>setCurrency(e.target.value)}>
              <MenuItem value = {"USD"}>USD</MenuItem>
              <MenuItem value = {"INR"}>INR</MenuItem>
              
            </Select>
          </Toolbar>
        </Container>
      </AppBar>
      </ThemeProvider>
    
  )
}

export default Header
