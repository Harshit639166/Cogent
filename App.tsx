import { Suspense, useState, useEffect } from "react";
import { useRoutes, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import routes from "tempo-routes";
import SearchResults from "./components/SearchResults";
import CourseDetail from "./components/CourseDetail";
import LoadingScreen from "./components/LoadingScreen";
import CoursesSection from "./components/CoursesSection";
import UniversityDetail from "./components/UniversityDetail";

function App() {
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    // Only show loading screen on initial page load
    const hasLoaded = sessionStorage.getItem("hasLoaded");
    if (hasLoaded) {
      setInitialLoading(false);
    } else {
      const timer = setTimeout(() => {
        setInitialLoading(false);
        sessionStorage.setItem("hasLoaded", "true");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <>
      {initialLoading && <LoadingScreen />}
      <Suspense fallback={null}>
        <>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/results" element={<SearchResults />} />
            <Route path="/detail/:id" element={<CourseDetail />} />
            <Route path="/university/:slug" element={<UniversityDetail />} />
            <Route path="/courses" element={<CoursesSection />} />
            {import.meta.env.VITE_TEMPO === "true" && (
              <Route path="/tempobook/*" />
            )}
          </Routes>
          {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
        </>
      </Suspense>
    </>
  );
}

export default App;
