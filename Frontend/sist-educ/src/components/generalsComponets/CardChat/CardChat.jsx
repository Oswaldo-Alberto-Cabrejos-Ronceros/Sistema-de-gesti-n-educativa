import React from 'react'
import './CardChat.css'
import InputMessageChat from '../InputMessageChat/InputMessageChat';

function CardChat() {
    const fechaAct = new Date().toLocaleDateString();
  return (
    <div className='CardChatContainer'>
        <div className='CardChatFechaContainer'>
            <p className='PSm'>{fechaAct}</p>
        </div>
        <div className='CardChatFechaContent'>

        </div>
        <div className='CardChatInputContainer'>
        <InputMessageChat/>
        </div>
    </div>
  )
}

export default CardChat