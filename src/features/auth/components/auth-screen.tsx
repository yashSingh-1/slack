"use client"

import { useState } from "react"
import { SingInFlow } from "../types"
import SignInCard from "./SignInCard"
import SignUpCard from "./SignUpCard"

const AuthScreen = () => {
  const [state, setState] = useState<SingInFlow>("signIn")
  return (
    <div className="h-screen flex items-center justify-center bg-[#5C3B58]">
      <div className="md:h-auto md:w-fit">
        {
          state === "signIn" ? <SignInCard setState={setState}/> : <SignUpCard setState={setState}/>
        }
      </div>
    </div>
  )
}

export default AuthScreen