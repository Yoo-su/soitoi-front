import { useEffect, useState } from "react";
import { Button } from "@headlessui/react";
import { cn } from "@/shared/utils";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // 스크롤 Y좌표가 80px을 넘어가면 scrolled 상태 활성화
      setScrolled(window.scrollY > 80);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "bg-white fixed top-0 w-full shadow-md flex items-center justify-between transition-all duration-500",
        scrolled ? "bg-opacity-50" : "bg-opacity-100",
        scrolled ? "p-2" : "p-3"
      )}
    >
      <div className="flex items-center gap-4">
        <Button className="w-6 h-6">☰</Button>
      </div>

      <nav className={cn("lg:flex gap-6 items-center hidden")}>
        {["Home", "Chat", "Work", ""].map((item) => (
          <a
            href="#"
            key={item}
            className="text-gray-800 hover:text-green-600 text-sm font-medium"
          >
            {item}
          </a>
        ))}
      </nav>

      <div className="flex items-center gap-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search"
            className="border border-gray-300 rounded-full px-3 py-1 text-sm focus:outline-none focus:ring focus:ring-green-300"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
