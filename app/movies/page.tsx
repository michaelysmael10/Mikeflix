'use client';

import Header from '@/components/Layout/Header';
import Footer from '@/components/Layout/Footer';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';

export default function MoviesPage() {
  // Mock movie data
  const movies = Array.from({ length: 20 }, (_, i) => ({
    id: i + 1,
    title: `Movie ${i + 1}`,
    image: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=400',
    year: 2024,
    rating: 'PG-13',
  }));

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-white mb-4">Movies</h1>
            <p className="text-xl text-gray-400">
              Discover our collection of movies
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {movies.map((movie) => (
              <Link key={movie.id} href={`/watch/${movie.id}`}>
                <Card className="content-card">
                  <CardContent className="p-0">
                    <div
                      className="h-64 bg-cover bg-center rounded-lg"
                      style={{ backgroundImage: `url(${movie.image})` }}
                    />
                    <div className="p-4">
                      <h3 className="font-semibold text-white text-sm">{movie.title}</h3>
                      <div className="flex items-center space-x-2 text-xs text-gray-400 mt-1">
                        <span>{movie.year}</span>
                        <span>•</span>
                        <span>{movie.rating}</span>
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