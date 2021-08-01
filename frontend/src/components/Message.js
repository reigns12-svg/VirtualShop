import React from 'react'

const Message = ({color,bgcolor,children}) => {

    const mystyle = {
        color: `${color}`,
        backgroundColor: `${bgcolor}`,
        padding: "15px 30px 15px 30px" ,  
        borderRadius: "7px",    
        marginBottom:"10px", 
        width:"80%",
      };

    return (
        <div style={mystyle}>
            {children}
        </div>
    )
}

export default Message
