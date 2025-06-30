import WebLogo from "../assets/WebLogo.png";
import { ArrowLeft, Bell, Menu, Mic, Search, Upload, User } from "lucide-react";
import Button from "../components/Button";
import { useState } from "react";
import { useSidebarContext } from "../contexts/SidebarContext";
const PageHeader = () => {
  const [showFullWidthSearch, setShowFullWidthSearch] = useState(false);
  const { toggle } = useSidebarContext();
  console.log("toggle", toggle);

  return (
    <div className="flex  gap-10 lg:gap-20 justify-between pt-2 mb-6 mx-0 bg-cyan-50 bg-">
      <PageHeaderFirstSection hidden={showFullWidthSearch} />
      <form
        className={`  gap-4 flex-grow justify-center ${
          showFullWidthSearch ? "flex" : "hidden md:flex"
        }`}
      >
        {showFullWidthSearch && (
          <Button
            type="submit"
            variant="ghost"
            size="icon"
            className="flex-shrink-0"
            onClick={() => setShowFullWidthSearch(false)}
          >
            <ArrowLeft />
          </Button>
        )}
        <div className="flex flex-grow max-w-[600px]  ">
          <input
            type="search"
            placeholder="Search"
            className="rounded-l-full border border-secondary-border py-1 px-4 text-lg w-full shadow-inner shadow-secondary focus:border-blue-500 outline-none"
          />
          <Button className="rounded-r-full border border-secondary-border px-4 py-2 border-l-0 flex-shrink-0">
            <Search />
          </Button>
        </div>
        <Button type="submit" size="icon" className="flex-shrink-0">
          <Mic />
        </Button>
      </form>
      <div
        className={` flex-shrink-0 md:gap-2 ${
          showFullWidthSearch ? "hidden" : "flex"
        }`}
      >
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setShowFullWidthSearch(true)}
        >
          <Search />
        </Button>{" "}
        <Button variant="ghost" size="icon" className="md:hidden">
          <Mic />
        </Button>
        <Button variant="ghost" size="icon">
          <Upload />
        </Button>{" "}
        <Button variant="ghost" size="icon">
          <Bell />
        </Button>{" "}
        <Button variant="ghost" size="icon">
          <User />
        </Button>{" "}
      </div>
    </div>
  );
};

export default PageHeader;

type PageHeaderFirstSectionProps = {
  hidden?: boolean;
};
export function PageHeaderFirstSection({
  hidden = false,
}: PageHeaderFirstSectionProps) {
  const { toggle } = useSidebarContext();

  return (
    <div
      className={` gap-4 items-center flex-shrink-0 ${
        hidden ? "hidden" : "flex"
      }`}
    >
      <Button onClick={toggle} variant="ghost" size="icon" className="ms-2">
        <Menu />
      </Button>
      <a href="/">
        <img src={WebLogo} className="h-6" />
      </a>
    </div>
  );
}
