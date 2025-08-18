import type { JSX } from "react";
import { useState } from "react";
import AuthExample from '../assets/auth-example.png'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import type IUserData from "./UserData.interface";
import { UserData_defaultForInitialization } from "./UserData.interface";

export default function Auth(): JSX.Element {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [link, setLink] = useState<string>("");
  const [accessToken, setAccessToken] = useState<string>("")
  const [entitlementsToken, setEntitlementsToken] = useState<string>("")
  const [loggedIn, setLoggedIn] = useState<IUserData>(UserData_defaultForInitialization)

  function handleModalVisibility(): void {
    setShowModal(true);
  }

  async function handleAuth() {
    const params = new URLSearchParams(link.split('#')[1])
    const tempAccessToken: string = params.get('access_token') || ""

    await fetch("https://entitlements.auth.riotgames.com/api/token/v1", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${tempAccessToken}`
        }
    })
    .then(res => res.json())
    .then(async (data) => {
        setAccessToken(tempAccessToken)
        setEntitlementsToken(data.entitlements_token)

        console.log(data.entitlements_token)

        localStorage.setItem("accessToken", tempAccessToken)
        localStorage.setItem("entitlementsToken", data.entitlements_token)

        await fetch("https://auth.riotgames.com/userinfo", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${tempAccessToken}`
            }
        })
        .then(res => res.json())
        .then(data => {
            setLoggedIn(data as IUserData)
            localStorage.setItem("loggedIn", JSON.stringify(data))
        })

        setShowModal(false)
        toast.success("Succefully logged-in! 😁")  
    })
  }

  function AuthModal(): JSX.Element {
    return showModal ? (
      <div className="fixed inset-0 bg-white/10 backdrop-blur-sm z-50 flex items-center justify-center">
        <div className="bg-[#202020] text-white rounded-2xl p-8 w-96 max-w-full flex flex-col gap-2">
          <h2 className="text-3xl font-bold font-[val]">Auth</h2>
          <div className="flex gap-3 w-full items-center justify-center">
            <input
                value={link}
                onChange={(e) => setLink(e.target.value)}
                placeholder="auth link"
                className="text-center p-3 bg-[#252525] rounded-lg"
            />
            <button onClick={handleAuth} className="p-[0.700rem] bg-red-600 rounded-lg">
                Login
            </button>
          </div>
            <p>Go <a href="https://auth.riotgames.com/authorize?redirect_uri=https%3A%2F%2Fplayvalorant.com%2Fopt_in&client_id=play-valorant-web-prod&response_type=token%20id_token&nonce=1&scope=account%20openid" target="_blank"
  rel="noopener noreferrer" className="text-blue-600 underline">here</a> and login like you normally do. Valcheck will use that link to get your access token. That token is in the url you put here, then, using the in-game API of <b className="font-[val]">Valorant</b>© we get all the info you can see here.</p>
            <p className="p-2 bg-[#101010] rounded-lg w-40 font-mono text-sm text-[#404040]">
                | Copy that link
            </p>
            <img src={AuthExample} alt="" className="w-[90%]" />
          <button
            className="mt-6 px-4 py-2 bg-red-600 rounded-xl"
            onClick={() => setShowModal(false)}
          >
            Cerrar
          </button>
        </div>
      </div>
    ) : (
      <div></div>
    );
  }

  return (
    <div className=" bg-transparent flex items-center justify-center w-full">
      <button
        id="auth-button"
        className="flex items-center p-5 text-white bg-red-600 rounded-2xl font-bold cursor-pointer"
        onClick={handleModalVisibility}
      >
        <img src="riot-logo.webp" alt="" className="w-7 mr-2" />
        <p>Auth with riot</p>
      </button>

      <ToastContainer position="top-right" autoClose={6000} />

      {showModal && <AuthModal />}
    </div>
  );
}
