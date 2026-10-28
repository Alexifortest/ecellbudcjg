import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Link } from "react-router-dom";
import { ArrowRight, Calendar, Clock, BookOpen, Sparkles } from "lucide-react";

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
}

const BlogsSection = () => {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLatestBlogs = async () => {
      try {
        const { data, error } = await supabase
          .from("blogs")
          .select("*");

        if (error) {
          console.error("Error fetching blogs for home section:", error);
          return;
        }

        if (data && data.length > 0) {
          const sorted = [...data].sort((a, b) => {
            const timeA = new Date(
              a.published_at || a.date || a.created_at || 0
            ).getTime();
            const timeB = new Date(
              b.published_at || b.date || b.created_at || 0
            ).getTime();
            return timeB - timeA;
          });
          setBlogs(sorted.slice(0, 2));
        }
      } catch (err) {
        console.error("Error in BlogsSection:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchLatestBlogs();
  }, []);

  if (loading || blogs.length === 0) return null;

  const getTitle = (b: BlogPost) => b.title || "Untitled Article";

  const getExcerpt = (b: BlogPost) => {
    if (b.subheading) return b.subheading;
    if (b.short_description) return b.short_description;
    const body = b.main_content || b.content || "";
    return body ? body.slice(0, 140).trim() + "..." : "";
  };

  const getImage = (b: BlogPost) => b.cover_image || b.image || null;

  const getCategory = (b: BlogPost) => b.category || "ENTREPRENEURSHIP";

  const getReadingTime = (b: BlogPost) => {
    const content = b.main_content || b.content || "";
    const words = content.trim().split(/\s+/).length;
    const mins = Math.max(1, Math.ceil(words / 180));
    return `${mins} min read`;
  };

  const getFormattedDate = (b: BlogPost) => {
    const raw = b.date || b.published_at || b.created_at;
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

  return (
    <section className="py-20 md:py-28 relative overflow-hidden" id="blogs">
      {/* Background ambient light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[36rem] h-[36rem] bg-blue-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="container mx-auto px-6 max-w-6xl">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-widest mb-3">
              <BookOpen className="h-3.5 w-3.5" />
              From Our Blog
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-tight font-['Bebas_Neue'] text-white">
              LATEST <span className="text-blue-500">INSIGHTS</span>
            </h2>

            <p className="text-muted-foreground text-sm sm:text-base mt-2 max-w-xl">
              Stories, playbooks, and ideas from the innovation & entrepreneurship ecosystem.
            </p>
          </div>

          <Link
            to="/blogdetails"
            className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-blue-400 hover:text-blue-300 transition-colors group self-start md:self-auto"
          >
            <span>VIEW ALL ARTICLES</span>
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Featured Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10">
          {blogs.map((blog, idx) => (
            <Link
              key={blog.id}
              to={`/blogdetails?id=${blog.id}`}
              className="group relative rounded-2xl sm:rounded-3xl bg-[#0b0e14] border-2 border-white/15 p-6 sm:p-8 md:p-9 transition-all duration-300 hover:-translate-y-2 flex flex-col justify-between shadow-2xl overflow-hidden before:absolute before:-bottom-2 before:-right-2 before:inset-0 before:rounded-2xl sm:before:rounded-3xl before:border-2 before:border-blue-500/80 before:-z-10 before:pointer-events-none group-hover:before:border-blue-400 group-hover:border-blue-500/50"
            >
              <div>
                {/* Badges */}
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

                {/* Optional Image */}
                {getImage(blog) && (
                  <div className="mb-5 overflow-hidden rounded-xl border border-white/10 h-44 sm:h-52">
                    <img
                      src={getImage(blog)!}
                      alt={getTitle(blog)}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                )}

                {/* Title */}
                <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold uppercase tracking-tight text-white leading-tight font-['Bebas_Neue'] md:font-['Poppins'] group-hover:text-blue-400 transition-colors">
                  {getTitle(blog)}
                </h3>

                {/* Excerpt */}
                {getExcerpt(blog) && (
                  <p className="mt-3 text-sm md:text-base text-muted-foreground line-clamp-3 leading-relaxed">
                    {getExcerpt(blog)}
                  </p>
                )}
              </div>

              {/* Card Bottom Row */}
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
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogsSection;