import { Option, Select } from '@material-tailwind/react'
import React from 'react'

const Categories = ({ category, handleChange }) => {
    return (
        <div className="flex justify-center">
            <div className="w-72 mt-9 mb-6">
                <Select variant="static" value={category} onChange={handleChange} label="Categories">
                    <Option value="all">All</Option>
                    <Option value="men's">Men's Fashion</Option>
                    <Option value="women's">Women's Fashion</Option>
                    <Option value="electronics">Electronics</Option>
                </Select>
            </div>
        </div>
    )
}

export default Categories