import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import VideoCard from '../components/VideoCard';
import ChannelAvatar from '../components/ChannelAvatar';
import { Video } from '../types';

const AllChannelsPage = () => {
  const { channelName } = useParams();
  const [videos, setVideos] = useState<Video[]>([]);
  const [channels, setChannels] = useState<string[]>([]);

  useEffect(() => {
    const storedVideos = JSON.parse(localStorage.getItem('videos') || '[]');
    setVideos(storedVideos);

    // Extract unique channel names
    const uniqueChannels = Array.from(
      new Set(storedVideos.map((video: Video) => video.channelName))
    ).sort();
    setChannels(uniqueChannels);
  }, []);

  const filteredVideos = channelName
    ? videos.filter(video => video.channelName === channelName)
    : videos;

  return (
    <div className="p-6">
      <div className="mb-6">
        {channelName ? (
          <div className="flex items-center space-x-4">
            <ChannelAvatar name={channelName} size="lg" />
            <div>
              <h1 className="text-2xl font-bold mb-2">{channelName}</h1>
              <p className="text-gray-400">
                {filteredVideos.length} video
              </p>
            </div>
          </div>
        ) : (
          <>
            <h1 className="text-2xl font-bold mb-2">Tüm Kanallar</h1>
            <p className="text-gray-400">
              Platformdaki tüm eğitim kanallarını keşfedin
            </p>
          </>
        )}
      </div>

      {!channelName && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {channels.map(channel => (
            <a
              key={channel}
              href={`/channels/${encodeURIComponent(channel)}`}
              className="flex items-center p-4 space-x-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
            >
              <ChannelAvatar name={channel} size="lg" />
              <div>
                <h3 className="font-semibold text-lg mb-1">{channel}</h3>
                <p className="text-sm text-gray-400">
                  {videos.filter(v => v.channelName === channel).length} video
                </p>
              </div>
            </a>
          ))}
        </div>
      )}

      {channelName && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8">
          {filteredVideos.map(video => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
      )}

      {channelName && filteredVideos.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-400">Bu kanalda henüz video bulunmuyor.</p>
        </div>
      )}
    </div>
  );
};

export default AllChannelsPage;
