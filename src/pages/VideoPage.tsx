import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Check, Heart } from 'lucide-react';
import { Video } from '../types';

const VideoPage = () => {
  const { id } = useParams();
  const [video, setVideo] = useState<Video | null>(null);

  useEffect(() => {
    const videos = JSON.parse(localStorage.getItem('videos') || '[]');
    const foundVideo = videos.find((v: Video) => v.id === id);
    if (foundVideo) {
      setVideo(foundVideo);
    }
  }, [id]);

  const updateVideo = (updates: Partial<Video>) => {
    if (!video) return;

    const videos = JSON.parse(localStorage.getItem('videos') || '[]');
    const updatedVideos = videos.map((v: Video) =>
      v.id === video.id ? { ...v, ...updates } : v
    );
    localStorage.setItem('videos', JSON.stringify(updatedVideos));
    setVideo({ ...video, ...updates });
  };

  if (!video) return <div>Video bulunamadı</div>;

  // Extract video ID from YouTube URL
  const videoId = video.youtubeUrl.split('v=')[1]?.split('&')[0];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="aspect-video">
        <iframe
          className="w-full h-full"
          src={`https://www.youtube.com/embed/${videoId}`}
          allowFullScreen
        />
      </div>

      <div className="mt-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">{video.title}</h1>
          <div className="flex space-x-2">
            <button
              onClick={() => updateVideo({ watched: !video.watched })}
              className={`flex items-center space-x-1 px-4 py-2 rounded-md ${
                video.watched ? 'bg-green-500' : 'bg-gray-700'
              }`}
            >
              <Check className="w-5 h-5" />
              <span>{video.watched ? 'İzlendi' : 'İzlendi İşaretle'}</span>
            </button>
            <button
              onClick={() => updateVideo({ favorite: !video.favorite })}
              className={`flex items-center space-x-1 px-4 py-2 rounded-md ${
                video.favorite ? 'bg-red-500' : 'bg-gray-700'
              }`}
            >
              <Heart className="w-5 h-5" />
              <span>{video.favorite ? 'Favorilerde' : 'Favorilere Ekle'}</span>
            </button>
          </div>
        </div>

        <div className="mt-4 text-gray-400">
          <p>{video.grade}. Sınıf - {video.subject}</p>
          <p>Kanal: {video.channelName}</p>
        </div>
      </div>
    </div>
  );
};

export default VideoPage;
