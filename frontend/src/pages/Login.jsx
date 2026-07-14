import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash, FaUserCircle } from "react-icons/fa";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useAuth } from "../hooks/useAuth";

function Login() {

    const navigate = useNavigate();

    const { login } = useAuth();

    const [showPassword, setShowPassword] = useState(false);

    const [loading, setLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    const onSubmit = async (data) => {

        try {

            setLoading(true);

            await login(
                data.email,
                data.password
            );

            toast.success("Welcome back!");

            navigate("/");

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Login failed"
            );

        } finally {

            setLoading(false);

        }

    };

    return (

        <div className="min-h-screen flex items-center justify-center bg-slate-100">

            <div className="w-full max-w-md rounded-2xl bg-white shadow-xl p-8">

                <div className="flex flex-col items-center">

                    <FaUserCircle
                        className="text-6xl text-blue-600"
                    />

                    <h1 className="mt-4 text-3xl font-bold">

                        TaskFlow

                    </h1>

                    <p className="text-gray-500 mt-2">

                        Project & Team Task Management

                    </p>

                </div>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="mt-8 space-y-5"
                >

                    <div>

                        <label className="font-medium">

                            Email

                        </label>

                        <input

                            type="email"

                            placeholder="Enter email"

                            className="mt-2 w-full rounded-lg border p-3 focus:border-blue-500 focus:outline-none"

                            {...register("email", {
                                required: "Email is required"
                            })}

                        />

                        <p className="text-sm text-red-500">

                            {errors.email?.message}

                        </p>

                    </div>

                    <div>

                        <label className="font-medium">

                            Password

                        </label>

                        <div className="relative">

                            <input

                                type={
                                    showPassword
                                        ? "text"
                                        : "password"
                                }

                                placeholder="Enter password"

                                className="mt-2 w-full rounded-lg border p-3 pr-12 focus:border-blue-500 focus:outline-none"

                                {...register("password", {
                                    required: "Password is required"
                                })}

                            />

                            <button
                                type="button"
                                onClick={() =>
                                    setShowPassword(
                                        !showPassword
                                    )
                                }
                                className="absolute right-4 top-6 text-gray-500"
                            >

                                {

                                    showPassword
                                        ? <FaEyeSlash />
                                        : <FaEye />

                                }

                            </button>

                        </div>

                        <p className="text-sm text-red-500">

                            {errors.password?.message}

                        </p>

                    </div>

                    <button

                        disabled={loading}

                        className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:opacity-50"

                    >

                        {

                            loading
                                ? "Logging in..."
                                : "Login"

                        }

                    </button>

                </form>

            </div>

        </div>

    );

}

export default Login;