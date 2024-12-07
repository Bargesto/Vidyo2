import { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import VideoCard from '../components/VideoCard';
import { Video, SUBJECTS } from '../types';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const VIDEOS_PER_PAGE = 36;

const GradePage = () => {
  const { grade } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = parseInt(searchParams.get('page') || '1');
  const currentSubject = searchParams.get('subject') || '';

  const [videos, setVideos] = useState<Video[]>([]);
  const [totalVideos, setTotalVideos] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadVideos();
  }, [grade, currentPage, currentSubject]);

  const loadVideos = () => {
    setLoading(true);
    const allVideos = JSON.parse(localStorage.getItem('videos') || '[]');
    
    // Filter videos by grade and subject
    let filteredVideos = allVideos.filter((video: Video) => 
      video.grade === Number(grade) &&
      (currentSubject ? video.subject === currentSubject : true)
    );

    // Set total for pagination
    setTotalVideos(filteredVideos.length);

    // Get paginated subset
    const start = (currentPage - 1) * VIDEOS_PER_PAGE;
    const paginatedVideos = filteredVideos.slice(start, start + VIDEOS_PER_PAGE);
    
    setVideos(paginatedVideos);
    setLoading(false);
  };

  const totalPages = Math.ceil(totalVideos / VIDEOS_PER_PAGE);

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return;
    
    const newParams = new URLSearchParams(searchParams);
    newParams.set('page', newPage.toString());
    setSearchParams(newParams);
    window.scrollTo(0, 0);
  };

  const handleSubjectChange = (subject: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (subject) {
      newParams.set('subject', subject);
    } else {
      newParams.delete('subject');
    }
    newParams.set('page', '1'); // Reset to first page on subject change
    setSearchParams(newParams);
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">{grade}. Sınıf Videoları</h1>
        <div className="flex items-center justify-between">
          <p className="text-gray-400">
            Toplam {totalVideos} video bulundu
            {totalVideos > 0 && ` • Sayfa ${currentPage}/${totalPages}`}
          </p>
          <select
            className="bg-gray-700 rounded-md px-4 py-2"
            value={currentSubject}
            onChange={(e) => handleSubjectChange(e.target.value)}
          >
            <option value="">Tüm Dersler</option>
            {SUBJECTS.map(subject => (
              <option key={subject.id} value={subject.id}>{subject.name}</option>
            ))}
          </select>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500 mx-auto"></div>
          <p className="text-gray-400 mt-4">Videolar yükleniyor...</p>
        </div>
      ) : videos.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-400">Bu sınıf düzeyinde video bulunmuyor.</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {videos.map(video => (
              <VideoCard key={video.id} video={video} />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="mt-8 flex justify-center items-center space-x-4">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`flex items-center space-x-1 px-4 py-2 rounded-md ${
                  currentPage === 1 
                    ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                    : 'bg-gray-700 hover:bg-gray-600'
                }`}
              >
                <ChevronLeft className="w-5 h-5" />
                <span>Önceki Sayfa</span>
              </button>

              <div className="flex items-center space-x-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`w-10 h-10 rounded-md flex items-center justify-center ${
                      currentPage === page
                        ? 'bg-red-500'
                        : 'bg-gray-700 hover:bg-gray-600'
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`flex items-center space-x-1 px-4 py-2 rounded-md ${
                  currentPage === totalPages
                    ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                    : 'bg-gray-700 hover:bg-gray-600'
                }`}
              >
                <span>Sonraki Sayfa</span>
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default GradePage;
