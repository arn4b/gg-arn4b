import React from 'react'
import { AiOutlineLoading } from 'react-icons/ai'
import './Loading.scss'

export default function Loading() {
    return (
        <div className='loading'>
            <AiOutlineLoading className='loading__loader' />
        </div>

    )
}
