import { useState, useEffect } from 'react';
import { Video } from '../types';
import VideoCard from '../components/VideoCard';

const WatchedPage = () => {
  const [watchedVideos, setWatchedVideos] = useState<Video[]>([]);

  useEffect(() => {
    const allVideos = JSON.parse(localStorage.getItem('videos') || '[]');
    const watched = allVideos.filter((video: Video) => video.watched);
    setWatchedVideos(watched);
  }, []);

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">İzlediklerim</h1>
        <p className="text-gray-400">
          İzlendi olarak işaretlediğiniz tüm videolar burada listelenir
        </p>
      </div>

      {watchedVideos.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-400">Henüz izlenmiş video bulunmuyor.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {watchedVideos.map(video => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
      )}
    </div>
  );
};

export default WatchedPage;
