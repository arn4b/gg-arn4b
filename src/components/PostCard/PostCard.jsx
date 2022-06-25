import React, { useState, useEffect } from 'react'
import './PostCard.scss'


export default function PostCard() {
    return (
        <div className='postcard'>
            <div className='postcard__userDetails'>
                <img src='https://images.unsplash.com/photo-1653587106660-4908e9a7bae7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzMzg3ODV8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NTYwOTQ3NzM&ixlib=rb-1.2.1&q=80&w=1080' className='postcard__userDetails__dp' />
                <span className='postcard__userDetails__username'>hey.arn4b</span>
            </div>
            <img className='postcard__post' src="https://images.unsplash.com/photo-1655365225179-fbc453d3bd58?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzMzg3ODV8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NTYwOTEzMTg&ixlib=rb-1.2.1&q=80&w=1080" alt="" />
            <div className='postcard__actions'>
                <span>Like</span>
                <span>Comment</span>
            </div>
        </div>
    )
}
