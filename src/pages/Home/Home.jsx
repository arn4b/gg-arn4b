import React, { useState, useEffect, Suspense, useRef, useCallback } from 'react'
import axios from 'axios'

import './Home.scss'

import { useDispatch, useSelector } from 'react-redux';

import { setFeed, selectFeedData } from '../../store/storeSlice';
import Loading from '../../components/Loading/Loading';

const LazyPost = React.lazy(() => import('../../components/PostCard/PostCard'))

export default function Home() {

    const posts = useSelector(selectFeedData)

    const dispatch = useDispatch();

    // -------------- infinite scrolling--------------------//
    const observer = useRef();

    const lastFeedRef = useCallback(
        (node) => {
            if (observer.current) observer.current.disconnect();
            observer.current = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting) {
                    console.log('Intersecting');
                    getFeedState()
                }
            });
            if (node) observer.current.observe(node);
        },
        []
    );

    // -----------------------------------------------------------------------//

    const [loading, setLoading] = useState(true)

    function getFeedState() {
        axios.get(`${process.env.REACT_APP_BASE_URL}photos/random?count=10`, {
            headers: {
                'Authorization': `Client-ID ${process.env.REACT_APP_ACCESS_KEY}`
            }
        })
            .then((response) => {
                dispatch(setFeed(response.data))
                setLoading(false)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    useEffect(() => {
        if (selectFeedData === null)
            getFeedState();
        else
            setLoading(false)
    }, [])

    return (
        <div className='home'>
            {
                loading
                    ?
                    <Loading />
                    :
                    Object.values(posts).map((post, index) => {
                        return (
                            <LazyPost Ref={lastFeedRef} userName={post.user.username} key={post.id} imgURL={post.urls.regular} avatarURL={post.user.profile_image.small} />
                        );
                    })
            }
        </div>
    )
}
