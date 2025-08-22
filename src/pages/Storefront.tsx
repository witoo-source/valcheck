import { useEffect, useState, type JSX } from "react";
import SkinCard from "../components/SkinCard";
import SoonImage from '../assets/Soon2.png'

export interface SkinResponse {
  status: number;
  data: SkinData;
}

export interface SkinData {
  uuid: string;
  displayName: string;
  themeUuid: string;
  contentTierUuid: string;
  displayIcon: string;
  wallpaper: string | null;
  assetPath: string;
  chromas: Chroma[];
  levels: Level[];
}

export interface Chroma {
  uuid: string;
  displayName: string;
  displayIcon: string;
  fullRender: string;
  swatch: string | null;
  streamedVideo: string | null;
  assetPath: string;
}

export interface Level {
  uuid: string;
  displayName: string;
  levelItem: string | null;
  displayIcon: string | null;
  streamedVideo: string | null;
  assetPath: string;
}

export default function Storefront(): JSX.Element {
  const [storefrontData, setStorefrontData] = useState<SkinData[]>([]);
  const [prices, setPrices] = useState<number[]>([])

  useEffect(() => {
    (async () => {
      try {
        const userInfo = JSON.parse(localStorage.getItem("userInfo") as string);

        const skinsIDs: string[] = await fetch("http://192.168.1.142:3000/storefront", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            accessToken: localStorage.getItem("accessToken"),
            entitlementsToken: localStorage.getItem("entitlementsToken"),
            puuid: userInfo.sub,
          }),
        }).then((res) => res.json());

        setPrices(skinsIDs.map((skininfo: any) => skininfo.price))

        console.log(skinsIDs);

        const skins = await Promise.all(
          skinsIDs.map(async (id: any) => {
            const res = await fetch(`https://valorant-api.com/v1/weapons/skins/${id.skinID}`);
            const skinInfo: SkinResponse = await res.json();
            return skinInfo.data; 
          })
        );

        setStorefrontData(skins);
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);

  return (
    <div className="md:absolute md:bottom-0 mb-10">
        <div className="w-[100%] flex justify-center bg-cover bg-center">
            <img src={SoonImage} className="w-[95%] h-[70%] m-10 rounded-3xl border-2 border-white/20" alt="" />
        </div>
      <div className="flex md:flex-row flex-col gap-5 ml-5 last:mr-5 justify-center items-center">
        {storefrontData.map((skin, index: number) => (
        <SkinCard key={skin.uuid} name={skin.displayName} banner={skin.displayIcon ? skin.displayIcon : skin.chromas[0].fullRender} price={prices.slice(-2).concat(prices.slice(0, -2))[index]} />
      ))}
      </div>
    </div>
  );
}