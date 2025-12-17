import Container from '@mui/material/Container'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import React from 'react'
import Carousel from './Carousel'


const BannerWrapper = styled("div")({
    backgroundImage : "url(./Banner2.jpg)",
    backgroundSize : "cover",
    backgroundPosition : "center"
})

const BannerContent = styled(Container)({

    height : 400,
    display : 'flex',
    flexDirection : 'column'
})

const TagLine = styled("div")({
    display : 'flex',
    height : '40%',
    flexDirection : 'column',
    textAlign : 'center',
    justifyContent : 'center'
})


const Banner = () => {
  return (
    <BannerWrapper>
        <BannerContent>
            <TagLine>
                <Typography variant='h2' sx={{fontWeight : "bold", mb : 2}}>
                    CRYPTO TRACKER
                </Typography>
                <Typography variant='subtitle' sx={{color : "darkgray", textTransform : "capitalize"}}>
                    Get all the Info regarding your favorite Crypto Currency
                </Typography>
            </TagLine>
            <Carousel/>
        </BannerContent>
    </BannerWrapper>
  )
}

export default Banner
