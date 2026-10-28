import { useEffect, useState, useMemo } from "react";
import { supabase } from "@/integrations/supabase/client";
import {
  ArrowRight,
  ArrowLeft,
  Calendar,
  Clock,
  User,
  Share2,
  Check,
  Search,
  Sparkles,
  BookOpen,
  ChevronRight,
  Tag,
} from "lucide-react";
import { useSearchParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import SiteFooter from "@/components/SiteFooter";
import { useToast } from "@/components/ui/use-toast";

interface BlogPost {
  id: string | number;
  title: string;
  content?: string | null;
  main_content?: string | null;
  short_description?: string | null;
  subheading?: string | null;
  author?: string | null;
  publisher?: string | null;
  category?: string | null;
  tags?: string[] | string | null;
  cover_image?: string | null;
  image?: string | null;
  published_at?: string | null;
  created_at?: string | null;
  date?: string | null;
  slug?: string | null;
  views?: number | null;
  status?: string | null;
}

const BlogDetails = () => {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [selectedBlog, setSelectedBlog] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [copied, setCopied] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();
  const { toast } = useToast();

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from("blogs")
          .select("*");

        if (error) {
          console.error("Error fetching blogs from Supabase:", error);
          setLoading(false);
          return;
        }

        if (data && data.length > 0) {
          // Sort descending by date / published_at / created_at
          const sorted = [...data].sort((a, b) => {
            const timeA = new Date(
              a.published_at || a.date || a.created_at || 0
            ).getTime();
            const timeB = new Date(
              b.published_at || b.date || b.created_at || 0
            ).getTime();
            return timeB - timeA;
          });

          setBlogs(sorted);

          // Check if specific blog ID or slug was passed in URL
          const blogParam = searchParams.get("id") || searchParams.get("slug");
          if (blogParam) {
            const found = sorted.find(
              (b) =>
                String(b.id) === blogParam ||
                (b.slug && String(b.slug) === blogParam)
            );
            if (found) {
              setSelectedBlog(found);
            }
          }
        }
      } catch (err) {
        console.error("Unexpected error fetching blogs:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [searchParams]);

  // Sync state when URL parameter changes
  useEffect(() => {
    const blogParam = searchParams.get("id") || searchParams.get("slug");
    if (!blogParam) {
      setSelectedBlog(null);
    } else if (blogs.length > 0) {
      const found = blogs.find(
        (b) =>
          String(b.id) === blogParam ||
          (b.slug && String(b.slug) === blogParam)
      );
      if (found) {
        setSelectedBlog(found);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
  }, [searchParams, blogs]);

  // Helpers to resolve varying column names gracefully
  const getTitle = (blog: BlogPost) => blog.title || "Untitled Article";

  const getExcerpt = (blog: BlogPost) => {
    if (blog.subheading) return blog.subheading;
    if (blog.short_description) return blog.short_description;
    const body = blog.main_content || blog.content || "";
    if (!body) return "";
    return body.slice(0, 150).trim() + "...";
  };

  const getContent = (blog: BlogPost) =>
    blog.main_content || blog.content || "";

  const getImage = (blog: BlogPost) => blog.cover_image || blog.image || null;

  const getPublisher = (blog: BlogPost) =>
    blog.publisher || blog.author || "E-Cell RSCOE";

  const getCategory = (blog: BlogPost) =>
    blog.category || "ENTREPRENEURSHIP";

  const getReadingTime = (blog: BlogPost) => {
    const content = getContent(blog);
    if (!content) return "4 min read";
    const wordCount = content.trim().split(/\s+/).length;
    const minutes = Math.max(1, Math.ceil(wordCount / 180));
    return `${minutes} min read`;
  };

  const getFormattedDate = (blog: BlogPost) => {
    const raw = blog.date || blog.published_at || blog.created_at;
    if (!raw) return "Recent";
    if (isNaN(Date.parse(raw))) return raw;
    try {
      return new Date(raw).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      });
    } catch {
      return raw;
    }
  };

  const getTags = (blog: BlogPost): string[] => {
    if (Array.isArray(blog.tags) && blog.tags.length > 0) {
      return blog.tags.map((t) => String(t).toUpperCase().replace(/^#/, ""));
    }
    if (typeof blog.tags === "string" && blog.tags.trim()) {
      return blog.tags
        .split(",")
        .map((t) => t.trim().toUpperCase().replace(/^#/, ""))
        .filter(Boolean);
    }
    return [
      "INNOVATION",
      "ENTREPRENEURSHIP",
      "STARTUPS",
      "ECOSYSTEM",
      "RSCOE",
    ];
  };

  // Extract unique categories for filter tabs
  const categories = useMemo(() => {
    const set = new Set<string>();
    blogs.forEach((b) => {
      if (b.category) {
        set.add(b.category.toUpperCase().trim());
      }
    });
    return ["ALL", ...Array.from(set)];
  }, [blogs]);

  // Filtered blogs
  const filteredBlogs = useMemo(() => {
    return blogs.filter((blog) => {
      const matchesCategory =
        selectedCategory === "ALL" ||
        getCategory(blog).toUpperCase() === selectedCategory;

      const title = getTitle(blog).toLowerCase();
      const excerpt = getExcerpt(blog).toLowerCase();
      const author = getPublisher(blog).toLowerCase();
      const query = searchQuery.toLowerCase().trim();

      const matchesSearch =
        !query ||
        title.includes(query) ||
        excerpt.includes(query) ||
        author.includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [blogs, selectedCategory, searchQuery]);

  const handleSelectBlog = (blog: BlogPost) => {
    setSelectedBlog(blog);
    setSearchParams({ id: String(blog.id) });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBackToBlogs = () => {
    setSelectedBlog(null);
    setSearchParams({});
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleShare = (blog: BlogPost) => {
    const url = `${window.location.origin}/blogdetails?id=${blog.id}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url);
      setCopied(true);
      toast({
        title: "Link Copied!",
        description: "Blog link has been copied to your clipboard.",
      });
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col selection:bg-blue-500 selection:text-white">
      <Navbar />

      <main className="flex-1 pt-24 pb-20">
        {loading ? (
          <div className="container mx-auto px-6 py-32 flex flex-col items-center justify-center space-y-4">
            <div className="w-12 h-12 rounded-full border-4 border-blue-500/20 border-t-blue-500 animate-spin" />
            <p className="text-muted-foreground font-medium tracking-wide">
              Loading insights...
            </p>
          </div>
        ) : selectedBlog ? (
          /* =======================================================
             EDITORIAL BLOG DETAIL VIEW
             ======================================================= */
          <div className="container mx-auto px-4 sm:px-6 max-w-4xl animate-in fade-in-50 duration-500">
            {/* Top Breadcrumb / Back Button */}
            <div className="flex items-center justify-between gap-4 mb-8 pt-4">
              <button
                onClick={handleBackToBlogs}
                className="inline-flex items-center gap-2 text-sm font-bold tracking-wider uppercase text-blue-400 hover:text-blue-300 transition-colors group"
              >
                <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
                Back to All Articles
              </button>

              <button
                onClick={() => handleShare(selectedBlog)}
                className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-lg border border-white/10 bg-card hover:border-blue-500/50 text-white/80 hover:text-white transition-all shadow-sm"
                title="Share Article"
              >
                {copied ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-green-400" />
                    <span className="text-green-400">Copied</span>
                  </>
                ) : (
                  <>
                    <Share2 className="h-3.5 w-3.5 text-blue-400" />
                    <span>Share</span>
                  </>
                )}
              </button>
            </div>

            {/* Editorial Article Box */}
            <article className="relative rounded-2xl sm:rounded-3xl bg-[#0b0e14] border-2 border-white/15 p-6 sm:p-10 md:p-14 shadow-2xl overflow-hidden before:absolute before:-bottom-2 before:-right-2 before:inset-0 before:rounded-2xl sm:before:rounded-3xl before:border-2 before:border-blue-500/80 before:-z-10 before:pointer-events-none">
              
              {/* Subtle top ambient glow */}
              <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none -z-0" />

              {/* Badges / Category Header */}
              <div className="relative z-10 flex flex-wrap items-center gap-2.5 mb-6">
                <span className="text-xs font-bold uppercase tracking-wider px-3.5 py-1 rounded-full bg-white/10 text-white/90 border border-white/15">
                  {getCategory(selectedBlog)}
                </span>
                <span className="text-xs font-semibold px-3.5 py-1 rounded-full bg-blue-500/15 text-blue-400 border border-blue-500/30 flex items-center gap-1.5">
                  <Clock className="h-3 w-3" />
                  {getReadingTime(selectedBlog)}
                </span>
                <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                  NEW
                </span>
              </div>

              {/* Main Headline */}
              <h1 className="relative z-10 text-2xl sm:text-3xl md:text-5xl font-extrabold uppercase tracking-tight text-white leading-tight font-['Bebas_Neue'] md:font-['Poppins']">
                {getTitle(selectedBlog)}
              </h1>

              {/* Metadata Row */}
              <div className="relative z-10 mt-6 pb-6 border-b border-white/10 flex flex-wrap items-center gap-3 sm:gap-6 text-xs sm:text-sm text-white/70">
                <div className="flex items-center gap-1.5 text-blue-400 font-semibold">
                  <Calendar className="h-4 w-4" />
                  <span>{getFormattedDate(selectedBlog)}</span>
                </div>
                <span className="text-white/30">•</span>
                <div className="flex items-center gap-1.5">
                  <User className="h-4 w-4 text-white/50" />
                  <span className="text-white/90 font-medium">
                    {getPublisher(selectedBlog)}
                  </span>
                </div>
              </div>

              {/* Cover Image */}
              {getImage(selectedBlog) && (
                <div className="relative z-10 my-8 overflow-hidden rounded-xl sm:rounded-2xl border border-white/10 shadow-xl max-h-[440px] group">
                  <img
                    src={getImage(selectedBlog)!}
                    alt={getTitle(selectedBlog)}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
              )}

              {/* Subheading / Standfirst Callout */}
              {selectedBlog.subheading && (
                <div className="relative z-10 my-6 pl-4 border-l-4 border-blue-500 bg-blue-500/5 py-3 pr-4 rounded-r-lg">
                  <p className="text-base sm:text-lg md:text-xl font-semibold text-white/90 leading-relaxed italic">
                    {selectedBlog.subheading}
                  </p>
                </div>
              )}

              {/* Article Content with Editorial Typography */}
              <div className="relative z-10 mt-8 text-base sm:text-lg leading-relaxed text-slate-300 font-normal space-y-6 whitespace-pre-line break-words selection:bg-blue-500 selection:text-white">
                {getContent(selectedBlog)}
              </div>

              {/* Bottom Tags Section */}
              <div className="relative z-10 mt-12 pt-8 border-t border-white/10">
                <div className="flex items-center gap-2 mb-3">
                  <Tag className="h-3.5 w-3.5 text-blue-400" />
                  <span className="text-xs font-bold uppercase tracking-widest text-white/50">
                    TAGS
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {getTags(selectedBlog).map((tag, idx) => (
                    <span
                      key={idx}
                      className="text-xs font-bold tracking-wider uppercase px-3 py-1.5 rounded-lg border border-white/15 bg-white/5 text-white/90 hover:border-blue-500 hover:text-blue-400 hover:bg-blue-500/10 transition-all cursor-default"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Author & RSCOE Mission Footer */}
              <div className="relative z-10 mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
                <div>
                  <p className="text-xs font-extrabold tracking-[0.25em] uppercase text-blue-400">
                    E-CELL RSCOE
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Observe. Question. Build.
                  </p>
                </div>

                <button
                  onClick={handleBackToBlogs}
                  className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white transition-all shadow-lg hover:shadow-blue-500/25"
                >
                  <ArrowLeft className="h-3.5 w-3.5" />
                  All Articles
                </button>
              </div>
            </article>

            {/* Read More Section (Other Articles) */}
            {blogs.filter((b) => String(b.id) !== String(selectedBlog.id)).length > 0 && (
              <div className="mt-16">
                <h3 className="text-2xl font-bold uppercase tracking-tight text-white mb-6 flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-blue-400" />
                  More Insights & Stories
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {blogs
                    .filter((b) => String(b.id) !== String(selectedBlog.id))
                    .slice(0, 2)
                    .map((otherBlog) => (
                      <div
                        key={otherBlog.id}
                        onClick={() => handleSelectBlog(otherBlog)}
                        className="group relative rounded-2xl bg-[#0b0e14] border border-white/10 hover:border-blue-500/60 p-6 transition-all duration-300 hover:-translate-y-1 cursor-pointer flex flex-col justify-between shadow-lg"
                      >
                        <div>
                          <div className="flex items-center gap-2 mb-3">
                            <span className="text-xs font-bold uppercase px-2.5 py-0.5 rounded-full bg-white/10 text-white/80 border border-white/10">
                              {getCategory(otherBlog)}
                            </span>
                            <span className="text-xs text-blue-400 font-medium">
                              {getReadingTime(otherBlog)}
                            </span>
                          </div>
                          <h4 className="text-lg font-bold text-white uppercase group-hover:text-blue-400 transition-colors line-clamp-2">
                            {getTitle(otherBlog)}
                          </h4>
                          <p className="mt-2 text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                            {getExcerpt(otherBlog)}
                          </p>
                        </div>

                        <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between text-xs font-bold text-blue-400">
                          <span>READ ARTICLE</span>
                          <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          /* =======================================================
             EDITORIAL BLOG LISTING VIEW (HERO + FEATURED POSTS)
             ======================================================= */
          <div>
            {/* HERO SECTION */}
            <section className="relative px-6 py-12 md:py-20 overflow-hidden">
              {/* Subtle ambient light glow */}
              <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

              <div className="container mx-auto max-w-6xl">
                <div className="flex flex-col items-start">
                  
                  {/* Eyebrow Label */}
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-widest mb-4">
                    <BookOpen className="h-3.5 w-3.5" />
                    Official Publications
                  </div>

                  {/* Outlined "THE" + Solid "BLOG" Hero Typography */}
                  <div className="flex flex-col select-none">
                    <span className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-extrabold tracking-wider text-transparent [-webkit-text-stroke:2px_rgba(255,255,255,0.75)] font-['Bebas_Neue'] leading-none">
                      THE
                    </span>
                    <span className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-extrabold tracking-wider text-white font-['Bebas_Neue'] leading-none -mt-2 sm:-mt-4">
                      BLOG
                    </span>
                  </div>

                  {/* Editorial Tagline with Blue Vertical Accent Bar */}
                  <div className="flex items-stretch gap-4 mt-6 max-w-2xl">
                    <div className="w-1.5 bg-blue-500 rounded-full shrink-0" />
                    <p className="text-base sm:text-lg md:text-xl font-bold tracking-wider uppercase text-white/90 leading-snug">
                      INSIGHTS FROM THE{" "}
                      <span className="text-blue-500">ENTREPRENEURIAL</span>{" "}
                      FRONTIER.
                    </p>
                  </div>
                </div>

                {/* Search & Filter Bar */}
                <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
                  {/* Category Pills */}
                  <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
                    {categories.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`text-xs font-bold uppercase tracking-wider px-4 py-2 rounded-xl transition-all shrink-0 ${
                          selectedCategory === cat
                            ? "bg-blue-600 text-white shadow-md shadow-blue-500/30"
                            : "bg-card border border-white/10 text-white/70 hover:text-white hover:border-white/20"
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>

                  {/* Search Input */}
                  <div className="relative w-full md:w-72">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
                    <input
                      type="text"
                      placeholder="Search articles..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 rounded-xl bg-card border border-white/10 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-blue-500/60 focus:ring-1 focus:ring-blue-500/60 transition-all"
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* FEATURED POSTS LISTING SECTION */}
            <section className="px-6 py-6">
              <div className="container mx-auto max-w-6xl">
                
                {/* Section Title */}
                <div className="flex items-center justify-between mb-10">
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-tight font-['Bebas_Neue'] text-white">
                    FEATURED <span className="text-blue-500">POSTS</span>
                  </h2>

                  <span className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">
                    {filteredBlogs.length}{" "}
                    {filteredBlogs.length === 1 ? "ARTICLE" : "ARTICLES"}
                  </span>
                </div>

                {/* Blog Cards Grid */}
                {filteredBlogs.length === 0 ? (
                  <div className="text-center py-20 bg-card/40 rounded-3xl border border-white/10 p-8">
                    <BookOpen className="h-12 w-12 text-blue-400/50 mx-auto mb-3" />
                    <h3 className="text-xl font-bold text-white mb-1">
                      No Articles Found
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Try adjusting your search query or selecting a different category.
                    </p>
                    {searchQuery && (
                      <button
                        onClick={() => {
                          setSearchQuery("");
                          setSelectedCategory("ALL");
                        }}
                        className="mt-4 text-xs font-bold uppercase tracking-wider text-blue-400 hover:underline"
                      >
                        Clear Filters
                      </button>
                    )}
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10">
                    {filteredBlogs.map((blog, idx) => (
                      <article
                        key={blog.id}
                        onClick={() => handleSelectBlog(blog)}
                        className="group relative rounded-2xl sm:rounded-3xl bg-[#0b0e14] border-2 border-white/15 p-6 sm:p-8 md:p-9 transition-all duration-300 hover:-translate-y-2 cursor-pointer flex flex-col justify-between shadow-2xl overflow-hidden before:absolute before:-bottom-2 before:-right-2 before:inset-0 before:rounded-2xl sm:before:rounded-3xl before:border-2 before:border-blue-500/80 before:-z-10 before:pointer-events-none group-hover:before:border-blue-400 group-hover:border-blue-500/50"
                      >
                        {/* Top Metadata Badges */}
                        <div>
                          <div className="flex flex-wrap items-center gap-2 mb-5">
                            <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-white/10 text-white/90 border border-white/15">
                              {getCategory(blog)}
                            </span>
                            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-blue-500/15 text-blue-400 border border-blue-500/30 flex items-center gap-1.5">
                              <Clock className="h-3 w-3" />
                              {getReadingTime(blog)}
                            </span>
                            {idx === 0 && (
                              <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                                NEW
                              </span>
                            )}
                          </div>

                          {/* Image Thumbnail (if exists) */}
                          {getImage(blog) && (
                            <div className="mb-5 overflow-hidden rounded-xl border border-white/10 h-44 sm:h-52">
                              <img
                                src={getImage(blog)!}
                                alt={getTitle(blog)}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                              />
                            </div>
                          )}

                          {/* Blog Title */}
                          <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold uppercase tracking-tight text-white leading-tight font-['Bebas_Neue'] md:font-['Poppins'] group-hover:text-blue-400 transition-colors">
                            {getTitle(blog)}
                          </h3>

                          {/* Blog Excerpt */}
                          {getExcerpt(blog) && (
                            <p className="mt-3 text-sm md:text-base text-muted-foreground line-clamp-3 leading-relaxed">
                              {getExcerpt(blog)}
                            </p>
                          )}
                        </div>

                        {/* Card Footer: Metadata & CTA */}
                        <div className="mt-8 pt-5 border-t border-white/10 flex items-center justify-between gap-4">
                          <div className="flex items-center gap-2 text-xs text-white/60">
                            <Calendar className="h-3.5 w-3.5 text-blue-400" />
                            <span>{getFormattedDate(blog)}</span>
                          </div>

                          <div className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold uppercase tracking-wider text-white group-hover:text-blue-400 transition-colors">
                            <span>READ ARTICLE</span>
                            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
                          </div>
                        </div>
                      </article>
                    ))}
                  </div>
                )}
              </div>
            </section>
          </div>
        )}
      </main>

      <SiteFooter />
    </div>
  );
};

export default BlogDetails;