// import { ShieldCheck, Trophy, Users } from 'lucide-react';
import "./Home.css";
import AboutSection from "./components/components/About";
import Carousel from "./components/components/Carousel";
import BlogSection from "./components/components/BlogSection";
// import HomeFocusSection from './components/components/HomeFocusSection';
import MovementCta from "./components/components/MovementCta";
import CommunityComments from "./components/components/CommunityComments";
import StatsSection from "./components/components/Stats";
import SponsorMarquee from "./components/components/Sponsormarquee";
import { aboutSections } from "./data/aboutSection";
import { heroSlides } from "./data/heroSlides";
import { comments } from "./data/comments";
import { stats } from "./data/stats";
import { sponsorMarqueeData } from "./data/sponsors";
import { blogPosts } from "./data/blog";
import Contact from "./components/components/Contact";
import { useEffect } from "react";
// const homeHighlights = [
//   { icon: Users, title: 'Build confidence', text: 'Safe spaces where girls can grow through sport.' },
//   { icon: Trophy, title: 'Develop talent', text: 'Training, mentorship, and pathways to opportunity.' },
//   { icon: ShieldCheck, title: 'Create access', text: 'Programs that make participation more inclusive.' },
// ];

// Order,Section,Key Purpose
// 1,Hero,"Clear hook, primary CTA, dark overlay for readability"
// 2,Sponsors / Partners Logo Bar,Immediate third-party trust & authority
// 3,Key Impact Stats (Counter),"Tangible proof of work (1,200+ reached, 9 yrs, 38+ scholarships)"
// 4,About ISQDF & Mission,"Two-column story, photo gallery, and mission statement"
// 5,Stories / Impact in Action,3 featured blog cards showcasing individual lives changed
// 6,Community Voices,Clean testimonial carousel on neutral background
// 7,Conversion CTA Banner,"Bold red callout: ""Help the next girl take her first step"""
// 8,Footer,"Nav links, legal info, donation links"

function Home() {
  useEffect(() => {
    const hash = window.location.hash.slice(1);
    function isAppendedIdFunc() {
      if (hash) {
        //  scroll to id , this is for conatct but i will write more code for incase of reusabilty.
          const contactSection = document.getElementById("contact");
    if (contactSection){
       contactSection.scrollIntoView(
        { behavior: "smooth",
           block: "start" 
          }
          );}
  }
        // console.log(hash);
      }
    
    isAppendedIdFunc();
  }, []);
  return (
    <div>
      {/* 1. Hero */}
      <Carousel data={heroSlides} />

      {/* 2. Sponsors / Partners — immediate trust signal, right after hero */}
      <SponsorMarquee
        sponsors={sponsorMarqueeData.sponsors} // swap to real/verified sponsors first
        speed="fast"
        direction="left"
        grayscale
        title={null} // removes the "Our Sponsors & Partners" heading
      />

      {/* 3. Key Impact Stats — tangible proof before the story is told */}
      <StatsSection data={stats} />

      {/* 4. About ISQDF & Mission */}
      {aboutSections.map((section, index) => (
        <AboutSection key={index} {...section} />
      ))}

      {/* <HomeFocusSection highlights={homeHighlights} /> */}

      {/* 5. Stories / Impact in Action */}
      <BlogSection
        posts={blogPosts}
        limit={3}
        showFilters={false}
        showSearch={false}
        showPagination={false}
        actionButtonText="See All Stories"
        actionButtonHref="/blog"
      />

      {/* 6. Community Voices */}
      <CommunityComments
        eyebrow="Community voices"
        heading="What our community is saying"
        comments={comments}
      />

      {/* 7. Contact Us */}
      <Contact />

      {/* 8. Conversion CTA Banner */}
      <MovementCta />

      {/* 8. Footer — rendered outside Home, in your layout/App shell */}
    </div>
  );
}

export default Home;
