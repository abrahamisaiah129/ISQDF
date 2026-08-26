import React from "react";
import { ArrowRight } from "lucide-react";
import Button from "../components/ui/Button";
import AboutSection from "../components/components/About";
import ProgramsSection from "../components/components/ProgramSection";
import CommunityComments from "../components/components/CommunityComments";
import StatsSection from "../components/components/Stats";
import { aboutPageData } from "../data/aboutSection";
import { comments } from "../data/comments";
import { stats } from "../data/stats";
import PageBanner from "../components/components/Banner";
import { programsData } from "../data/programData";

const About = () => {
  const { banner, sections, programsHeader, cta } = aboutPageData;

  return (
    <main>
      {/* 1. Header Banner */}
      <PageBanner
        eyebrow={banner.eyebrow}
        eyebrowIcon={banner.eyebrowIcon}
        heading={banner.heading}
        description={banner.description}
        image={banner.image}
      />

      {/* 2. About Sections */}
      <div className="bg-white">
        {sections.map((section, index) => (
          <AboutSection key={index} {...section} />
        ))}
      </div>

      {/* 3. Stats Section */}
      <StatsSection
        eyebrow="Our impact"
        heading="Numbers that tell our story"
        stats={stats}
        variant="light"
      />

      {/* 4. Programs Section */}
      <ProgramsSection
        eyebrow={programsHeader.eyebrow}
        heading={programsHeader.heading}
        description={programsHeader.description}
        programs={programsData}
      />

      {/* 5. Community Comments */}
      <CommunityComments
        eyebrow="Community voices"
        heading="What our community is saying"
        comments={comments}
      />

      {/* 6. Call to Action Banner */}
      <section className="bg-red-700 px-6 py-14 text-white sm:px-8 lg:px-12">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-red-100">
              {cta.eyebrow}
            </p>
            <h2 className="mt-2 text-3xl font-bold">
              {cta.heading}
            </h2>
          </div>
          <Button
            as="a"
            href={cta.buttonHref || "/donate"}
            variant="secondary"
            rightIcon={<ArrowRight size={18} />}
          >
            {cta.buttonText}
          </Button>
        </div>
      </section>
    </main>
  );
};

export default About;
