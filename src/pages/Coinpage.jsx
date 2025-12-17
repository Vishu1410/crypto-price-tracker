import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { singleCoin } from '../config/api'
import { useParams } from 'react-router-dom'
import LinearProgress from '@mui/material/LinearProgress'
import ReactHtmlParser from "html-react-parser"

import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { numberWithCommas } from '../components/Banner/Carousel'
import { CryptoState } from '../CryptoContext'
import CoinInfo from '../components/CoinInfo'


const Container = styled(Box)(({theme}) => ({
  display : 'flex',
  [theme.breakpoints.down("md")] : {
    flexDirection : "column",
    alignItems : "center"
  },
}))

const Sidebar = styled(Box)(({ theme }) => ({
  width : "30%",
  display : "flex",
  flexDirection : "column",
  alignItems : "center",
  marginTop : 25,
  borderRight : "2px solid grey",

  [theme.breakpoints.down("md")] : {
    width : "100%",
  },
}));


const Heading = styled(Typography)({
  fontWeight : "bold",
  marginBottom : 20,
})


const MarketData = styled(Box)(({theme}) => ({
  alignSelf : "flex-start",
  padding : 25,
  paddingTop : 10,
  width : "100%",
  [theme.breakpoints.down("md")] : {
    display : "flex",
    justifyContent : "space-around",
  },

  [theme.breakpoints.down("md")] : {
    flexDirection : "column",
    alignItems : "center",
  },

}))

const Description = styled(Typography)({
  width : "100%",
  padding : 25,
  
})

const Coinpage = () => {

  const { id } = useParams();

  const [coin,setCoin] = useState();

  const {symbol,currency} = CryptoState();

  const fetchDetails = async ()=>{
    const { data } = await axios(singleCoin(id))
    setCoin(data);
  }

  useEffect(()=>{
    fetchDetails()
  },[id])

  if(!coin){
    return <LinearProgress sx={{backgroundColor : "gold"}}/>
  }




  return (
    <Container>
      <Sidebar>
      <img
        src={coin.image.large}
        alt={coin.name}
        height="200"
        style = {{marginBottom : 20}}
      />

      <Heading variant='h3'>{coin.name}</Heading>

      <Description>{ReactHtmlParser(coin.description.en.split(". ")[0])}</Description>

      <MarketData>
        <Box sx={{display : 'flex',mb : 1}}>
          <Heading variant='h5'>Rank : </Heading>
          &nbsp; &nbsp;
          <Typography variant='h5'>{numberWithCommas(coin.market_cap_rank)}</Typography>

        </Box>

        <Box sx={{display : "flex",mb : 1}}>
          <Heading variant='h5'>Current Price : </Heading>
          &nbsp; &nbsp;

          <Typography variant='h5'>
            {symbol} {" "} {numberWithCommas(coin.market_data.current_price[currency.toLowerCase()])}
            
          </Typography>

        </Box>
        
        <Box sx={{display : "flex"}}>
          <Heading variant='h5'>Market Cap : </Heading>
          &nbsp; &nbsp;

          <Typography variant='h5'>
            {symbol} {" "} {numberWithCommas(coin.market_data.market_cap[currency.toLowerCase()].toString().slice(0,-6))}M
            
          </Typography>

        </Box>

      </MarketData>

      </Sidebar>
      
      <CoinInfo coin = {coin}/>
    </Container>
  )
}

export default Coinpage
