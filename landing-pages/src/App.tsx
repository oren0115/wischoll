import { TopNav } from "@/components/nav/top-nav";
import { Routes, Route } from "react-router-dom";

// pages
import { Home } from "./pages/home/home";
import { Courses } from "./pages/courses/courses";
import { Instructors } from "./pages/instructors/instructors";
import { Contact } from "./pages/contact/contact";
function App() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <TopNav />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/instructors" element={<Instructors />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
