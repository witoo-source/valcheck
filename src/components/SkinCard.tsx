import type { JSX } from "react";
import VpLogo from '../assets/vp-logo.webp'

export interface ISkinCard {
  name: string;
  banner: string;
  price: number;
}

export default function SkinCard(props: ISkinCard): JSX.Element {
  return ( 
    <div className="text-white font-[val] h-42 bg-white/10 p-4 rounded-3xl border-2 border-white/10 cursor-pointer transition hover:scale-[0.9]">
      <img src={props.banner} className="w-100 mb-3 h-20" />
      <p>
        {props.name}
      </p>
      <div className="flex items-center gap-1">
        <p>
          {props.price}
        </p>
        <img src={VpLogo} alt="" className="w-3.5 h-3.5 mb-0.5" />
      </div>
    </div> 
  )
}
