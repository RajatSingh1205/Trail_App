import React from 'react'

const SignUp = ({onLogin}) => {
    return (
       <>
           <div className="w-full max-w-md rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl shadow-2xl">
               <h2 className="mb-2 text-center text-3xl font-bold text-white">
                   Make Your Account
               </h2>

               <p className="mb-8 text-center text-gray-400">
                   Sign Up to continue your movie journey.
               </p>

               <form className="space-y-5">
                   <div>
                       <label className="mb-2 block text-sm font-medium text-gray-300">
                           Email
                       </label>
                       <input
                           type="text"
                           placeholder="Enter ypur Email"
                           className="w-full rounded-lg border border-gray-700 bg-black/40 px-4 py-3 text-white placeholder-gray-500 outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
                       />

                   </div>
                   <div>
                       <label className="mb-2 block text-sm font-medium text-gray-300">
                           Username
                       </label>
                       <input
                           type="text"
                           placeholder="Enter your username"
                           className="w-full rounded-lg border border-gray-700 bg-black/40 px-4 py-3 text-white placeholder-gray-500 outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
                       />
                   </div>

                   <div>
                       <label className="mb-2 block text-sm font-medium text-gray-300">
                           Password
                       </label>
                       <input
                           type="password"
                           placeholder="Enter your password"
                           className="w-full rounded-lg border border-gray-700 bg-black/40 px-4 py-3 text-white placeholder-gray-500 outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
                       />
                   </div>

                   <div>
                       <label className="mb-2 block text-sm font-medium text-gray-300">
                           Confirm Password
                       </label>
                       <input
                           type="password"
                           placeholder="ReEnter your password"
                           className="w-full rounded-lg border border-gray-700 bg-black/40 px-4 py-3 text-white placeholder-gray-500 outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
                       />
                   </div>

                   <div className="flex items-center justify-between text-sm">
                       <label className="flex items-center gap-2 text-gray-400">
                           <input
                               type="checkbox"
                               className="accent-purple-500"
                           />
                           Remember me
                       </label>

                       {/*<button*/}
                       {/*    type="button"*/}
                       {/*    className="text-purple-400 hover:text-purple-300"*/}
                       {/*>*/}
                       {/*    Forgot Password?*/}
                       {/*</button>*/}
                   </div>

                   <button
                       type="submit"
                       className="w-full rounded-lg bg-purple-500 py-3 font-semibold text-white transition hover:bg-purple-600 active:scale-[0.98]"
                   >
                       Sign Up
                   </button>
               </form>

               <p className="mt-6 text-center text-gray-400">
                   already have an account ?{" "}
                   <button
                       onClick={onLogin}
                       className="font-semibold text-purple-400 hover:text-purple-300">
                       Log in
                   </button>
               </p>
           </div>
       </>
    )
}
export default SignUp;
