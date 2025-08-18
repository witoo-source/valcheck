import type { JSX } from "react";

export default function Hero(): JSX.Element {
  return (
    <div className="flex items-center justify-center flex-col md:mt-20 lg:mb-0">
      <p className=" text-white font-bold text-lg">Welcome to</p>
      <h1 className="font-bold text-white mb-5 text-6xl font-[val]">
        Valcheck
      </h1>
      <div className="w-[70%] text-white text-center text-lg">
        <p>
          Valcheck is one of the few webapps which let you check your valorant
          stuff directly from the web, without any app, just your browser,
          bringing an easier and comfortable way to check them all. Our propuse
          aside of bringing it to the web is to make it totally free, even
          without ads.
        </p>
      </div>
    </div>
  );
}
