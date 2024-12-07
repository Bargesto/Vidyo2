import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import VideoCard from '../components/VideoCard';
import { Video } from '../types';
import { Search } from 'lucide-react';

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [searchResults, setSearchResults] = useState<Video[]>([]);

  useEffect(() => {
    if (query) {
      const videos = JSON.parse(localStorage.getItem('videos') || '[]');
      const results = videos.filter((video: Video) => 
        video.title.toLowerCase().includes(query.toLowerCase()) ||
        video.channelName.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(results);
    }
  }, [query]);

  if (!query) {
    return (
      <div className="p-6 text-center">
        <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-400">Arama yapmak için yukarıdaki arama çubuğunu kullanın.</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">"{query}" için arama sonuçları</h1>
        <p className="text-gray-400">
          {searchResults.length} sonuç bulundu
        </p>
      </div>

      {searchResults.length === 0 ? (
        <div className="text-center py-12">
          <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-400">Aramanızla eşleşen video bulunamadı.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {searchResults.map(video => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchPage;
