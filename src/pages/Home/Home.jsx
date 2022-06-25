import React, { useState, useEffect } from 'react'
import axios from 'axios'

import { useDispatch } from 'react-redux';

import { setFeed } from '../../store/storeSlice';
import PostCard from '../../components/PostCard/PostCard';

export default function Home() {

    const dispatch = useDispatch();

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BASE_URL}photos/random?count=10`, {
            headers: {
                'Authorization': `Client-ID ${process.env.REACT_APP_ACCESS_KEY}`
            }
        })
            .then((response) => {
                dispatch(setFeed(JSON.stringify(response.data)))
            })
            .catch((error) => {
                console.log(error)
            })
    }, [])

    return (
        <div>
            <PostCard />
        </div>
    )
}
