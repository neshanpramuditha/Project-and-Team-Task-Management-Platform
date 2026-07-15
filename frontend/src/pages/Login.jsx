import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
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

        <div className="syncro-login min-h-screen w-full flex flex-col lg:flex-row bg-[#F6F7FB]">

            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&display=swap');

                .syncro-login {
                    font-family: 'Inter', sans-serif;
                }
                .syncro-login .font-display {
                    font-family: 'Space Grotesk', sans-serif;
                }

                @keyframes drift-a {
                    0%, 100% { transform: translate(0, 0); }
                    50% { transform: translate(3px, -4px); }
                }
                @keyframes drift-b {
                    0%, 100% { transform: translate(0, 0); }
                    50% { transform: translate(-4px, 3px); }
                }
                @keyframes drift-c {
                    0%, 100% { transform: translate(0, 0); }
                    50% { transform: translate(2px, 3px); }
                }
                .dot-drift-a { animation: drift-a 6s ease-in-out infinite; }
                .dot-drift-b { animation: drift-b 7s ease-in-out infinite; }
                .dot-drift-c { animation: drift-c 5.5s ease-in-out infinite; }

                @media (prefers-reduced-motion: reduce) {
                    .dot-drift-a, .dot-drift-b, .dot-drift-c { animation: none; }
                }
            `}</style>

            {/* Brand panel — desktop only */}
            <div className="hidden lg:flex lg:w-[46%] xl:w-[42%] relative bg-[#10131F] text-white flex-col justify-between overflow-hidden px-14 py-16">

                {/* Signature graphic: scattered nodes resolving into a grid */}
                <svg
                    className="absolute inset-0 w-full h-full opacity-[0.9]"
                    viewBox="0 0 500 700"
                    fill="none"
                    aria-hidden="true"
                >
                    {/* aligned grid (the "clarity") */}
                    {[0, 1, 2, 3].map((row) =>
                        [0, 1, 2].map((col) => (
                            <circle
                                key={`g-${row}-${col}`}
                                cx={330 + col * 42}
                                cy={380 + row * 42}
                                r="2.5"
                                fill="#3A4064"
                            />
                        ))
                    )}

                    {/* scattered nodes (the "complexity") converging toward the grid */}
                    <circle className="dot-drift-a" cx="120" cy="110" r="3.5" fill="#FF6B4A" />
                    <circle className="dot-drift-b" cx="180" cy="70" r="2.5" fill="#4B5279" />
                    <circle className="dot-drift-c" cx="90" cy="190" r="2.5" fill="#4B5279" />
                    <circle className="dot-drift-a" cx="230" cy="150" r="2" fill="#4B5279" />
                    <circle className="dot-drift-b" cx="60" cy="260" r="3" fill="#FF6B4A" />
                    <circle className="dot-drift-c" cx="160" cy="240" r="2" fill="#4B5279" />
                    <circle className="dot-drift-a" cx="270" cy="90" r="2.5" fill="#4B5279" />
                    <circle className="dot-drift-b" cx="40" cy="140" r="2" fill="#4B5279" />

                    {/* faint connecting lines from a few scattered nodes toward the grid */}
                    <line x1="120" y1="110" x2="330" y2="380" stroke="#242A47" strokeWidth="1" />
                    <line x1="60" y1="260" x2="330" y2="422" stroke="#242A47" strokeWidth="1" />
                    <line x1="230" y1="150" x2="372" y2="380" stroke="#242A47" strokeWidth="1" />
                </svg>

                <div className="relative z-10 flex items-center gap-3">
                    <img src="/logo.png" alt="SYNCRO logo" className="h-9 w-9 object-contain" />
                    <span className="font-display text-xl font-semibold tracking-[0.2em]">
                        SYNCRO
                    </span>
                </div>

                <div className="relative z-10">
                    <h2 className="font-display text-4xl xl:text-[2.75rem] font-semibold leading-[1.15] max-w-sm">
                        Bringing clarity
                        <br />
                        to complexity.
                    </h2>
                    <p className="mt-5 text-sm text-[#9CA3C0] max-w-xs leading-relaxed">
                        Project & Team Task Management Platform 
                        every task, owner, and deadline,<br/>
                        aligned in one view.
                    </p>
                </div>

                <div className="relative z-10 text-xs text-[#5B6285]">
                    © {new Date().getFullYear()} Syncro. All rights reserved.
                </div>

            </div>

            {/* Form panel */}
            <div className="flex-1 flex items-center justify-center px-6 py-12 sm:px-10">

                <div className="w-full max-w-sm">

                    <div className="flex flex-col items-center text-center">

                        <img
                            src="/logo.png"
                            alt="SYNCRO logo"
                            className="h-14 w-14 object-contain"
                        />

                        <span className="font-display mt-3 text-lg font-semibold tracking-[0.2em] text-[#12141C]">
                            SYNCRO
                        </span>

                        <p className="mt-1 text-xs font-medium text-[#FF6B4A]">
                            Bringing clarity to complexity
                        </p>

                        <p className="mt-1 text-[11px] text-[#9CA3AF] lg:hidden">
                            Project & Team Task Management Platform
                        </p>

                        <h1 className="font-display mt-8 text-2xl font-semibold text-[#12141C]">
                            Welcome back
                        </h1>

                        <p className="mt-1.5 text-sm text-[#6B7280]">
                            Sign in to keep your team in sync.
                        </p>

                    </div>

                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="mt-8 space-y-5"
                        noValidate
                    >

                        <div>

                            <label className="block text-sm font-medium text-[#374151]">

                                Email address

                            </label>

                            <input

                                type="email"

                                placeholder="you@company.com"

                                className="mt-1.5 w-full rounded-xl border border-[#E5E7EB] bg-white px-4 py-3 text-sm text-[#12141C] placeholder:text-[#9CA3AF] transition focus:border-[#FF6B4A] focus:outline-none focus:ring-4 focus:ring-[#FF6B4A]/10"

                                {...register("email", {
                                    required: "Email is required"
                                })}

                            />

                            {errors.email?.message && (
                                <p className="mt-1.5 text-xs text-red-500">
                                    {errors.email?.message}
                                </p>
                            )}

                        </div>

                        <div>

                            <div className="flex items-center justify-between">

                                <label className="block text-sm font-medium text-[#374151]">

                                    Password

                                </label>

                            </div>

                            <div className="relative mt-1.5">

                                <input

                                    type={
                                        showPassword
                                            ? "text"
                                            : "password"
                                    }

                                    placeholder="Enter your password"

                                    className="w-full rounded-xl border border-[#E5E7EB] bg-white px-4 py-3 pr-11 text-sm text-[#12141C] placeholder:text-[#9CA3AF] transition focus:border-[#FF6B4A] focus:outline-none focus:ring-4 focus:ring-[#FF6B4A]/10"

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
                                    aria-label={showPassword ? "Hide password" : "Show password"}
                                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#9CA3AF] transition hover:text-[#6B7280]"
                                >

                                    {

                                        showPassword
                                            ? <FaEyeSlash />
                                            : <FaEye />

                                    }

                                </button>

                            </div>

                            {errors.password?.message && (
                                <p className="mt-1.5 text-xs text-red-500">
                                    {errors.password?.message}
                                </p>
                            )}

                        </div>

                        <button

                            disabled={loading}

                            className="font-display w-full rounded-xl bg-[#FF6B4A] py-3 text-sm font-semibold tracking-wide text-white transition hover:bg-[#F0562F] focus:outline-none focus:ring-4 focus:ring-[#FF6B4A]/25 disabled:cursor-not-allowed disabled:opacity-60"

                        >

                            {

                                loading
                                    ? "Logging in..."
                                    : "Login"

                            }

                        </button>

                    </form>

                    <p className="mt-8 text-center text-[11px] text-[#9CA3AF] lg:hidden">
                        © {new Date().getFullYear()} Syncro. All rights reserved.
                    </p>

                </div>

            </div>

        </div>

    );

}

export default Login;