import React from 'react'
import { useLocation, useParams } from 'react-router-dom'

export default function SentimentDetail() {
    const { title } = useParams();
    const { state } = useLocation()
    console.log(title);
    console.log(state);

  return (
    <div>
        
    </div>
  )
}
