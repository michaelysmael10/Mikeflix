'use client';

import Header from '@/components/Layout/Header';
import Footer from '@/components/Layout/Footer';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';

export default function TVShowsPage() {
  // Mock TV show data
  const tvShows = Array.from({ length: 20 }, (_, i) => ({
    id: i + 100,
    title: `TV Show ${i + 1}`,
    image: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=400',
    year: 2024,
    rating: 'TV-14',
    seasons: Math.floor(Math.random() * 5) + 1,
  }));

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-white mb-4">TV Shows</h1>
            <p className="text-xl text-gray-400">
              Explore our collection of TV series
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {tvShows.map((show) => (
              <Link key={show.id} href={`/watch/${show.id}`}>
                <Card className="content-card">
                  <CardContent className="p-0">
                    <div
                      className="h-64 bg-cover bg-center rounded-lg"
                      style={{ backgroundImage: `url(${show.image})` }}
                    />
                    <div className="p-4">
                      <h3 className="font-semibold text-white text-sm">{show.title}</h3>
                      <div className="flex items-center space-x-2 text-xs text-gray-400 mt-1">
                        <span>{show.year}</span>
                        <span>•</span>
                        <span>{show.rating}</span>
                        <span>•</span>
                        <span>{show.seasons} Season{show.seasons > 1 ? 's' : ''}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}