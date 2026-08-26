import React from "react";
import PageBanner from "../components/components/Banner";
import BlogSection from "../components/components/BlogSection";
import { blogPosts, blogBanner } from "../data/blog";

export default function Blog() {
  return (
    <main className="min-h-screen bg-white">
      <PageBanner
        eyebrow={blogBanner.eyebrow}
        eyebrowIcon={blogBanner.eyebrowIcon}
        heading={blogBanner.heading}
        description={blogBanner.description}
        image={blogBanner.image}
      />

      {/* Renders all posts with filters & pagination */}
      <BlogSection
        posts={blogPosts}
        showFilters={true}
        showPagination={true}
        limit={6}
      />
    </main>
  );
}
