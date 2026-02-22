"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";
import { useAuth } from "../context/AuthContext";
import {
  Menu,
  X,
  LogOut,
  MapPin,
  Compass,
  LayoutDashboard,
  BookOpen,
  Camera,
  Wallet,
} from "lucide-react";

export default function Navbar() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const resetDistrict = () => {
    localStorage.removeItem("district");
    setIsMenuOpen(false);
    router.push("/");
    setTimeout(() => window.location.reload(), 100);
  };

  async function handleLogout() {
    try {
      if (typeof logout === "function") await logout();
      else await signOut(auth);
      setIsMenuOpen(false);
      router.push("/login");
    } catch (err) {
      console.error("Logout Error:", err);
    }
  }

  const navLinks = [
    { name: "Explore",   href: "/",          icon: <Compass size={15} /> },
    { name: "Planner",   href: "/planner",    icon: <MapPin size={15} /> },
    { name: "Dashboard", href: "/dashboard",  icon: <LayoutDashboard size={15} /> },
    { name: "Heritage",  href: "/archive",    icon: <BookOpen size={15} /> },
    { name: "AR View",   href: "/ar",         icon: <Camera size={15} /> },
    { name: "Pricing",   href: "/providers",  icon: <Wallet size={15} /> },
  ];

  const isActive = (path: string) => pathname === path;

  return (
    <>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; }

        .nav-wrap {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 1000;
          padding: 12px 16px;
          transition: padding 0.35s ease;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
        }

        .nav-wrap.scrolled { padding: 8px 16px; }

        /* ── Island ── */
        .nav-island {
          max-width: 1200px;
          margin: 0 auto;
          height: 60px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 20px;
          background: rgba(255, 255, 255, 0.92);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid #daeeff;
          border-radius: 20px;
          box-shadow: 0 2px 16px rgba(14, 165, 233, 0.07);
          transition: box-shadow 0.35s ease, background 0.35s ease;
          gap: 12px;
        }

        .scrolled .nav-island {
          background: rgba(255, 255, 255, 0.98);
          box-shadow: 0 4px 24px rgba(14, 165, 233, 0.12);
        }

        /* ── Logo ── */
        .logo {
          display: flex;
          align-items: center;
          gap: 9px;
          text-decoration: none;
          flex-shrink: 0;
        }

        .logo-icon {
          width: 34px;
          height: 34px;
          background: #0ea5e9;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          flex-shrink: 0;
          transition: transform 0.3s ease;
        }

        .logo:hover .logo-icon { transform: rotate(12deg); }

        .logo-text {
          font-size: 1rem;
          font-weight: 700;
          letter-spacing: -0.03em;
          color: #0c2340;
        }

        .logo-text span { color: #0ea5e9; }

        /* ── Desktop Links ── */
        .desktop-links {
          display: none;
          align-items: center;
          gap: 2px;
        }

        @media (min-width: 1024px) { .desktop-links { display: flex; } }

        .nav-link {
          display: flex;
          align-items: center;
          gap: 5px;
          padding: 6px 12px;
          border-radius: 10px;
          font-size: 0.8125rem;
          font-weight: 600;
          color: #64748b;
          text-decoration: none;
          transition: all 0.18s ease;
          white-space: nowrap;
        }

        .nav-link:hover {
          background: #f0f9ff;
          color: #0284c7;
        }

        .nav-link.active {
          background: #0ea5e9;
          color: #fff;
        }

        /* ── Desktop Actions ── */
        .desktop-actions {
          display: none;
          align-items: center;
          gap: 10px;
          flex-shrink: 0;
        }

        @media (min-width: 1024px) { .desktop-actions { display: flex; } }

        .district-btn {
          display: flex;
          align-items: center;
          gap: 5px;
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: #0369a1;
          background: #e0f2fe;
          border: 1px solid #bae6fd;
          padding: 6px 12px;
          border-radius: 9px;
          cursor: pointer;
          transition: all 0.18s ease;
        }

        .district-btn:hover {
          background: #bae6fd;
          border-color: #7dd3fc;
        }

        .v-line {
          width: 1px;
          height: 24px;
          background: #dbeafe;
        }

        .user-row {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 4px 4px 4px 10px;
          border: 1px solid #dbeafe;
          border-radius: 12px;
          background: #f8fbff;
        }

        .user-name {
          font-size: 0.8rem;
          font-weight: 600;
          color: #0c2340;
          max-width: 88px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .avatar {
          width: 30px;
          height: 30px;
          background: #0ea5e9;
          color: #fff;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.7rem;
          font-weight: 800;
          text-transform: uppercase;
          flex-shrink: 0;
        }

        .logout-btn {
          padding: 6px;
          border-radius: 7px;
          background: transparent;
          border: none;
          cursor: pointer;
          color: #94a3b8;
          display: flex;
          align-items: center;
          transition: all 0.18s ease;
        }

        .logout-btn:hover {
          background: #fee2e2;
          color: #ef4444;
        }

        .login-link {
          padding: 7px 18px;
          background: #0ea5e9;
          color: #fff;
          border-radius: 10px;
          font-size: 0.8125rem;
          font-weight: 700;
          text-decoration: none;
          transition: all 0.18s ease;
          box-shadow: 0 2px 10px rgba(14,165,233,0.25);
        }

        .login-link:hover {
          background: #0284c7;
          transform: translateY(-1px);
          box-shadow: 0 4px 16px rgba(14,165,233,0.35);
        }

        /* ── Mobile Toggle ── */
        .mobile-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          border-radius: 10px;
          border: 1px solid #dbeafe;
          background: #f0f9ff;
          cursor: pointer;
          color: #0369a1;
          transition: all 0.18s ease;
          flex-shrink: 0;
        }

        .mobile-btn:hover { background: #e0f2fe; }

        @media (min-width: 1024px) { .mobile-btn { display: none; } }

        /* ── Mobile Drawer ── */
        .mobile-drawer {
          max-width: 1200px;
          margin: 8px auto 0;
          background: #fff;
          border: 1px solid #daeeff;
          border-radius: 18px;
          overflow: hidden;
          box-shadow: 0 8px 32px rgba(14,165,233,0.1);
          animation: dropIn 0.22s ease forwards;
        }

        @keyframes dropIn {
          from { opacity: 0; transform: translateY(-6px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        @media (min-width: 1024px) { .mobile-drawer { display: none !important; } }

        .drawer-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 6px;
          padding: 12px;
        }

        @media (min-width: 480px) {
          .drawer-grid { grid-template-columns: repeat(6, 1fr); }
        }

        .drawer-link {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 5px;
          padding: 12px 8px;
          border-radius: 12px;
          text-decoration: none;
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.02em;
          color: #475569;
          background: #f8fbff;
          border: 1px solid transparent;
          transition: all 0.18s ease;
        }

        .drawer-link:hover {
          background: #e0f2fe;
          color: #0284c7;
          border-color: #bae6fd;
        }

        .drawer-link.active {
          background: #0ea5e9;
          color: #fff;
          border-color: #0ea5e9;
        }

        .drawer-footer {
          padding: 10px 12px 12px;
          border-top: 1px solid #eef6ff;
          display: flex;
          gap: 8px;
        }

        .drawer-district {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          padding: 11px;
          border-radius: 12px;
          background: #e0f2fe;
          border: 1px solid #bae6fd;
          color: #0369a1;
          font-weight: 700;
          font-size: 0.8125rem;
          cursor: pointer;
          transition: background 0.18s;
        }

        .drawer-district:hover { background: #bae6fd; }

        .drawer-logout {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          padding: 11px;
          border-radius: 12px;
          background: #fef2f2;
          border: 1px solid #fecaca;
          color: #ef4444;
          font-weight: 700;
          font-size: 0.8125rem;
          cursor: pointer;
          transition: background 0.18s;
        }

        .drawer-logout:hover { background: #fecaca; }

        .drawer-login {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 11px;
          border-radius: 12px;
          background: #0ea5e9;
          color: #fff;
          font-weight: 700;
          font-size: 0.8125rem;
          text-decoration: none;
          box-shadow: 0 2px 10px rgba(14,165,233,0.25);
        }

        /* ── Spacer ── */
        .nav-spacer { height: 84px; }
      `}</style>

      <div className={`nav-wrap${scrolled ? " scrolled" : ""}`}>
        <nav className="nav-island">

          {/* Logo */}
          <Link href="/" className="logo">
            <div className="logo-icon">
              <Compass size={17} />
            </div>
            <span className="logo-text">Coastal<span>Connect</span></span>
          </Link>

          {/* Desktop Links */}
          <div className="desktop-links">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`nav-link${isActive(link.href) ? " active" : ""}`}
              >
                {link.icon}
                {link.name}
              </Link>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="desktop-actions">
            <button className="district-btn" onClick={resetDistrict}>
              <MapPin size={11} />
              Change District
            </button>

            <div className="v-line" />

            {user ? (
              <div className="user-row">
                <span className="user-name">{user.email?.split("@")[0]}</span>
                <div className="avatar">{user.email?.[0]}</div>
                <button className="logout-btn" onClick={handleLogout} title="Logout">
                  <LogOut size={15} />
                </button>
              </div>
            ) : (
              <Link href="/login" className="login-link">Login</Link>
            )}
          </div>

          {/* Mobile Toggle */}
          <button className="mobile-btn" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </nav>

        {/* Mobile Drawer */}
        {isMenuOpen && (
          <div className="mobile-drawer">
            <div className="drawer-grid">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`drawer-link${isActive(link.href) ? " active" : ""}`}
                >
                  {link.icon}
                  {link.name}
                </Link>
              ))}
            </div>

            <div className="drawer-footer">
              <button className="drawer-district" onClick={resetDistrict}>
                <MapPin size={15} /> Change District
              </button>

              {user ? (
                <button className="drawer-logout" onClick={handleLogout}>
                  <LogOut size={15} /> Logout
                </button>
              ) : (
                <Link
                  href="/login"
                  className="drawer-login"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="nav-spacer" />
    </>
  );
}