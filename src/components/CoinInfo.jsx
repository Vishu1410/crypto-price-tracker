import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { historicChart } from '../config/api'
import { CryptoState } from '../CryptoContext'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import Container from '@mui/material/Container'
import CircularProgress from '@mui/material/CircularProgress'
import {Line} from "react-chartjs-2"
import { chartDays } from '../config/date'
import SelectButton from './SelectButton'
import Box from '@mui/material/Box'

const darkTheme = createTheme({
    palette : {
        mode : "dark",
        primary : {
            main : "#ffffff",
        }
    }
})

const CoinInfo = ({coin}) => {
    const [historicData,setHistoricData] = useState(null);
    const [loading,setLoading] = useState(false);
    const [days,setDays] = useState(1);
    const {currency} = CryptoState()


    const fetchDetails = async ()=>{
        setLoading(true)
        const {data} = await axios.get(historicChart(coin.id,days,currency))

        setHistoricData(data.prices)
        setLoading(false);
    }

    useEffect(()=>{
        fetchDetails()
    },[days,currency])


  return (
    <ThemeProvider theme={darkTheme}>
        <Container>
            {loading || !historicData ? (
                <CircularProgress sx={{color :"gold" }} size={250} thickness={1}/>
                    
                
            ) : (<>
                <Line data={{
                    labels  : historicData.map((point)=>{
                        const date = new Date(point[0]);

                        if(days === 1){
                            const hours = date.getHours();
                            const minutes = date.getMinutes();

                            const suffix = hours >= 12 ? "PM" : "AM"

                            const formattedHours = hours > 12 ? hours - 12 : hours;

                            return `${formattedHours} : ${minutes.toString().padStart(2,"0")} ${suffix}`
                        }
                        return date.toLocaleDateString();
                    }),

                    datasets : [{
                        data : historicData.map((point) => point[1]),
                        label : `Price (Past ${days} Days) in ${currency}`, 
                        borderColor: "#EEBC1D",
                    }],

                }}
                options={{
                    responsive : true,
                    elements : {
                        point : {
                            radius : 1,
                        },
                    },
                }}/>

                <Box
                 sx = {{
                    display : "flex",
                    marginTop : 2,
                    justifyContent : "space-around",
                    width : "100%"

                }}>
                    {chartDays.map((day) => (
                        <SelectButton 
                            key={day.label}
                            selected={day.value === days}
                            onClick={()=>setDays(day.value)}    
                        >{day.label}</SelectButton>
                    ))}
                </Box>

            </>)}
        </Container>
    </ThemeProvider>
  )
}

export default CoinInfo
