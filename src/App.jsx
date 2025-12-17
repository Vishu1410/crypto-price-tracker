import { Route, Routes} from "react-router-dom"
import './App.css'
import Header from './components/Header'
import Homepage from "./pages/Homepage"
import Coinpage from "./pages/Coinpage"
import { styled } from "@mui/material/styles"

const AppContainer = styled("div")({
  backgroundColor: "#14161a",
  color: "white",
  minHeight: "100vh",
});

function App() {


 return (

    <AppContainer>
    
      <Header/>
      <Routes>
        <Route path="/" Component={Homepage}/>
        <Route path="/coins/:id" Component={Coinpage}/>
      </Routes>
      </AppContainer>
      
   
  )
}

export default App
