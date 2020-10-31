import React  from 'react'

import './OptionBar.css'
import Button from './OptionButton'
import { useParams } from 'react-router-dom'

const OptionBar = () => {
    const page = useParams().page
    
    return (
        <div className="option-bar">
            <Button className={page === 'home' ? 'option-button-clicked' : 'option-button'} link='/home'>Home</Button>
            <Button className={page === 'trending' ? 'option-button-clicked' : 'option-button'} link='/trending'>Trending</Button>
            <Button className={page === 'casual' ? 'option-button-clicked' : 'option-button'} link='/casual'>Casual</Button>
            <Button className={page === 'sports' ? 'option-button-clicked' : 'option-button'} link='/sports'>Sports</Button>
        </div>
    )
}

export default OptionBar