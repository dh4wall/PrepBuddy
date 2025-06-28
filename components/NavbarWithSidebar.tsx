'use client'

import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const NavbarWithSidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);
  const overlayRef = useRef(null);
  const sidebarContentRef = useRef(null);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  useEffect(() => {
    const sidebar = sidebarRef.current;
    const overlay = overlayRef.current;
    const content = sidebarContentRef.current;

    if (isSidebarOpen) {
      gsap.set(sidebar, { display: 'flex' });
      gsap.fromTo(overlay, 
        { opacity: 0 },
        { opacity: 1, duration: 0.3, ease: 'power2.out' }
      );
      gsap.fromTo(content,
        { x: '100%' },
        { x: '0%', duration: 0.4, ease: 'power3.out' }
      );
    } else {
      gsap.to(overlay, {
        opacity: 0,
        duration: 0.3,
        ease: 'power2.out'
      });
      gsap.to(content, {
        x: '100%',
        duration: 0.4,
        ease: 'power3.in',
        onComplete: () => {
          gsap.set(sidebar, { display: 'none' });
        }
      });
    }
  }, [isSidebarOpen]);

  const handleOverlayClick = (e:any) => {
    if (e.target === overlayRef.current) {
      closeSidebar();
    }
  };

  const handleLogout = () => {
    console.log('Logout clicked');
    closeSidebar();
  };

  const handleProfile = () => {
    console.log('Profile clicked');
    closeSidebar();
  };

  const handleSubscription = () => {
    console.log('Subscription clicked');
    closeSidebar();
  };

  return (
    <>
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-40 bg-dark-100 border-b border-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <div className="text-2xl font-bold bg-gradient-to-r from-primary-200 to-primary-100 bg-clip-text text-transparent">
                PrepBuddy
              </div>
            </div>
            
            {/* Profile Icon */}
            <button
              onClick={toggleSidebar}
              className="relative p-2 rounded-full bg-dark-200 border border-border hover:bg-dark-300 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-200 focus:ring-offset-2 focus:ring-offset-dark-100"
            >
              <div className="w-8 h-8 bg-gradient-to-r from-primary-200 to-primary-100 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-dark-100" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* Sidebar Overlay */}
      <div
        ref={sidebarRef}
        className="fixed inset-0 z-50 hidden"
        style={{ display: 'none' }}
      >
        {/* Backdrop */}
        <div
          ref={overlayRef}
          className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
          onClick={handleOverlayClick}
        />
        
        {/* Sidebar Content */}
        <div
          ref={sidebarContentRef}
          className="fixed right-0 top-0 h-full w-80 bg-dark-200 border-l border-border shadow-2xl"
          style={{ transform: 'translateX(100%)' }}
        >
          {/* Sidebar Header */}
          <div className="flex items-center justify-between p-6 border-b border-border">
            <h2 className="text-xl font-semibold text-white">Menu</h2>
            <button
              onClick={closeSidebar}
              className="p-2 rounded-full hover:bg-dark-300 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-200"
            >
              <svg className="w-5 h-5 text-light-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* User Info Section */}
          <div className="p-6 border-b border-border">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-primary-200 to-primary-100 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-dark-100" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h3 className="text-white font-semibold">John Doe</h3>
                <p className="text-light-100 text-sm">john.doe@example.com</p>
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <div className="py-4">
            <button
              onClick={handleProfile}
              className="w-full flex items-center space-x-4 px-6 py-4 text-left hover:bg-dark-300 transition-colors duration-200 group"
            >
              <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-dark-300 group-hover:bg-primary-200 transition-colors duration-200">
                <svg className="w-5 h-5 text-light-100 group-hover:text-dark-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div>
                <div className="text-white font-medium">Profile</div>
                <div className="text-light-100 text-sm">Manage your account</div>
              </div>
            </button>

            <button
              onClick={handleSubscription}
              className="w-full flex items-center space-x-4 px-6 py-4 text-left hover:bg-dark-300 transition-colors duration-200 group"
            >
              <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-dark-300 group-hover:bg-primary-200 transition-colors duration-200">
                <svg className="w-5 h-5 text-light-100 group-hover:text-dark-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <div>
                <div className="text-white font-medium">Subscription</div>
                <div className="text-light-100 text-sm">Manage your plan</div>
              </div>
            </button>

            <div className="border-t border-border my-4"></div>

            <button
              onClick={handleLogout}
              className="w-full flex items-center space-x-4 px-6 py-4 text-left hover:bg-destructive-100/10 transition-colors duration-200 group"
            >
              <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-dark-300 group-hover:bg-destructive-100 transition-colors duration-200">
                <svg className="w-5 h-5 text-light-100 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
              </div>
              <div>
                <div className="text-white font-medium group-hover:text-destructive-100">Logout</div>
                <div className="text-light-100 text-sm">Sign out of your account</div>
              </div>
            </button>
          </div>

          {/* Footer */}
          <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-border">
            <div className="text-center">
              <div className="text-sm text-light-100 mb-2">PrepBuddy v1.0.0</div>
              <div className="text-xs text-light-100 opacity-70">© 2025 PrepBuddy. All rights reserved.</div>
            </div>
          </div>
        </div>
      </div>

      
      
    </>
  );
};

export default NavbarWithSidebar;