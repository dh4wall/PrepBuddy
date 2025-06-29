'use client'

import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import Image from 'next/image';

const Sidebar = ({ user }: { user: { id: string; name: string; email: string; profileURL?: string } }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);
  const overlayRef = useRef(null);
  const sidebarContentRef = useRef(null);
  const router = useRouter();

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setIsSidebarOpen(false);

  useEffect(() => {
    const sidebar = sidebarRef.current;
    const overlay = overlayRef.current;
    const content = sidebarContentRef.current;

    if (isSidebarOpen) {
      gsap.set(sidebar, { display: 'flex' });
      gsap.fromTo(overlay, { opacity: 0 }, { opacity: 1, duration: 0.3, ease: 'power2.out' });
      gsap.fromTo(content, { x: '100%' }, { x: '0%', duration: 0.4, ease: 'power3.out' });
    } else {
      gsap.to(overlay, { opacity: 0, duration: 0.3, ease: 'power2.out' });
      gsap.to(content, {
        x: '100%', duration: 0.4, ease: 'power3.in',
        onComplete: () => { gsap.set(sidebar, { display: 'none' }); }
      });
    }
  }, [isSidebarOpen]);

  const handleOverlayClick = (e: any) => {
    if (e.target === overlayRef.current) closeSidebar();
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/logout', { method: 'POST', credentials: 'include' });
      toast.success('Logged out successfully.');
      router.push('/start');
    } catch (error) {
      console.error(error);
      toast.error('Error logging out. Please try again.');
    }
  };

  const handleProfile = () => { console.log('Profile clicked'); closeSidebar(); };
  const handleSubscription = () => { console.log('Subscription clicked'); closeSidebar(); };

  return (
    <>
      <button
        onClick={toggleSidebar}
        className="relative p-2 rounded-full bg-dark-200 border border-border hover:bg-dark-300 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-200 focus:ring-offset-2 focus:ring-offset-dark-100"
      >
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      <div ref={sidebarRef} className="fixed inset-0 z-50 hidden" style={{ display: 'none' }}>
        <div
          ref={overlayRef}
          className="fixed inset-0 bg-[#1a1a1a]/50 backdrop-blur-sm"
          onClick={handleOverlayClick}
        />
        <div
          ref={sidebarContentRef}
          className="fixed right-0 top-0 h-full w-80 bg-dark-200 border-l border-border shadow-2xl"
          style={{ transform: 'translateX(100%)' }}
        >
          <div className="flex items-center justify-between p-6 border-b border-border">
            <h2 className="text-xl font-semibold text-white">Menu</h2>
            <button onClick={closeSidebar} className="p-2 rounded-full hover:bg-dark-300 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-200">
              <svg className="w-5 h-5 text-light-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="p-6 border-b border-border">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-full overflow-hidden border border-border">
                <Image
                src={user.profileURL || '/default-avatar.png'}
                alt="User Avatar"
                width={48}
                  height={48}
                className="w-full h-full object-cover rounded-full"
                />
              </div>
              <div>
                <h3 className="text-white font-semibold">{user.name}</h3>
                <p className="text-light-100 text-sm">{user.email}</p>
              </div>
            </div>
          </div>

          <div className="py-4">
            <button onClick={handleProfile} className="w-full flex items-center space-x-4 px-6 py-4 text-left hover:bg-dark-300 transition-colors duration-200 group">
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

            <button onClick={handleSubscription} className="w-full flex items-center space-x-4 px-6 py-4 text-left hover:bg-dark-300 transition-colors duration-200 group">
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

            <button onClick={handleLogout} className="w-full flex items-center space-x-4 px-6 py-4 text-left hover:bg-destructive-100/10 transition-colors duration-200 group">
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

export default Sidebar;
