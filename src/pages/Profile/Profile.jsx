import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './Profile.scss'

import { BsInstagram, BsTwitter, BsGlobe } from 'react-icons/bs'


import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { setUserData, selectUserData } from '../../store/storeSlice';
import Loading from '../../components/Loading/Loading';
// import PostCard from '../../components/PostCard/PostCard';

const LazyPost = React.lazy(() => import('../../components/PostCard/PostCard'))

export default function Profile() {

    const user = useSelector(selectUserData)

    const [loading, setLoading] = useState(true)
    const [error, setError] = useState({})

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
                dispatch(setUserData(response.data))
                setLoading(false)
            })
            .catch((error) => {
                setError(error.response.data)
                setLoading(false)
            })
    }, [userID])

    return (
        <div className='profile'>
            {loading
                ?
                <Loading />
                :
                <div className='profile'>
                    {
                        user ?
                            <div>
                                <div className='profile__top'>
                                    <img className='profile__top__dp' src={`${user.profile_image.large}`} />

                                    <div className='profile__top__details'>
                                        <div className='profile__top__details__name'>{user.name}</div>
                                        <div className='profile__top__details__username'>@{user.username}</div>
                                        <div className='profile__top__details__bio'>{user.bio}</div>
                                        <div className='profile__top__details__stats'>
                                            <span className='profile__top__details__stats__following'>Following
                                                <span className='profile__top__details__stats__following__count'>
                                                    {user.following_count}
                                                </span>
                                            </span>
                                            <span className='profile__top__details__stats__followers'>Followers
                                                <span className='profile__top__details__stats__following__count'>
                                                    {user.followers_count}
                                                </span>
                                            </span>
                                            <span className='profile__top__details__stats__posts'>Posts
                                                <span className='profile__top__details__stats__following__count'>
                                                    {user.photos.length}
                                                </span>
                                            </span>
                                        </div>

                                        <div className='profile__top__details__socials'>
                                            {
                                                user.instagram_username &&
                                                <span className='profile__top__details__socials__insta'>
                                                    <a href={`https://www.instagram.com/${user.instagram_username}`}>
                                                        <BsInstagram />
                                                    </a>
                                                </span>
                                            }
                                            {

                                                user.portfolio_url &&
                                                <span className='profile__top__details__socials__portfolio'>
                                                    <a href={user.portfolio_url}>
                                                        <BsGlobe />
                                                    </a>
                                                </span>
                                            }
                                            {
                                                user.twitter_username &&
                                                <span className='profile__top__details__socials__twitter'>
                                                    <a href={`https://www.twitter.com/${user.twitter_username}`}>
                                                        <BsTwitter />
                                                    </a>
                                                </span>
                                            }
                                        </div>
                                    </div>
                                </div>

                                <div className='profile__feed'>
                                    {
                                        Object.values(user.photos).map((userDetails, index) => {
                                            return (
                                                <LazyPost userName={userID} key={userDetails.id} imgURL={userDetails.urls.regular} avatarURL={user.profile_image.small} />
                                            );
                                        })
                                    }
                                </div>
                            </div>
                            :

                            <h1 className='profile'>{error}</h1>
                    }
                </div>
            }
        </div>
    )
}
