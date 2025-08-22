import type { JSX } from "react";
import { useState, useEffect } from "react";
import AuthExample from "../assets/auth-example.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Auth(): JSX.Element {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [link, setLink] = useState<string>("");
  const [accessToken, setAccessToken] = useState<string>(
    "",
  );
  const [entitlementsToken, setEntitlementsToken] = useState<string>(
    "",
  );
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useState<any>()

  function handleModalVisibility(): void {
    setShowModal(true);
  }

  useEffect(() => {
      const storedLoggedIn = localStorage.getItem("loggedIn");
    
      if (storedLoggedIn) setLoggedIn(storedLoggedIn === "true" && true);

      localStorage.getItem("loggedIn") && (setLoggedIn(storedLoggedIn === "true" && true), setUserInfo(JSON.parse(localStorage.getItem("userInfo") as string)))
  }, [])

  async function handleAuth() {
    const params = new URLSearchParams(link.split("#")[1]);
    const tempAccessToken: string = params.get("access_token") || "";

    await fetch("http://192.168.1.142:3000/entitlements", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        accessToken: tempAccessToken,
        entitlementsToken: "",
      }),
    })
      .then((res) => res.json())
      .then(async (data) => {
        setAccessToken(tempAccessToken);
        setEntitlementsToken(data.entitlements_token);

        console.log(data.entitlements_token);

        localStorage.setItem("accessToken", tempAccessToken);
        localStorage.setItem("entitlementsToken", data.entitlements_token);

        await fetch("http://192.168.1.142:3000/userinfo", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            accessToken: tempAccessToken,
            entitlementsToken: data.entitlements_token,
          }),
        })
          .then((res) => res.json())
          .then((userdata) => {
            setUserInfo(userdata);
            localStorage.setItem("userInfo", JSON.stringify(userdata));
          });

          setLoggedIn(true)
          localStorage.setItem("loggedIn", "true")
        setShowModal(false);
        toast.success("Succefully logged-in! 😁");
      });
  }

  return (
    <>
      {showModal ? (
        <div className="fixed inset-0 bg-white/10 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-[#202020] text-white rounded-2xl p-8 w-86 max-w-full flex flex-col gap-2">
            <h2 className="text-3xl font-bold font-[val]">Auth</h2>
            <div className="flex gap-3 w-full items-center justify-center">
              <input
                value={link}
                onChange={(e) => setLink(e.target.value)}
                placeholder="auth link"
                className="text-center p-3 bg-[#252525] rounded-lg"
              />
              <button
                onClick={handleAuth}
                className="p-[0.700rem] bg-red-600 rounded-lg"
              >
                Login
              </button>
            </div>
            <p>
              Go{" "}
              <a
                href="https://auth.riotgames.com/authorize?redirect_uri=https%3A%2F%2Fplayvalorant.com%2Fopt_in&client_id=play-valorant-web-prod&response_type=token%20id_token&nonce=1&scope=account%20openid"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline"
              >
                here
              </a>{" "}
              and login like you normally do. Valcheck will use that link to get
              your access token. That token is in the url you put here, then,
              using the in-game API of <b className="font-[val]">Valorant</b>©
              we get all the info you can see here.
            </p>
            <p className="p-2 bg-[#101010] rounded-lg w-40 font-mono text-sm text-[#404040]">
              | Copy that link
            </p>
            <img src={AuthExample} alt="" className="w-[90%]" />
            <button
              className="mt-6 px-4 py-2 bg-red-600 rounded-xl"
              onClick={() => setShowModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      ) : (
        <div className=" bg-transparent flex items-center justify-center w-full">
          {!loggedIn ? (
            <button
              id="auth-button"
              className="flex items-center p-5 text-white bg-red-600 rounded-2xl font-bold cursor-pointer"
              onClick={handleModalVisibility}
            >
              <img src="riot-logo.webp" alt="" className="w-7 mr-2" />
              <p>Auth with riot</p>
            </button>
          ) : (
            <div className="flex gap-1 text-white items-center justify-center border-2 border-white/10 p-5 rounded-4xl">
              <p className="font-bold font-[val]">
                {loggedIn 
                  ? (userInfo as any)?.acct
                      .game_name
                  : ""}
                #
                {loggedIn 
                  ? (userInfo as any)?.acct
                      .tag_line
                  : ""}
              </p>
              <button className="flex items-center justify-center p-1 bg-white/10 ml-3 rounded-full hover:bg-red-600 transition cursor-pointer" onClick={() => {
                localStorage.clear()
                window.location.reload()
              }}>
                <svg className="w-12 mt-2 ml-1 h-11" fill="white" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 500 500" enable-background="new 0 0 500 500">
                <g>
                  <path d="M250,224c-4.4,0-8,3.6-8,8v24c0,4.4-3.6,8-8,8h-40c-4.4,0-8-3.6-8-8V144c0-4.4,3.6-8,8-8h40c4.4,0,8,3.6,8,8v24
                    c0,4.4,3.6,8,8,8s8-3.6,8-8v-24c0-13.2-10.8-24-24-24h-40c-13.2,0-24,10.8-24,24v112c0,13.2,10.8,24,24,24h40c13.2,0,24-10.8,24-24
                    v-24C258,227.6,254.4,224,250,224z"/>
                  <path d="M328.4,204.8c0.1-0.1,0.2-0.2,0.3-0.3c0,0,0,0,0-0.1c0.1-0.2,0.2-0.4,0.3-0.6c0.1-0.3,0.3-0.5,0.4-0.8
                    c0.1-0.3,0.2-0.5,0.3-0.8c0.1-0.2,0.2-0.4,0.2-0.7c0.2-1,0.2-2.1,0-3.1c0,0,0,0,0,0c0-0.2-0.1-0.4-0.2-0.7
                    c-0.1-0.3-0.1-0.5-0.2-0.8c0,0,0,0,0,0c-0.1-0.3-0.3-0.5-0.4-0.8c-0.1-0.2-0.2-0.4-0.3-0.6c-0.3-0.4-0.6-0.9-1-1.2l-32-32
                    c-3.1-3.1-8.2-3.1-11.3,0c-3.1,3.1-3.1,8.2,0,11.3l18.3,18.3H210c-4.4,0-8,3.6-8,8s3.6,8,8,8h92.7l-18.3,18.3
                    c-3.1,3.1-3.1,8.2,0,11.3c1.6,1.6,3.6,2.3,5.7,2.3s4.1-0.8,5.7-2.3l32-32c0,0,0,0,0,0C327.9,205.4,328.1,205.1,328.4,204.8z"/>
                </g>
                </svg>
              </button>
            </div>
          )}
        </div>
      )}
      <ToastContainer position="top-right" autoClose={6000} />
    </>
  );
}
