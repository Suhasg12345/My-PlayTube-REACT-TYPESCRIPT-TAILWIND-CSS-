import PageHeader from "./layouts/PageHeader";
import CategoryPills from "./components/CategoryPills";
import { categories, videos } from "./data/home";
import { useState } from "react";
import { VideoGridItem } from "./components/VideoGridItem";
import { Sidebar } from "./layouts/Sidebar";
import { SidebarProvider } from "./contexts/SidebarContext";
function App() {
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  return (
    <>
      <div className="max-h-screen ">
        <SidebarProvider>
          <div className=" max-h-screen flex flex-col">
            <PageHeader />
            <div className="grid grid-cols-[auto,1fr]  flex-grow-1 overflow-auto">
              <Sidebar />
              <div className="overflow-x-hidden pe-4  pb-4 ">
                <div className=" sticky top-0 z-10 pb-4 bg-gradient-to-t from-slate-200 to-slate-200 ">
                  <CategoryPills
                    categories={categories}
                    selectedCategory={selectedCategory}
                    onSelect={setSelectedCategory}
                  />
                </div>
                <div className="grid gap-4 grid-cols-[repeat(auto-fill,minmax(300px,1fr))]">
                  {videos.map((video) => {
                    return <VideoGridItem key={video.id} {...video} />;
                  })}
                </div>
              </div>
            </div>
          </div>
        </SidebarProvider>
      </div>
    </>
  );
}

export default App;
