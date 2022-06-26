import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './PostCard.scss'
import { BsEmojiHeartEyes } from 'react-icons/bs'
import { BiCommentDots } from 'react-icons/bi'


export default function PostCard({ imgURL, userName, avatarURL, Ref }) {
    var divStyle = {
        backgroundImage: 'url(' + imgURL + ')'
    }

    return (
        <div className='postcard'>
            <div className='postcard__userDetails'>
                <img src={`${avatarURL}`} className='postcard__userDetails__dp' />
                <span className='postcard__userDetails__username'>
                    <Link className='postcard__userDetails__username__link' to={{ pathname: `/users/${userName}` }}>
                        {userName}
                    </Link >
                </span>
            </div>
            <div className='postcard__post' style={divStyle}></div>
            <div className='postcard__actions'>
                <span><BsEmojiHeartEyes className='postcard__actions__icon' /></span>
                <span><BiCommentDots className='postcard__actions__icon' /></span>
            </div>
        </div>
    )
}
