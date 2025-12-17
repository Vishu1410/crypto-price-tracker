import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { coinlist } from '../config/api'
import { CryptoState } from '../CryptoContext'

import TableContainer from '@mui/material/TableContainer'
import Table from '@mui/material/Table'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import TableBody from '@mui/material/TableBody'
import Paper from '@mui/material/Paper'
import { useNavigate } from 'react-router-dom'
import Typography from '@mui/material/Typography'
import { numberWithCommas } from './Banner/Carousel'
import { createTheme, styled, ThemeProvider } from '@mui/material/styles'
import LinearProgress from '@mui/material/LinearProgress'
import Pagination from '@mui/material/Pagination'
import Container from '@mui/material/Container'
import TextField from '@mui/material/TextField'


const StyledRow = styled(TableRow)({
  backgroundColor: "#16171a",
  cursor: "pointer",
  fontFamily: "Montserrat",
  "&:hover": {
    backgroundColor: "#131111",
  },
})

const darkTheme = createTheme({
  palette : {
    mode : "dark",
    primary : {
      main : "#ffffff"
    }
  }
})



const CoinTable = () => {

    const [loading,setLoading] = useState(false)
    const { currency, symbol } = CryptoState();
    const [coins,setCoins] = useState([])
    const [page,setPage] = useState(1);
    const [search,setSearch] = useState("")

    const navigate = useNavigate();

    const fetchDetails = async ()=>{
        setLoading(true)
        const { data } = await axios.get(coinlist(currency));
        setCoins(data);
        setLoading(false)
    }

    useEffect(()=>{
        fetchDetails()
    },[currency])

    const handleSearch = () =>
      coins.filter(
        (coin) =>
          coin.current_price !== null &&
          coin.price_change_percentage_24h !== null &&
          (coin.name.toLowerCase().includes(search) ||
            coin.symbol.toLowerCase().includes(search))
      );
      


    return (
     <ThemeProvider theme={darkTheme}>
      <Container sx={{textAlign : "center"}}>
        <Typography variant='h4' sx={{m:2}}>
          Cryptocurrency Price by Market Cap
        </Typography>

        <TextField
          label = "Search for a cryptocurrency"
          variant='outlined'
          sx={{mb : 2,width : "100%"}}
          onChange={(e)=>setSearch(e.target.value)}

        />




      <TableContainer component={Paper}>
      {loading ? (
        <LinearProgress sx={{backgroundColor : "gold"}}/>
      ) : (
        <Table>
        <TableHead sx={{ backgroundColor: "#EEBC1D" }}>
          <TableRow>
            {["Coin","Price","24h Change","Market Cap"].map((head) => (
                <TableCell key={head} align={head === "Coin" ? "left" : "right"}
                sx={{
                    color : "black",
                    fontWeight : 700
                }}>
                    {head}
                </TableCell>
            ))}
          </TableRow>
        </TableHead>

        <TableBody>
            { handleSearch().slice((page-1)*10,page*10).map((row)=>{
              const priceChange = row.price_change_percentage_24h ?? 0;
              const profit = priceChange > 0;
              return (
                <StyledRow key = {row.id} onClick = {()=> navigate(`/coins/${row.id}`)}>
                  <TableCell sx={{display : "flex", gap : 2}}>
                    <img src= {row.image} alt= {row.name} height="50" />
                    <div>
                      <Typography sx={{textTransform : "uppercase",fontSize : 22}}> {row.symbol} 
                      </Typography>
                      <Typography sx={{color : 'darkgray'}}>
                        {row.name}
                      </Typography>
                    </div>
                  </TableCell>

                  <TableCell>
                    {symbol} {" "} {numberWithCommas(
                                      row.current_price !== null
                                        ? row.current_price.toFixed(2)
                                        : "0.00"
                                    )}

                  </TableCell>

                  <TableCell align='right' sx={{color : profit ? "rgb(14,203,129)" : "red", fontWeight : '500'}}>
                    {profit && "+"} {priceChange.toFixed(2)}%
                  </TableCell>

                  <TableCell align='right'>
                    {symbol} {" "} {numberWithCommas(row.market_cap.toString().slice(0,-6))} M

                  </TableCell>


                </StyledRow>
              )
            })
            }
          
        </TableBody>
      </Table>
      
      )}
    </TableContainer>

    <Pagination count={Math.ceil(handleSearch().length/10)} sx={{
            p: 2,
            display: "flex",
            justifyContent: "center",
            "& .MuiPaginationItem-root": {
              color: "gold",
            },
          }}  onChange={(_, value) => {
            setPage(value);
            window.scrollTo(0, 450);
          }}>
      
    </Pagination>

      </Container>
     </ThemeProvider>

      );
}

export default CoinTable
