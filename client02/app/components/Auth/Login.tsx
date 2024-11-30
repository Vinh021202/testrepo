import React, { FC, useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from "yup";
import { AiFillGithub, AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import { Style } from '../../style/stylelogin';
import { useLoginMutation } from '@/redux/features/auth/authApi';
import toast from 'react-hot-toast';
import {signIn} from "next-auth/react";


type Props = {
    setRoute: (route: string) => void;
    setOpen: (open:boolean) => void;
}

const schema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Please enter your email!"),
    password: Yup.string().required("Please enter your password!").min(6, "Password must be at least 6 characters"),
});


const Login:FC<Props> = ({setRoute, setOpen }) => {

    const [show, setShow] = useState(false);
    const [login, {isSuccess, error}] = useLoginMutation();

    const formik = useFormik({
        initialValues: { email: "", password: "" },
        validationSchema: schema,
        onSubmit: async ({ email, password }) => {
            await login({email, password})
            console.log(email,password)
        },
    });

    
    useEffect (() => {
        if(isSuccess) {
            toast.success("Login Successfully!");
            setOpen(false);
        }
        if(error){
            if("data" in error) {
                const errorData = error as any;
                toast.error(errorData.data.message);
            }
        }
    },[isSuccess, error])

    const { errors, touched, values, handleChange, handleSubmit } = formik;

    return ( 
        <div className='w-full'>
            <h1 className={`${Style.title}`}>
                Đăng nhập 
            </h1>
            <form onSubmit={handleSubmit} >
                <label className={`${Style.Label}`} 
                htmlFor= "email">
                    Nhập email của bạn
                </label>
                <input
                type="email"
                name=""
                value={values.email}
                onChange={handleChange}
                id="email"
                placeholder="logingmail@gmail.com"
                className={`${errors.email && touched.email && "border-red-500"}
                ${Style.input}`}
                 />
                 {errors.email && touched.email && (
                <span className="text-red-500 pt-2 block">{errors.email}</span>
                )}
                    <div className="w-full mt-5 relative mb-1">
                    <label className={`${Style.Label}`} htmlFor="email">
                        Nhập mật khẩu của bạn
                    </label>
                    <input
                        type={!show ? "password": "text"}
                        name="password"
                        value={values.password}
                        onChange={handleChange}
                        id="password"
                        placeholder="password!@%"
                        className={`${errors.password && touched.password && "border-red-500"} ${
                                Style.input}`} />
                        {!show ? (
                            <AiOutlineEyeInvisible
                            className="absolute bottom-3 right-2 z-1 cursor-pointer"
                            size={20}
                            onClick={() => setShow(true)}
                        />
                        ):(
                            <AiOutlineEye
                            className="absolute bottom-3 right-2 z-1 cursor-pointer"
                            size={20}
                            onClick={() => setShow(false)}
                             />
                        )}
                        {errors.password && touched.password && (
                            <span className="text-red-500 pt-2 block">{errors.email}</span>
                    )}
                    </div>
                    <div className="w-full mt-5">
                        <input
                            type="submit"
                            value="Đăng Nhập"
                            className={`${Style.button}`}
                         />
                    </div>
                    <br />
                    <h5 className="text-center pt-4 font-Poppins text-[14px] text-black dark:text-white">  
                        Hoặc tham gia cùng
                    </h5>
                    <div className="flex items-center justify-center my-3  text-black dark:text-white  ">
                        <FcGoogle size={30} className="cursor-pointer mr-2"
                         onClick={() => signIn("google")}
                        />
                        <AiFillGithub size={30} className="cursor-pointer ml-2" 
                        onClick={() => signIn("github")}
                        />
                    </div>
                    <h5 className='text-center pt-4 font-Poppins text-[14px]  text-black dark:text-white'>
                    Chưa có tài khoản?{""}
                        <span className="text-[#2190ff] pl-1 cursor-pointer"
                            onClick={() => setRoute("Sign-Up")}
                        >
                            Đăng ký
                        </span>
                    </h5>
            </form>
        </div>
    );
};

export default Login;