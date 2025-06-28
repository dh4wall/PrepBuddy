'use client';
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { useRouter } from 'next/navigation';

const LandingPage = () => {

  const router = useRouter();
  
  const heroRef = useRef(null);
  const featuresRef = useRef(null);
  const howItWorksRef = useRef(null);
  const statsRef = useRef(null);
  const testimonialsRef = useRef(null);
  const ctaRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const tl = gsap.timeline();
    
    tl.from('.hero-content', {
      y: 50,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: 'power2.out'
    });

    gsap.from('.feature-card', {
      y: 80,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2,
      scrollTrigger: {
        trigger: featuresRef.current,
        start: 'top 80%',
        end: 'bottom 20%',
      }
    });

    gsap.from('.step-card', {
      x: -50,
      opacity: 0,
      duration: 0.8,
      stagger: 0.3,
      scrollTrigger: {
        trigger: howItWorksRef.current,
        start: 'top 80%',
      }
    });

    gsap.from('.stat-item', {
      scale: 0.8,
      opacity: 0,
      duration: 0.6,
      stagger: 0.1,
      scrollTrigger: {
        trigger: statsRef.current,
        start: 'top 80%',
      }
    });

    gsap.from('.testimonial-card', {
      y: 60,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2,
      scrollTrigger: {
        trigger: testimonialsRef.current,
        start: 'top 80%',
      }
    });

    gsap.from('.cta-content', {
      y: 40,
      opacity: 0,
      duration: 0.8,
      scrollTrigger: {
        trigger: ctaRef.current,
        start: 'top 80%',
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-dark-100 via-dark-200 to-dark-300 text-white overflow-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-dark-100/80 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="text-2xl font-bold bg-gradient-to-r from-primary-200 to-primary-100 bg-clip-text text-transparent">
                PrepBuddy
              </div>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                <a href="#features" className="text-light-100 hover:text-primary-200 transition-colors">Features</a>
                <a href="#how-it-works" className="text-light-100 hover:text-primary-200 transition-colors">How It Works</a>
                <a href="#testimonials" className="text-light-100 hover:text-primary-200 transition-colors">Reviews</a>
                <a href="#pricing" className="text-light-100 hover:text-primary-200 transition-colors">Pricing</a>
              </div>
            </div>
            
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section ref={heroRef} className="pt-32 pb-20 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="hero-content">
                <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                  Master Your
                  <span className="bg-gradient-to-r from-primary-200 to-primary-100 bg-clip-text text-transparent">
                    {' '}Interview{' '}
                  </span>
                  Skills
                </h1>
              </div>
              <div className="hero-content">
                <p className="text-xl text-light-100 leading-relaxed max-w-xl">
                  Practice with AI-powered mock interviews tailored to your dream job. Get real-time feedback and build confidence for your next opportunity.
                </p>
              </div>
              <div className="hero-content flex flex-col sm:flex-row gap-4">
                <button
                    className="btn-primary text-lg px-8 py-4"
                    onClick={() => router.push('/sign-in')}
                    >
                    Start Your Free Trial
                </button>
              </div>
              <div className="hero-content flex items-center space-x-6 text-sm text-light-100">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-success-100 rounded-full"></div>
                  <span>No credit card required</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-success-100 rounded-full"></div>
                  <span>Setup in 2 minutes</span>
                </div>
              </div>
            </div>
            <DotLottieReact
            src="https://lottie.host/cf879e76-21d8-4949-b8e3-34d633e1854e/BOpjLmavZq.lottie"
            loop
            autoplay
            />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section ref={statsRef} className="py-16 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="stat-item text-center">
              <div className="text-4xl font-bold text-primary-200 mb-2">10K+</div>
              <div className="text-light-100">Interviews Completed</div>
            </div>
            <div className="stat-item text-center">
              <div className="text-4xl font-bold text-primary-200 mb-2">95%</div>
              <div className="text-light-100">Success Rate</div>
            </div>
            <div className="stat-item text-center">
              <div className="text-4xl font-bold text-primary-200 mb-2">500+</div>
              <div className="text-light-100">Companies</div>
            </div>
            <div className="stat-item text-center">
              <div className="text-4xl font-bold text-primary-200 mb-2">24/7</div>
              <div className="text-light-100">AI Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section ref={featuresRef} id="features" className="py-20 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Why Choose
              <span className="bg-gradient-to-r from-primary-200 to-primary-100 bg-clip-text text-transparent">
                {' '}PrepBuddy
              </span>
            </h2>
            <p className="text-xl text-light-100 max-w-3xl mx-auto">
              Our AI-powered platform provides comprehensive interview preparation with personalized feedback and industry-specific scenarios.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="feature-card card-border">
              <div className="card p-8">
                <div className="w-12 h-12 bg-primary-200 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-6 h-6 text-dark-100" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4 text-white">AI-Powered Feedback</h3>
                <p className="text-light-100">Get instant, detailed feedback on your responses, body language, and communication skills.</p>
              </div>
            </div>
            <div className="feature-card card-border">
              <div className="card p-8">
                <div className="w-12 h-12 bg-primary-200 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-6 h-6 text-dark-100" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4 text-white">Industry-Specific</h3>
                <p className="text-light-100">Practice with questions tailored to your specific industry and role requirements.</p>
              </div>
            </div>
            <div className="feature-card card-border">
              <div className="card p-8">
                <div className="w-12 h-12 bg-primary-200 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-6 h-6 text-dark-100" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4 text-white">Progress Tracking</h3>
                <p className="text-light-100">Monitor your improvement over time with detailed analytics and performance metrics.</p>
              </div>
            </div>
            <div className="feature-card card-border">
              <div className="card p-8">
                <div className="w-12 h-12 bg-primary-200 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-6 h-6 text-dark-100" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M12 2l3.09 6.26L22 9l-5 4.87L18.18 21 12 17.77 5.82 21 7 13.87 2 9l6.91-.74L12 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4 text-white">Real-time Practice</h3>
                <p className="text-light-100">Engage in realistic mock interviews with immediate feedback and suggestions.</p>
              </div>
            </div>
            <div className="feature-card card-border">
              <div className="card p-8">
                <div className="w-12 h-12 bg-primary-200 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-6 h-6 text-dark-100" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4 text-white">Video Analysis</h3>
                <p className="text-light-100">Record and review your sessions to identify areas for improvement.</p>
              </div>
            </div>
            <div className="feature-card card-border">
              <div className="card p-8">
                <div className="w-12 h-12 bg-primary-200 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-6 h-6 text-dark-100" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4 text-white">Expert Resources</h3>
                <p className="text-light-100">Access curated resources and tips from industry professionals and career experts.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section ref={howItWorksRef} id="how-it-works" className="py-20 px-6 lg:px-8 bg-gradient-to-b from-dark-200 to-dark-300">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              How It
              <span className="bg-gradient-to-r from-primary-200 to-primary-100 bg-clip-text text-transparent">
                {' '}Works
              </span>
            </h2>
            <p className="text-xl text-light-100 max-w-3xl mx-auto">
              Get started with PrepBuddy in just three simple steps and begin your journey to interview success.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="step-card text-center">
              <div className="w-16 h-16 bg-primary-200 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold text-dark-100">
                1
              </div>
              <h3 className="text-xl font-semibold mb-4 text-white">Choose Your Role</h3>
              <p className="text-light-100">Select your target position and industry to get personalized interview questions.</p>
            </div>
            <div className="step-card text-center">
              <div className="w-16 h-16 bg-primary-200 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold text-dark-100">
                2
              </div>
              <h3 className="text-xl font-semibold mb-4 text-white">Practice with AI</h3>
              <p className="text-light-100">Engage in realistic mock interviews with our advanced AI interviewer.</p>
            </div>
            <div className="step-card text-center">
              <div className="w-16 h-16 bg-primary-200 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold text-dark-100">
                3
              </div>
              <h3 className="text-xl font-semibold mb-4 text-white">Get Feedback</h3>
              <p className="text-light-100">Receive detailed feedback and improve your skills for the real interview.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section ref={testimonialsRef} id="testimonials" className="py-20 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              What Our
              <span className="bg-gradient-to-r from-primary-200 to-primary-100 bg-clip-text text-transparent">
                {' '}Users Say
              </span>
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="testimonial-card card-border">
              <div className="card p-8">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-primary-200 rounded-full mr-4"></div>
                  <div>
                    <div className="font-semibold text-white">Sarah Johnson</div>
                    <div className="text-light-100 text-sm">Software Engineer</div>
                  </div>
                </div>
                <p className="text-light-100 mb-4">"PrepBuddy helped me land my dream job at Google. The AI feedback was incredibly detailed and helped me improve my technical communication."</p>
                <div className="flex text-yellow-400">
                  {'★'.repeat(5)}
                </div>
              </div>
            </div>
            <div className="testimonial-card card-border">
              <div className="card p-8">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-primary-200 rounded-full mr-4"></div>
                  <div>
                    <div className="font-semibold text-white">Michael Chen</div>
                    <div className="text-light-100 text-sm">Product Manager</div>
                  </div>
                </div>
                <p className="text-light-100 mb-4">"The industry-specific questions were spot on. I felt completely prepared for my actual interviews and got offers from multiple companies."</p>
                <div className="flex text-yellow-400">
                  {'★'.repeat(5)}
                </div>
              </div>
            </div>
            <div className="testimonial-card card-border">
              <div className="card p-8">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-primary-200 rounded-full mr-4"></div>
                  <div>
                    <div className="font-semibold text-white">Emily Rodriguez</div>
                    <div className="text-light-100 text-sm">Marketing Director</div>
                  </div>
                </div>
                <p className="text-light-100 mb-4">"As someone who struggled with interview anxiety, PrepBuddy gave me the confidence I needed. The practice sessions were incredibly realistic."</p>
                <div className="flex text-yellow-400">
                  {'★'.repeat(5)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section ref={ctaRef} className="py-20 px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="cta-content card-border">
            <div className="card p-16">
              <h2 className="text-4xl lg:text-5xl font-bold mb-6">
                Ready to Ace Your
                <span className="bg-gradient-to-r from-primary-200 to-primary-100 bg-clip-text text-transparent">
                  {' '}Next Interview?
                </span>
              </h2>
              <p className="text-xl text-light-100 mb-8 max-w-2xl mx-auto">
                Join thousands of professionals who have successfully landed their dream jobs with PrepBuddy.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="btn-primary text-lg px-8 py-4">
                  Start Your Free Trial
                </button>
                <button className="btn-secondary text-lg px-8 py-4">
                  Schedule Demo
                </button>
              </div>
              <p className="text-light-100 text-sm mt-6">
                No credit card required • 7-day free trial • Cancel anytime
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 lg:px-8 border-t border-border">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="text-2xl font-bold bg-gradient-to-r from-primary-200 to-primary-100 bg-clip-text text-transparent mb-4">
                PrepBuddy
              </div>
              <p className="text-light-100 text-sm">
                Your AI-powered interview preparation companion for landing your dream job.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Product</h4>
              <ul className="space-y-2 text-light-100 text-sm">
                <li><a href="#" className="hover:text-primary-200 transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-primary-200 transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-primary-200 transition-colors">API</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Company</h4>
              <ul className="space-y-2 text-light-100 text-sm">
                <li><a href="#" className="hover:text-primary-200 transition-colors">About</a></li>
                <li><a href="#" className="hover:text-primary-200 transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-primary-200 transition-colors">Careers</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Support</h4>
              <ul className="space-y-2 text-light-100 text-sm">
                <li><a href="#" className="hover:text-primary-200 transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-primary-200 transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-primary-200 transition-colors">Privacy</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-border text-center text-light-100 text-sm">
            <p>&copy; 2025 PrepBuddy. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;