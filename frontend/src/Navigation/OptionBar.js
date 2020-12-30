import React  from 'react'

import './OptionBar.css'
import Button from './OptionButton'
import { useParams, useHistory } from 'react-router-dom'

const OptionBar = () => {
    let history = useHistory()
    const page = useParams().page

    const changePageHandler = (page) => {
        window.location.href = `/${page}`
    }
    
    return (
        <div className="option-bar">
            <Button className={page === 'home' ? 'option-button-clicked' : 'option-button'} link='/home'>Home</Button>
            <Button className={page === 'trending' ? 'option-button-clicked' : 'option-button'} link='/trending'>Trending</Button>
            <Button className={page === 'casual' ? 'option-button-clicked' : 'option-button'} link='/casual'>Casual</Button>
            <Button className={page === 'sports' ? 'option-button-clicked' : 'option-button'} link='/sports'>Sports</Button>

            {/* <Button className={page === 'home' ? 'option-button-clicked' : 'option-button'} onClick={changePageHandler('home')} >Home</Button>
            <Button className={page === 'trending' ? 'option-button-clicked' : 'option-button'} onClick={changePageHandler('trending')}>Trending</Button>
            <Button className={page === 'casual' ? 'option-button-clicked' : 'option-button'} onClick={changePageHandler('casual')}>Casual</Button>
            <Button className={page === 'sports' ? 'option-button-clicked' : 'option-button'} onClick={changePageHandler('sports')}>Sports</Button> */}

            {/* <button className={page === 'home' ? 'option-button-clicked' : 'option-button'} onClick ={changePageHandler('home')}>Home</button>
            <button className={page === 'trending' ? 'option-button-clicked' : 'option-button'} onClick ={changePageHandler('trending')}>Trending</button>
            <button className={page === 'casual' ? 'option-button-clicked' : 'option-button'} onClick ={changePageHandler('casual')}>Casual</button>
            <button className={page === 'sports' ? 'option-button-clicked' : 'option-button'} onClick ={changePageHandler('sports')}>Sports</button> */}

        </div>
    )
}

export default OptionBar