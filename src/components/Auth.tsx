import type { JSX } from 'react'
import { useState } from "react"

export default function Auth(): JSX.Element {
    return (
        <div className=' bg-transparent flex items-center justify-center w-full'>
            <button id='auth-button' className='flex items-center p-5 text-white bg-red-600 rounded-2xl font-bold cursor-pointer'>
                <img src="riot-logo.webp" alt="" className='w-7 mr-2' />
                <p>
                    Auth with riot
                </p>
            </button>
        </div>
    )
}