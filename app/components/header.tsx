import { PawPrint } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router";
import { Button } from "~/components/ui/button";

export function Header({ className }: { className?: string }) {
  const [y, setY] = useState(0);
  const location = useLocation();
  const isHome = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => setY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`
        "bg-primary/80  text-contrast"
        ${!isHome && y > 50 ? "shadow-lightHeader" : ""}
        h-nav lg:flex items-center sticky transition duration-300 backdrop-blur-lg z-40 top-0 justify-between w-full leading-none px-20 py-4
        ${className}
      `}
    >
      <div className="flex items-center justify-between w-full">
        <Link to="/" className="flex items-center space-x-2">
          <PawPrint className="h-6 w-6" />
          <span className="text-xl font-bold">uma-arai Container shop</span>
        </Link>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Button variant="ghost" asChild>
                <Link to="/pets">Find your buddy</Link>
              </Button>
            </li>
            <li>
              <Button variant="ghost" asChild>
                <Link to="/about">About</Link>
              </Button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
