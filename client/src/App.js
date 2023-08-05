import React, { useEffect, useState } from 'react'
import io from 'socket.io-client'
const App = () => {

  const socket = io.connect("http://localhost:4002")

  const [room,setRoom] = useState("");
  const [msg,setMsg] = useState("");
  const [output,setOutput] = useState("");

  const handleRoomJoin = () =>{
    if(room !==""){
      socket.emit('join_room', room)
    }
  }

  const handleSendMessage = () =>{
    socket.emit("send-message", {msg,room})

  }


  useEffect(()=>{
   socket.on("receive-msg", msg =>{
    setOutput(msg)
   })

  }, [socket])


  return (
    <div className='App' style ={{display: "flex", flexDirection : "column", justifyContent : "space-evenly", margin : "3rem"}}>
      <div className='room-container'>
        <input type="text" placeholder='Enter Room' onChange={e=>setRoom(e.target.value)}></input>
        <button onClick = {handleRoomJoin}>Join Room</button>
      </div>

      <div className='Message'>
        <input type="text" placeholder='Enter Message' onChange={e=>setMsg(e.target.value)}></input>
        <button onClick={handleSendMessage}>Send Message</button>
      </div>

      <div className='DisplayMessage'>
       {output && <p>{output}</p>}
      </div>
      
    </div>
  )
}

export default App 

