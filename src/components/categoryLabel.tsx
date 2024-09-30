import { useRouter } from 'next/router'
import React from 'react'

type props = {
    color: string,
    title: string,
    label: boolean,
    type?: string,
    createdBy: string
}

export default function CategoryLabel({ color, title, label, type, createdBy }: props) {

    const navigate = useRouter()

    const clickHandler = () => {
        if (type === "single") {
            navigate.push(`/categories?category=${title}&&id=${createdBy}`)
            localStorage.setItem("product_id", title)
        } else {
            navigate.push(`/categories?category=${title}&&id=${createdBy}`)
        }
    }

    return (
        <div className=' w-full ' >
            {!label && (
                <div className={` w-full h-[60px] flex text-white justify-between items-center bg-[#${color}] lg:pl-[32px] px-6 lg:pr-[55px] `} >
                    <p className=' font-bold lg:text-2xl ' >{title && title.toUpperCase()}</p>
                    <button onClick={() => clickHandler()} className=' font-semibold ' >See all {" >"}</button>
                </div>
            )}
            {label && (
                <div className=' w-full  text-black  lg:pl-[32px] lg:pt-4 px-6 lg:pr-[55px] ' >
                    <p className=' font-medium lg:flex hidden ' >Home <span className=' mx-2 ' >{" > "} </span> <span className=' text-[#E35C1B] ' >{title}</span></p>
                    <p className=' font-bold text-[1.125] lg:mt-4  ' >{title && title.toUpperCase()}</p>
                </div>
            )}
        </div>
    )
} 