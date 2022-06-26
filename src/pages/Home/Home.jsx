import React, { useState, useEffect, Suspense, useRef, useCallback } from 'react'
import axios from 'axios'

import './Home.scss'

import { useDispatch, useSelector } from 'react-redux';

import { setFeed, selectFeedData, appendFeed } from '../../store/storeSlice';
import Loading from '../../components/Loading/Loading';

const LazyPost = React.lazy(() => import('../../components/PostCard/PostCard'))

export default function Home() {

    const posts = useSelector(selectFeedData)

    const dispatch = useDispatch();

    // INFINIE SCROLL IMPLEMENTATION

    const observer = useRef();

    const lastFeedRef = useCallback(
        (node) => {
            if (observer.current) observer.current.disconnect();
            observer.current = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting) {
                    getFeedState()
                }
            });
            if (node) observer.current.observe(node);
        },
        []
    );

    const [loading, setLoading] = useState(true)

    const [error, setError] = useState({})

    function getFeedState() {
        axios.get(`${process.env.REACT_APP_BASE_URL}photos/random?count=10`, {
            headers: {
                'Authorization': `Client-ID ${process.env.REACT_APP_ACCESS_KEY}`
            }
        })
            .then((response) => {
                if (posts == null) {
                    dispatch(setFeed(response.data))
                    console.log("posts null");
                    setLoading(false)
                }
                else {
                    console.log("posts not null");
                    dispatch(appendFeed(response.data))
                }
            })
            .catch((error) => {
                setError(error.response.data)
                setLoading(false)
            })
    }

    useEffect(() => {
        if (posts == null) {
            getFeedState()
        }
        else {
            setLoading(false)
        }
    }, [])

    return (
        <div className='home'>
            {
                loading
                    ?
                    <Loading />
                    :
                    <div className='home'>
                        {
                            posts
                                ?
                                Object.values(posts).map((post, index) => {
                                    if (Object.values(posts).length === index + 1) {
                                        return (
                                            <Suspense fallback={<Loading />}>
                                                <LazyPost
                                                    Ref={lastFeedRef}
                                                    userName={post.user.username}
                                                    key={post.id}
                                                    imgURL={post.urls.regular}
                                                    avatarURL={post.user.profile_image.small}
                                                />
                                            </Suspense>
                                        );
                                    } else {
                                        return (
                                            <Suspense fallback={<Loading />}>
                                                <LazyPost
                                                    userName={post.user.username}
                                                    key={post.id}
                                                    imgURL={post.urls.regular}
                                                    avatarURL={post.user.profile_image.small}
                                                />
                                            </Suspense>
                                        );
                                    }
                                })
                                :
                                <h1>{error}</h1>
                        }
                    </div>
            }
        </div>
    )
}
