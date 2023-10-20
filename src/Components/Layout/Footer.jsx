import { Button, Input } from '@material-tailwind/react';
import React from 'react';
import { TEInput } from "tw-elements-react";

const Footer = () => {
    return (
        <footer className='bg-[#eee]'>
            <div className="pt-5 px-4 lg:px-24">
                <h1 className='text-3xl font-semibold mb-3'>Get The FreshCart App</h1>
                <p className=' text-zinc-400 mb-4'>We will send you a link, Open it in your phone to download App</p>
                <div className="grid md:grid-cols-3 gap-5">
                    <div className="email md:col-span-2">
                        <Input label="Email" color='green' />
                    </div>
                    <Button className='bg-[#198754]'>
                        Share App Link
                    </Button>
                </div>
            </div>
            <p className="py-5 text-center text-blue-gray-50 bg-[#198754] border-t-2 mt-5">© freshCart, All Right Reserved. Made By <span className='font-bold'>Elsayed Kewan</span></p>
        </footer>
    )
}

export default Footer