import React from 'react';
import { TERipple } from "tw-elements-react";

const Card = ({ imageCover, price, Delete, id, title, count }) => {


    return (
        <div className="flex flex-col md:flex-row gap-6 md:gap-0 md:justify-between items-center border-2 px-5 py-3 rounded-md">
            <img src={imageCover} className='w-full md:w-[200px] rounded-md' alt="" />

            <div className="flex flex-col items-center">
                <h3 className='font-bold text-[#198754]'>{title.split(" ").slice(0, 5).join(" ")}</h3>
                <h3 className='font-bold'>price: {price}</h3>
                <h3 className='font-bold'>count: {count}</h3>
            </div>
            <div className="flex flex-col items-center gap-3">
                <TERipple>
                    <button
                        onClick={() => { Delete(id) }}
                        type="button"
                        className="inline-block font-semibold rounded border-2 border-danger px-6 pb-[6px] pt-2 text-xs uppercase leading-normal text-danger transition duration-150 ease-in-out hover:border-danger-600 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-danger-600 focus:border-danger-600 focus:text-danger-600 focus:outline-none focus:ring-0 active:border-danger-700 active:text-danger-700 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10"
                    >
                        Remove
                    </button>
                </TERipple>
            </div>
        </div>
    )
}

export default Card;