import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css"; //  Tailwind's CSS file is here

// Fontsource imports come AFTER Tailwind
import "@fontsource/poppins/300.css";
import "@fontsource/poppins/400.css";
import "@fontsource/poppins/500.css";
import "@fontsource/poppins/600.css";
import "@fontsource/poppins/700.css";
import "@fontsource/poppins/800.css";

import Home from "./Home.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout.jsx";
import About from "./pages/About.jsx";
import Founder from "./pages/Founder.jsx";
// import Programs from "./pages/Founder.jsx";
import Donate from "./pages/Donate.jsx";
import Gallery from "./pages/Gallery.jsx";
import Blog from "./pages/Blog.jsx";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/founder" element={<Founder />} />
          <Route path="/story" element={<Founder />} />
          {/* <Route path="/programs" element={<Programs />} /> */}
          <Route path="/donate" element={<Donate />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  </StrictMode>,
);
