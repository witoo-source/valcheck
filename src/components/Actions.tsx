import type { JSX } from "react";
import StorefrontBanner from "../assets/storefront-banner.png";
import SoonBanner from "../assets/soon.png";
import Arrow from "../assets/arrow.svg";

export interface IActionData {
  title: string;
  banner: string;
  description: string;
}

const actionsData: IActionData[] = [
  {
    title: "Storefront",
    banner: StorefrontBanner,
    description:
      "Check your actual valorant store including the bundles. Watch demo videos, images and every variant of each skin",
  },
  {
    title: "Social",
    banner: SoonBanner,
    description: "Feature coming soon!",
  },
  {
    title: "Ranked",
    banner: SoonBanner,
    description: "Feature coming soon!",
  },
  {
    title: "Match History",
    banner: SoonBanner,
    description: "Feature coming soon!",
  },
  {
    title: "Stats",
    banner: SoonBanner,
    description: "Feature coming soon!",
  },
];

export default function Action(): JSX.Element {
  return (
    <section
      className="flex flex-row flex-nowrap md:flex-wrap md:justify-center w-full items-center mt-10 mb-10 gap-10
             overflow-x-auto md:overflow-visible snap-x snap-mandatory px-6 md:px-20"
    >
      {actionsData.map((action, i) => (
        <div
          key={action.title}
          className={`md:w-120 w-[85%] h-110 md:h-130 flex-shrink-0 snap-center contain-s text-white backdrop-blur-2xl p-5 rounded-4xl bg-white/10 border-3 border-white/5
                  ${i === 0 ? "md:block" : "md:hidden"}`}
        >
          <img src={action.banner} alt="" className="rounded-4xl" />
          <h3 className="text-2xl font-[val] m-5">{action.title}</h3>
          <p className="m-5">{action.description}</p>
          <a
            href={action.title.toLowerCase()}
            className="p-3 bg-white/5 rounded-2xl flex justify-center items-center cursor-pointer hover:bg-white/10 transition"
          >
            Open
            <img src={Arrow} alt="" width={16} />
          </a>
        </div>
      ))}
    </section>
  );
}
