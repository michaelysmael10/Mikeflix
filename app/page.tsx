'use client';

import { useState } from 'react';
import { Play, Info, ChevronLeft, ChevronRight } from 'lucide-react';
import Header from '@/components/Layout/Header';
import Footer from '@/components/Layout/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Mock data for featured content
  const featuredContent = [
    {
      id: 1,
      title: 'Stranger Things',
      description: 'When a young boy vanishes, a small town uncovers a mystery involving secret experiments.',
      image: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=1200',
      category: 'Series',
      rating: 'TV-14',
    },
    {
      id: 2,
      title: 'The Dark Knight',
      description: 'Batman faces his greatest challenge as the Joker unleashes chaos on Gotham City.',
      image: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=1200',
      category: 'Movie',
      rating: 'PG-13',
    },
  ];

  const contentCategories = [
    {
      title: 'Trending Now',
      items: Array.from({ length: 8 }, (_, i) => ({
        id: i + 1,
        title: `Movie ${i + 1}`,
        image: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=400',
      })),
    },
    {
      title: 'Popular Movies',
      items: Array.from({ length: 8 }, (_, i) => ({
        id: i + 9,
        title: `Popular ${i + 1}`,
        image: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=400',
      })),
    },
    {
      title: 'TV Shows',
      items: Array.from({ length: 8 }, (_, i) => ({
        id: i + 17,
        title: `Series ${i + 1}`,
        image: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=400',
      })),
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % featuredContent.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + featuredContent.length) % featuredContent.length);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative h-screen overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center transition-all duration-1000"
          style={{
            backgroundImage: `url(${featuredContent[currentSlide].image})`,
          }}
        />
        <div className="hero-gradient absolute inset-0" />
        
        <div className="relative z-10 flex h-full items-center">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl space-y-6">
              <div className="flex items-center space-x-4">
                <span className="rounded bg-red-600 px-2 py-1 text-xs font-semibold uppercase">
                  {featuredContent[currentSlide].category}
                </span>
                <span className="text-sm text-gray-300">
                  {featuredContent[currentSlide].rating}
                </span>
              </div>
              
              <h1 className="text-4xl font-bold text-white md:text-6xl">
                {featuredContent[currentSlide].title}
              </h1>
              
              <p className="text-lg text-gray-300 md:text-xl">
                {featuredContent[currentSlide].description}
              </p>
              
              <div className="flex space-x-4">
                <Button size="lg" className="netflix-gradient">
                  <Play className="mr-2 h-5 w-5" />
                  Play Now
                </Button>
                <Button size="lg" variant="secondary" className="bg-gray-600/80 hover:bg-gray-600">
                  <Info className="mr-2 h-5 w-5" />
                  More Info
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Arrows */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70"
          onClick={prevSlide}
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70"
          onClick={nextSlide}
        >
          <ChevronRight className="h-6 w-6" />
        </Button>

        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-2">
          {featuredContent.map((_, index) => (
            <button
              key={index}
              className={`h-2 w-8 rounded-full transition-colors ${
                index === currentSlide ? 'bg-white' : 'bg-white/40'
              }`}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </div>
      </section>

      {/* Content Sections */}
      <main className="space-y-16 py-16">
        {contentCategories.map((category, categoryIndex) => (
          <section key={categoryIndex} className="container mx-auto px-4">
            <h2 className="mb-6 text-2xl font-bold text-white">{category.title}</h2>
            <div className="scrollbar-hide flex space-x-4 overflow-x-auto pb-4">
              {category.items.map((item) => (
                <Link key={item.id} href={`/watch/${item.id}`}>
                  <Card className="content-card w-64 flex-shrink-0">
                    <CardContent className="p-0">
                      <div
                        className="h-36 bg-cover bg-center"
                        style={{ backgroundImage: `url(${item.image})` }}
                      />
                      <div className="p-4">
                        <h3 className="font-semibold text-white">{item.title}</h3>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </main>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-red-900/20 to-black">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to watch? Start your subscription today.
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Join millions of users streaming unlimited entertainment.
          </p>
          <Link href="/subscription">
            <Button size="lg" className="netflix-gradient">
              Get Started
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}