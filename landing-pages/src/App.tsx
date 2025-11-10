import { Outlet } from "react-router-dom";
// components
import { TopNav } from "@/components/nav/top-nav";
function App() {
  return (
    <div className="flex flex-col items-center justify-center">
      <TopNav />
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
}

export default App;
