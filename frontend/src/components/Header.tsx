import React, { useState } from "react";
import { Menu, X, Phone, Heart, MapPin } from "lucide-react";
import { ViewType } from "../types";

interface HeaderProps {
  currentView: ViewType;
  onNavigate: (view: ViewType) => void;
}

export default function Header({ currentView, onNavigate }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { label: "Trang Chủ", view: { type: "home" } as ViewType, path: "/" },
    { label: "Sản Phẩm", view: { type: "products" } as ViewType, path: "/san-pham" },
    { label: "Dự Án/Công Trình", view: { type: "projects" } as ViewType, path: "/du-an" },
    { label: "Bài Viết", view: { type: "posts" } as ViewType, path: "/bai-viet" },
    { label: "Liên Hệ", view: { type: "contact" } as ViewType, path: "/lien-he" },
  ];

  const isActive = (itemView: ViewType) => {
    if (currentView.type === itemView.type) {
      if (currentView.type === "products" && itemView.type === "products") {
        return !currentView.categorySlug;
      }
      return true;
    }
    return false;
  };

  const handleNavClick = (view: ViewType, e: React.MouseEvent) => {
    e.preventDefault();
    onNavigate(view);
    setIsOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-beige border-b border-beige-dark/60 shadow-xs">
      {/* Top Bar with urgent contact */}
      <div className="bg-clay text-beige text-xs py-2 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-1">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 font-mono">
              <Phone className="w-3.5 h-3.5 text-bronze" /> Hotline tư vấn 24/7: 0987.654.321
            </span>
            <span className="hidden md:flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-bronze" /> Làng nghề đá mỹ nghệ Ninh Vân, Ninh Bình
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[10px] sm:text-xs bg-clay-dark/60 text-bronze px-2 py-0.5 rounded-sm border border-bronze/30">
              Chạm Khắc Chữ Sâu Mạ Vàng 24K
            </span>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo Brand Brandmark */}
          <div 
            onClick={(e) => handleNavClick({ type: "home" }, e)}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-12 h-12 rounded-sm bg-clay flex items-center justify-center traditional-border transition-transform group-hover:scale-105 shadow-sm">
              <span className="font-serif font-bold text-xl text-bronze">TA</span>
            </div>
            <div>
              <h1 className="font-serif font-bold text-lg sm:text-xl text-stone-charcoal tracking-wide flex items-center gap-1.5 leading-none">
                ĐÁ TÂM AN
              </h1>
              <span className="text-[10px] sm:text-xs uppercase tracking-widest text-clay font-medium block mt-0.5">
                Bia Mộ Đá Mỹ Nghệ Cao Cấp
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navItems.map((item, idx) => (
              <a
                key={idx}
                href={item.path}
                onClick={(e) => handleNavClick(item.view, e)}
                className={`font-serif text-[15px] font-medium tracking-wide transition-colors relative py-2 ${
                  isActive(item.view)
                    ? "text-clay font-semibold"
                    : "text-stone-charcoal/80 hover:text-clay"
                }`}
              >
                {item.label}
                {isActive(item.view) && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-clay rounded-full" />
                )}
              </a>
            ))}
          </nav>

          {/* CTA Desktop Button */}
          <div className="hidden lg:flex items-center">
            <a
              href="/lien-he"
              onClick={(e) => handleNavClick({ type: "contact" }, e)}
              className="px-5 py-2.5 bg-clay text-beige text-xs font-semibold uppercase tracking-wider hover:bg-clay-dark transition-all rounded-sm traditional-border flex items-center gap-2"
            >
              <Heart className="w-4.5 h-4.5 text-bronze animate-pulse" />
              Đặt Chế Tác Ngay
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-stone-charcoal hover:text-clay focus:outline-none"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {isOpen && (
        <div className="lg:hidden border-t border-beige-dark bg-beige/95 backdrop-blur-md transition-all">
          <div className="px-2 pt-2 pb-4 space-y-1 sm:px-3">
            {navItems.map((item, idx) => (
              <a
                key={idx}
                href={item.path}
                onClick={(e) => handleNavClick(item.view, e)}
                className={`block px-4 py-3 rounded-xs font-serif text-[16px] tracking-wide ${
                  isActive(item.view)
                    ? "bg-clay-light text-clay font-semibold"
                    : "text-stone-charcoal hover:bg-beige-paper hover:text-clay"
                }`}
              >
                {item.label}
              </a>
            ))}
            <div className="pt-4 pb-2 border-t border-beige-dark/60 px-4">
              <a
                href="/lien-he"
                onClick={(e) => handleNavClick({ type: "contact" }, e)}
                className="w-full py-3 bg-clay text-beige text-xs font-semibold uppercase tracking-wider hover:bg-clay-dark transition-all rounded-sm text-center block traditional-border"
              >
                Yêu Cầu Gọi Lại Tư Vấn
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
