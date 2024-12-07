import { useState, useEffect } from 'react';
import { Video } from '../types';
import VideoCard from '../components/VideoCard';

const FavoritesPage = () => {
  const [favoriteVideos, setFavoriteVideos] = useState<Video[]>([]);

  useEffect(() => {
    const allVideos = JSON.parse(localStorage.getItem('videos') || '[]');
    const favorites = allVideos.filter((video: Video) => video.favorite);
    setFavoriteVideos(favorites);
  }, []);

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Favorilerim</h1>
        <p className="text-gray-400">
          Favori olarak işaretlediğiniz tüm videolar burada listelenir
        </p>
      </div>

      {favoriteVideos.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-400">Henüz favori video eklenmemiş.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {favoriteVideos.map(video => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;
