import React from 'react'
import { useParams } from 'react-router-dom'

import ProductList from '../Lists/ProductList'

export const PRODUCTS_HOME = [
    {
        productId: 1,
        model: "Air",
        brand: "Nike",
        image: "/images/NikeAir.png",
        amount: 2399,
        sidebarColor: "black"
    },
    {
        productId: 15,
        model: "Jordan",
        brand: "Nike",
        image: "/images/trending/NikeJordan.png",
        amount: 1999,
        sidebarColor: "black"
    }, 
    {
        productId: 9,
        model: "Training Shoes",
        brand: "Puma",
        image: "/images/sports/PumaTrainingShoes.png",
        amount: 3145,
        sidebarColor: "black"
    },
    {
        productId: 20,
        model: "Sneakers",
        brand: "Nike",
        image: "/images/casual/NikeSneakers.png",
        amount: 2199,
        sidebarColor: "#9b111e"
    },
    {
        productId: 18,
        model: "Zoom",
        brand: "Nike",
        image: "/images/trending/NikeZoom.png",
        amount: 2399,
        sidebarColor: "#f88379"
    },
    {
        productId: 8,
        model: "Momenta",
        brand: "Puma",
        image: "/images/sports/PumaMomenta.png",
        amount: 2149,
        sidebarColor: "grey"
    },
    {
        productId: 11,
        model: "SF-AF1",
        brand: "Nike",
        image: "/images/casual/NikeSF-AF1.png",
        amount: 2399,
        sidebarColor: "dark blue"
    },
    {
        productId: 10,
        model: "Casual",
        brand: "Nike",
        image: "/images/casual/NikeCasual.png",
        amount: 2399,
        sidebarColor: "dark blue"
    },
    {
        productId: 6,
        model: "Ferrari",
        brand: "Puma",
        image: "/images/sports/PumaFerrari.png",
        amount: 2149,
        sidebarColor: "red"
    },
    {
        productId: 3,
        model: "Flywire",
        brand: "Nike",
        image: "/images/sports/NikeFlywireShoe.png",
        amount: 3145,
        sidebarColor: "grey"
    },
    {
        productId: 2,
        model: "Air-Max",
        brand: "Nike",
        image: "/images/NikeAirMax.png",
        amount: 1999,
        sidebarColor: "red"
    },
    {
        productId: 12,
        model: "Activewear",
        brand: "Puma",
        image: "/images/casual/PumaActivewear.png",
        amount: 1999,
        sidebarColor: "#f88379"
    },
    {
        productId: 14,
        model: "Suga",
        brand: "Puma",
        image: "/images/casual/PumaSuga.png",
        amount: 1999,
        sidebarColor: "#f88379"
    },
    {
        productId: 16,
        model: "Classic",
        brand: "Reebok",
        image: "/images/trending/ReebokClassic.png",
        amount: 1999,
        sidebarColor: "black"
    },
    {
        productId: 21,
        model: "AirJordan", 
        brand: "Nike",
        image: "/images/casual/NikeAirJordan.png",
        amount: 2599,
        sidebarColor: "#f88379"
    },
    {
        productId: 13,
        model: "SuedeSneakers",
        brand: "Puma",
        image: "/images/casual/PumaSuedeSneakers.png",
        amount: 2399,
        sidebarColor: "#ff69b4"
    },
    {
        productId: 17,
        model: "Sneakers",
        brand: "Reebok",
        image: "/images/trending/ReebokSneakers.png",
        amount: 1999,
        sidebarColor: "grey"
    },
    {
        productId: 4,
        model: "Gradient",
        brand: "Nike",
        image: "/images/sports/NikeGradient.png",
        amount: 2799,
    },
    {
        productId: 5,
        model: "Impact",
        brand: "Nike",
        image: "/images/sports/NikeImpact.png",
        amount: 3145,
        sidebarColor: "#ffa500"
    },
    {
        productId: 19,
        model: "Skate",
        brand: "UnderArmour",
        image: "/images/trending/UnderArmourSkate.png",
        amount: 2399,
        sidebarColor: "grey"
    }    
]

const PRODUCTS_TRENDING = [
    {
        productId: 1,
        model: "Air",
        brand: "Nike",
        image: "/images/NikeAir.png",
        amount: 2399,
        sidebarColor: "black"
    },
    {
        productId: 15,
        model: "Jordan",
        brand: "Nike",
        image: "/images/trending/NikeJordan.png",
        amount: 1999,
        sidebarColor: "black"
    }, 
    {
        productId: 19,
        model: "Skate",
        brand: "UnderArmour",
        image: "/images/trending/UnderArmourSkate.png",
        amount: 2399,
    },
    {
        productId: 18,
        model: "Zoom",
        brand: "Nike",
        image: "/images/trending/NikeZoom.png",
        amount: 2399,
        sidebarColor: "#f88379"
    },
    {
        productId: 16,
        model: "Classic",
        brand: "Reebok",
        image: "/images/trending/ReebokClassic.png",
        amount: 1999,
        sidebarColor: "black"
    },
    
    {
        productId: 17,
        model: "Sneakers",
        brand: "Reebok",
        image: "/images/trending/ReebokSneakers.png",
        amount: 1999,
        sidebarColor: "grey"
    },
]

const PRODUCTS_CASUAL = [
    {
        productId: 2,
        model: "Air Max",
        brand: "Nike",
        image: "/images/NikeAirMax.png",
        amount: 1999,
        sidebarColor: "red"
    },
    {
        productId: 10,
        model: "Casual",
        brand: "Nike",
        image: "/images/casual/NikeCasual.png",
        amount: 2399,
        sidebarColor: "blue"
    },
    {
        productId: 11,
        model: "SF-AF1",
        brand: "Nike",
        image: "/images/casual/NikeSF-AF1.png",
        amount: 2399,
        sidebarColor: "dark blue"
    },
    {
        productId: 12,
        model: "Activewear",
        brand: "Puma",
        image: "/images/casual/PumaActivewear.png",
        amount: 1999,
        sidebarColor: "#f88379"
    },
    {
        productId: 14,
        model: "Suga",
        brand: "Puma",
        image: "/images/casual/PumaSuga.png",
        amount: 1999,
        sidebarColor: "#f88379"
    },
    {
        productId: 13,
        model: "SuedeSneakers",
        brand: "Puma",
        image: "/images/casual/PumaSuedeSneakers.png",
        amount: 2399,
    },
    {
        productId: 20,
        model: "Sneakers",
        brand: "Nike",
        image: "/images/casual/NikeSneakers.png",
        amount: 2199,
        sidebarColor: "#9b111e"
    },
    {
        productId: 21,
        model: "AirJordan", 
        brand: "Nike",
        image: "images/casual/NikeAirJordan.png",
        amount: 2599,
        sidebarColor: "#f88379"
    }
]

const PRODUCTS_SPORTS = [
    {
        productId: 3,
        model: "Flywire",
        brand: "Nike",
        image: "/images/sports/NikeFlywireShoe.png",
        amount: 3145,
    },
    {
        productId: 4,
        model: "Gradient",
        brand: "Nike",
        image: "/images/sports/NikeGradient.png",
        amount: 2799,
    },
    {
        productId: 6,
        model: "Ferrari",
        brand: "Puma",
        image: "/images/sports/PumaFerrari.png",
        amount: 2149,
        sidebarColor: "red"
    },
    {
        productId: 5,
        model: "Impact",
        brand: "Nike",
        image: "/images/sports/NikeImpact.png",
        amount: 3145,
        sidebarColor: "#ffa500"
    },
    {
        productId: 8,
        model: "Momenta",
        brand: "Puma",
        image: "/images/sports/PumaMomenta.png",
        amount: 2149,
    },
    {
        productId: 9,
        model: "Training Shoes",
        brand: "Puma",
        image: "/images/sports/PumaTrainingShoes.png",
        amount: 3145,
    }
]

const ProductHome = props => {
    let page = useParams().page
    
    let listname

    if(page === 'home'){
        listname = PRODUCTS_HOME
    }
    else if(page === 'trending') {
        listname = PRODUCTS_TRENDING
    }
    else if (page === 'casual') {
        listname = PRODUCTS_CASUAL
    }
    else {
        listname = PRODUCTS_SPORTS
    }

    console.log(page)
    
    return (
        <ProductList productList={listname}/>
    )
}

export default ProductHome