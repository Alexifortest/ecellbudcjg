import { ReactNode, useState } from "react";
import { useNavigate } from "react-router-dom";

interface BlogPageTransitionProps {
  children: ReactNode;
}

const BlogPageTransition = ({ children }: BlogPageTransitionProps) => {
  const [closing, setClosing] = useState(false);
  const navigate = useNavigate();

  const handleClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    const link = target.closest("a[href='/blogs']");

    if (!link) return;

    e.preventDefault();

    if (closing) return;

    setClosing(true);

    setTimeout(() => {
      navigate("/blogs");
    }, 900);
  };

  return (
    <div className="relative">
      <div
        onClick={handleClick}
        className={closing ? "blog-transition closing" : "blog-transition"}
      >
        {children}
      </div>

      {closing && (
        <div className="crumple-overlay">
          <div className="crumple-paper">
            <div className="crumple-line line-1" />
            <div className="crumple-line line-2" />
            <div className="crumple-line line-3" />
            <div className="crumple-line line-4" />
            <div className="crumple-line line-5" />
          </div>
        </div>
      )}

      <style>{`
        .blog-transition {
          transition: opacity 0.9s ease;
        }

        .blog-transition.closing {
          opacity: 0;
        }

        .crumple-overlay {
          position: fixed;
          inset: 0;
          z-index: 99999;
          display: flex;
          align-items: center;
          justify-content: center;
          pointer-events: none;
        }

        .crumple-paper {
          width: 260px;
          height: 330px;
          background: #f7f0df;
          position: relative;

          box-shadow:
            0 25px 60px rgba(50, 40, 25, 0.3),
            inset 0 0 30px rgba(100, 80, 50, 0.08);

          animation: crumplePaper 0.9s cubic-bezier(0.65, 0, 0.35, 1)
            forwards;
        }

        .crumple-line {
          position: absolute;
          height: 2px;
          background: rgba(100, 80, 50, 0.18);
          transform-origin: center;
        }

        .line-1 {
          width: 220px;
          top: 70px;
          left: 20px;
          transform: rotate(17deg);
        }

        .line-2 {
          width: 230px;
          top: 125px;
          left: 15px;
          transform: rotate(-23deg);
        }

        .line-3 {
          width: 210px;
          top: 180px;
          left: 25px;
          transform: rotate(15deg);
        }

        .line-4 {
          width: 200px;
          top: 235px;
          left: 30px;
          transform: rotate(-18deg);
        }

        .line-5 {
          width: 180px;
          top: 275px;
          left: 40px;
          transform: rotate(12deg);
        }

        @keyframes crumplePaper {
          0% {
            transform: scale(1) rotate(0deg);
            border-radius: 0;
            opacity: 1;
          }

          25% {
            transform: scale(0.9) rotate(7deg);
            border-radius: 10px;
          }

          50% {
            transform: scale(0.65) rotate(-10deg);
            border-radius: 25px;
          }

          72% {
            transform: scale(0.35) rotate(15deg);
            border-radius: 45px;
          }

          90% {
            transform: scale(0.12) rotate(-20deg);
            border-radius: 50%;
          }

          100% {
            transform: scale(0) rotate(30deg);
            border-radius: 50%;
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default BlogPageTransition;