'use client';

import Header from '@/components/Layout/Header';
import Footer from '@/components/Layout/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Trash2, Play } from 'lucide-react';
import Link from 'next/link';

export default function WatchlistPage() {
  // Mock watchlist data
  const watchlistItems = [
    {
      id: 1,
      title: 'Stranger Things',
      image: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=400',
      type: 'series',
      year: 2024,
      rating: 'TV-14',
      addedDate: '2024-01-15',
    },
    {
      id: 2,
      title: 'The Dark Knight',
      image: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=400',
      type: 'movie',
      year: 2024,
      rating: 'PG-13',
      addedDate: '2024-01-10',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-white mb-4">My Watchlist</h1>
            <p className="text-xl text-gray-400">
              Your saved movies and TV shows
            </p>
          </div>

          {watchlistItems.length > 0 ? (
            <div className="grid gap-4">
              {watchlistItems.map((item) => (
                <Card key={item.id} className="bg-gray-900 border-gray-800">
                  <CardContent className="p-0">
                    <div className="flex">
                      <div
                        className="w-32 h-48 bg-cover bg-center flex-shrink-0"
                        style={{ backgroundImage: `url(${item.image})` }}
                      />
                      <div className="flex-1 p-6 flex flex-col justify-between">
                        <div>
                          <h3 className="text-xl font-semibold text-white mb-2">
                            {item.title}
                          </h3>
                          <div className="flex items-center space-x-2 text-sm text-gray-400 mb-4">
                            <span className="capitalize">{item.type}</span>
                            <span>•</span>
                            <span>{item.year}</span>
                            <span>•</span>
                            <span>{item.rating}</span>
                          </div>
                          <p className="text-gray-400 text-sm">
                            Added on {new Date(item.addedDate).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="flex space-x-3 mt-4">
                          <Link href={`/watch/${item.id}`}>
                            <Button className="netflix-gradient">
                              <Play className="mr-2 h-4 w-4" />
                              Watch Now
                            </Button>
                          </Link>
                          <Button variant="outline" size="icon">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <h2 className="text-2xl font-semibold text-white mb-4">
                Your watchlist is empty
              </h2>
              <p className="text-gray-400 mb-8">
                Start adding movies and TV shows to watch later
              </p>
              <Link href="/">
                <Button className="netflix-gradient">
                  Browse Content
                </Button>
              </Link>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}