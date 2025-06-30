import React, { ElementType, ReactNode, useState } from "react";
import Button, { buttonStyle } from "../components/Button";
import {
  ChevronDown,
  ChevronUp,
  Clapperboard,
  Clock,
  Home,
  Library,
  PlaySquare,
  Repeat,
  History,
  ListVideo,
  Flame,
  ShoppingBag,
  Music2,
  Film,
  Radio,
  Gamepad2,
  Newspaper,
  Trophy,
  Lightbulb,
  Shirt,
  Podcast,
} from "lucide-react";
import { twMerge } from "tailwind-merge";
import { playlists, subscriptions } from "../data/sidebar";
import { useSidebarContext } from "../contexts/SidebarContext";
import { PageHeaderFirstSection } from "./PageHeader";
export function Sidebar() {
  const { isLargeOpen, isSmallOpen, close } = useSidebarContext();
  return (
    <>
      <aside
        className={` sticky top-0 overflow-y-auto scrollbar-hidden pb-4 flex flex-col ml-1  ${
          isLargeOpen ? "lg:hidden" : "lg:flex"
        }`}
      >
        <SmallSidebarItem Icon={Home} title="Home" url="/" />
        <SmallSidebarItem Icon={Repeat} title="Shorts" url="/shorts" />
        <SmallSidebarItem
          Icon={Clapperboard}
          title="Subscriptions"
          url="/subscriptions"
        />
        <SmallSidebarItem Icon={Library} title="Library" url="/library" />
      </aside>
      {isSmallOpen && (
        <div
          onClick={close}
          className="lg:hidden fixed inset-0 z-[999] bg-secondary-dark opacity-50"
        />
      )}
      <aside
        className={`w-56z lg:sticky absolute top-0 overflow-y-auto scrollbar-hidden pb-4 flex-col gap-2 px-2  ${
          isLargeOpen ? "lg:flex" : "lg:hidden"
        } ${isSmallOpen ? "flex z-[999] bg-white max-h-screen" : "hidden"}`}
      >
        <div className="lg:hidden pt-2 pb-4 px-2 sticky top-0 bg-white">
          <PageHeaderFirstSection />
        </div>
        <LargeSidebarSection>
          <LargeSidebarItem isActive IconORImgUrl={Home} title="Home" url="/" />
          <LargeSidebarItem
            IconORImgUrl={Clapperboard}
            title="Subscription"
            url="/subscription"
          />
        </LargeSidebarSection>
        <hr />
        <LargeSidebarSection visibleItemCount={5}>
          <LargeSidebarItem
            IconORImgUrl={Library}
            title="Library"
            url="/library"
          />
          <LargeSidebarItem
            IconORImgUrl={History}
            title="History"
            url="/history"
          />
          <LargeSidebarItem
            IconORImgUrl={PlaySquare}
            title="Your-vidoes"
            url="/"
          />
          <LargeSidebarItem
            IconORImgUrl={Clock}
            title="Watch Later"
            url="/clock"
          />
          {playlists.map((playlist) => {
            return (
              <LargeSidebarItem
                key={playlist.id}
                IconORImgUrl={ListVideo}
                title={playlist.name}
                url={`/playlist?list=${playlist.id}`}
              />
            );
          })}
        </LargeSidebarSection>
        <hr />
        <LargeSidebarSection title="Subscriptions">
          {subscriptions.map((subscription) => (
            <LargeSidebarItem
              key={subscription.id}
              IconORImgUrl={subscription.imgUrl}
              title={subscription.channelName}
              url={`/@${subscription.id}`}
            />
          ))}
        </LargeSidebarSection>
        <hr />
        <LargeSidebarSection title="Explore">
          <LargeSidebarItem
            IconORImgUrl={Flame}
            title="Trending"
            url="/tranding"
          />
          <LargeSidebarItem
            IconORImgUrl={ShoppingBag}
            title="Shopping"
            url="/shopping"
          />
          <LargeSidebarItem IconORImgUrl={Music2} title="Music" url="/music" />
          <LargeSidebarItem
            IconORImgUrl={Film}
            title="Movie & TV"
            url="/movietv"
          />
          <LargeSidebarItem IconORImgUrl={Radio} title="Live" url="/live" />
          <LargeSidebarItem
            IconORImgUrl={Gamepad2}
            title="Gaming"
            url="/gaming"
          />
          <LargeSidebarItem IconORImgUrl={Newspaper} title="News" url="/news" />
          <LargeSidebarItem IconORImgUrl={Radio} title="News" url="/news" />
          <LargeSidebarItem IconORImgUrl={Trophy} title="Sports" url="/sport" />
          <LargeSidebarItem
            IconORImgUrl={Lightbulb}
            title="Learning"
            url="/learning"
          />
          <LargeSidebarItem
            IconORImgUrl={Shirt}
            title="Fashion & Beauty"
            url="/news"
          />
          <LargeSidebarItem
            IconORImgUrl={Podcast}
            title="Podcast"
            url="/podcast"
          />
        </LargeSidebarSection>
      </aside>
    </>
  );
}
type SmallSidebarItemProps = {
  Icon: ElementType;
  title: string;
  url: string;
};
function SmallSidebarItem({ Icon, title, url }: SmallSidebarItemProps) {
  return (
    <a
      href={url}
      className={twMerge(
        buttonStyle({ variant: "ghost" }),
        "py-4 px-1 flex flex-col items-center rounded-lg gap-1"
      )}
    >
      <Icon className="w-6 h-6" />
      <div className="text-sm">{title}</div>
    </a>
  );
}

type LargeSidebarSectionProps = {
  children: ReactNode;
  title?: string;
  visibleItemCount?: number;
};
function LargeSidebarSection({
  children,
  title,
  visibleItemCount = Number.POSITIVE_INFINITY,
}: LargeSidebarSectionProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const childArray = React.Children.toArray(children).flat();
  const showExpandButton = childArray.length > visibleItemCount;
  const visibleChildren = isExpanded
    ? childArray
    : childArray.slice(0, visibleItemCount);
  const ButtonIcon = isExpanded ? ChevronUp : ChevronDown;
  return (
    <div>
      {title && <div className="ml-4 mt-2 text-lg">{title}</div>}
      {visibleChildren}
      {showExpandButton && (
        <Button
          variant="ghost"
          className=" w-full flex items-center rounded-lg"
          onClick={() => setIsExpanded((e) => !e)}
        >
          <ButtonIcon className="w-6 h-6" />
          <div>{isExpanded ? "Show Less" : "Show More"}</div>
        </Button>
      )}
    </div>
  );
}

type LargeSidebarItemProps = {
  IconORImgUrl: ElementType | string;
  title: string;
  url: string;
  isActive?: boolean;
};

function LargeSidebarItem({
  IconORImgUrl,
  title,
  url,
  isActive = false,
}: LargeSidebarItemProps) {
  return (
    <a
      href={url}
      className={twMerge(
        buttonStyle({ variant: "ghost" }),
        `w-full flex items-center rounded-lg gap-4 p-3${
          isActive ? "font-bold bg-neutral-100 hover:bg-secondary" : undefined
        }`
      )}
    >
      {typeof IconORImgUrl === "string" ? (
        <img src={IconORImgUrl} className="w-6 h-6 rounded-full" />
      ) : (
        <IconORImgUrl className="w-6 h-6" />
      )}
      <div className="whitespace-nowrap overflow-hidden text-ellipsis">
        {title}
      </div>
    </a>
  );
}
