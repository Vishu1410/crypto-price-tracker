import React from 'react'

const SelectButton = ({children,selected, onClick}) => {
  return <span
        onClick={onClick}
        style={{
            border : "1px solid gold",
            borderRadius : "5px",
            padding : "10px 20px",
            cursor : "pointer",
            backgroundColor : selected ? "gold" : "transparent",
            color : selected ? "black" : "inherit",
            fontWeight : selected ? 700 : 500,
            width : "22%",
            textAlign : "center",
        }}
        >
            {children}
  </span>
   
}

export default SelectButton
