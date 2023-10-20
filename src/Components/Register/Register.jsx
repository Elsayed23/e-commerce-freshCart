import React from 'react';
import { Link } from 'react-router-dom';
import { TEInput, TERipple } from "tw-elements-react";
import { useFormik } from 'formik';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Alert from './Alert';
import Title from '../PageTitle';


const Register = () => {


    const [alreadyExists, setAlreadyExists] = React.useState("")
    const [showPassword, setShowPassword] = React.useState(false);
    const [showRePassword, setShowRePassword] = React.useState(false);

    const RegisterData = {
        name: "",
        email: "",
        phone: "",
        password: "",
        rePassword: "",
    }

    const navigate = useNavigate()

    async function newUser(values) {
        try {
            const { data } = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signup", values)
            if (data.message === "success") {
                navigate("/login")
            }
        } catch (error) {
            setAlreadyExists(error.response.data.message)
        }

    }

    let formik = useFormik({
        initialValues: RegisterData,
        onSubmit: (values) => {
            newUser(values)
        },
        validate: (values) => {

            let errors = {};

            const { name, email, phone, password, rePassword } = values;

            if (name.length < 3) {
                errors.name = "Name must be more than 4 characters"
            } else if (name.length > 15) {
                errors.name = "Name must be less than 15 characters"
            }
            if (!email.includes("@") || !email.includes(".")) {
                errors.email = "Email not valid"
            }
            if (!phone.match(/^01[0125][0-9]{8}$/)) {
                errors.phone = "Phone number not matched"
            }
            if (password.length < 5) {
                errors.password = "Password must be more than 5 characters"
            } else if (password.length > 16) {
                errors.password = "Password must be less than 16 characters"
            }
            if (rePassword !== password) {
                errors.rePassword = "rePassword not matched"
            }

            return errors
        }
    })


    return (
        <section className="py-16">
            <Title title="Register" />
            <div className="h-full flex flex-col justify-center items-center">
                <h1 className='text-4xl mb-5 text-[#198754] font-semibold'>Registeration</h1>
                <div className="w-full md:w-3/4 px-5">
                    {alreadyExists && <Alert msg={alreadyExists} />}
                    <form onSubmit={formik.handleSubmit}>
                        <div className="mb-7 relative ">
                            <TEInput
                                type="text"
                                label="Your Name"
                                className={`duration-0`}
                                size="lg"
                                name='name'
                                value={formik.values.name}
                                onChange={formik.handleChange}
                            ></TEInput>
                            {formik.errors.name && formik.touched.name && <h5 className=" text-red-600 absolute text-sm">{formik.errors.name}</h5>}
                        </div>

                        <div className="mb-7 relative">
                            <TEInput
                                type="email"
                                label="Email Address"
                                className={`duration-0`}
                                size="lg"
                                name='email'
                                value={formik.values.email}
                                onChange={formik.handleChange}
                            ></TEInput>

                            {formik.errors.email && formik.touched.email && <h5 className=" text-red-600 absolute text-sm">{formik.errors.email}</h5>}
                        </div>

                        <div className="mb-7 relative">
                            <TEInput
                                type="text"
                                label="Your Phone"
                                className={`duration-0`}
                                size="lg"
                                name='phone'
                                value={formik.values.phone}
                                onChange={formik.handleChange}
                            ></TEInput>
                            {formik.errors.phone && formik.touched.phone && <h5 className=" text-red-600 absolute text-sm">{formik.errors.phone}</h5>}
                        </div>

                        <div className="mb-7 relative">
                            <TEInput
                                type={`${showPassword ? 'text' : 'password'}`}
                                label="Password"
                                className={`duration-0`}
                                size="lg"
                                name='password'
                                value={formik.values.password}
                                onChange={formik.handleChange}
                            ></TEInput>
                            <div className="absolute right-3 top-2/4 -translate-y-2/4">
                                <div className={`eye ${!showPassword ? 'slash' : ''} w-[1.50em] h-[1em] relative cursor-pointer before:absolute before:top-[50%] before:left-[50%] before:translate-x-[-50%] before:translate-y-[-50%] before:w-[0.35em] before:h-[0.35em] before:bg-[var(--color)] before:border-[0.1em] before:border-[var(--background)] before:z-[1] before:rounded-[100%] after:absolute after:top-[.1em] after:left-[calc(36.333%-0.15em)] after:w-[68%] after:h-[.1em] after:bg-[var(--color)] after:border-t-[.1em] after:border-t-[var(--background) after:z-[2] after:transition-transform duration-[.25s]`} onClick={() => { setShowPassword(prev => !prev) }}>
                                    <div className='overflow-hidden h-[50%] relative mb-[-.5px] before:bg-[currentColor] before:absolute before:left-0 before:right-0 before:h-[300%] before:rounded-[100%]'></div>
                                    <div className='overflow-hidden h-[50%] relative mb-[-.5px] before:bg-[currentColor] before:absolute before:left-0 before:right-0 before:h-[300%] before:rounded-[100%] before:bottom-0'></div>
                                </div>
                            </div>
                            {formik.errors.password && formik.touched.password && <h5 className=" text-red-600 absolute text-sm">{formik.errors.password}</h5>}
                        </div>

                        <div className="mb-7 relative">
                            <TEInput
                                type={`${showRePassword ? 'text' : 'password'}`}
                                label="rePassword"
                                className={`duration-0`}
                                size="lg"
                                name='rePassword'
                                value={formik.values.rePassword}
                                onChange={formik.handleChange}
                            ></TEInput>
                            <div className="absolute right-3 top-2/4 -translate-y-2/4">
                                <div className={`eye ${!showRePassword ? 'slash' : ''} w-[1.50em] h-[1em] relative cursor-pointer before:absolute before:top-[50%] before:left-[50%] before:translate-x-[-50%] before:translate-y-[-50%] before:w-[0.35em] before:h-[0.35em] before:bg-[var(--color)] before:border-[0.1em] before:border-[var(--background)] before:z-[1] before:rounded-[100%] after:absolute after:top-[.1em] after:left-[calc(36.333%-0.15em)] after:w-[68%] after:h-[.1em] after:bg-[var(--color)] after:border-t-[.1em] after:border-t-[var(--background) after:z-[2] after:transition-transform duration-[.25s]`} onClick={() => { setShowRePassword(prev => !prev) }}>
                                    <div className='overflow-hidden h-[50%] relative mb-[-.5px] before:bg-[currentColor] before:absolute before:left-0 before:right-0 before:h-[300%] before:rounded-[100%]'></div>
                                    <div className='overflow-hidden h-[50%] relative mb-[-.5px] before:bg-[currentColor] before:absolute before:left-0 before:right-0 before:h-[300%] before:rounded-[100%] before:bottom-0'></div>
                                </div>
                            </div>
                            {formik.errors.rePassword && formik.touched.rePassword && <h5 className=" text-red-600 absolute text-sm">{formik.errors.rePassword}</h5>}
                        </div>

                        <div className="text-center lg:text-left">
                            <TERipple rippleColor="light">
                                <button
                                    type="submit"
                                    className="inline-block rounded bg-[#198754] px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                                >
                                    Register
                                </button>
                            </TERipple>

                            <p className="mb-0 mt-2 pt-1 text-sm font-semibold">
                                Have an account?{" "}
                                <Link
                                    to="/login"
                                    className="text-[#198754] transition duration-150 ease-in-out"
                                >
                                    Login
                                </Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div >
        </section >
    )
}

export default Register