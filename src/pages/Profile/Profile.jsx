import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './Profile.scss'

import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import { setUserData } from '../../store/storeSlice';
import PostCard from '../../components/PostCard/PostCard';

export default function Profile() {

    const params = useParams();
    const { userID } = params;
    const dispatch = useDispatch();

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BASE_URL}users/${userID}`, {
            headers: {
                'Authorization': `Client-ID ${process.env.REACT_APP_ACCESS_KEY}`
            }
        })
            .then((response) => {
                dispatch(setUserData(JSON.stringify(response.data)))
            })
            .catch((error) => {
                console.log(error)
            })
    }, [userID])

    return (
        <div className='profile'>
            <div className='profile__top'>
                <img className='profile__top__dp' src='https://images.unsplash.com/photo-1653587106660-4908e9a7bae7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzMzg3ODV8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NTYwOTQ3NzM&ixlib=rb-1.2.1&q=80&w=1080' />

                <div className='profile__top__details'>
                    <div className='profile__top__details__name'>{  }</div>
                    <div className='profile__top__details__username'>arn4b</div>
                    <div className='profile__top__details__stats'>
                        <span className='profile__top__details__stats__following'>Following: 105</span>
                        <span className='profile__top__details__stats__followers'>Follwers: 2333</span>
                        <span className='profile__top__details__stats__posts'>Posts: 21</span>
                    </div>

                    <div className='profile__top__details__socials'>
                        <span className='profile__top__details__socials__insta'>INSTA</span>
                        <span className='profile__top__details__socials__portfolio'>PORTF</span>
                        <span className='profile__top__details__socials__twitter'>TWTR</span>
                    </div>
                </div>
            </div>

            <div className='profile__feed'>
                <PostCard />
                <PostCard />
                <PostCard />
            </div>
        </div>
    )
}
