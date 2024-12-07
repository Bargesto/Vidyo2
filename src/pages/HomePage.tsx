import { useState, useEffect, useMemo } from 'react';
import VideoCard from '../components/VideoCard';
import HeroSection from '../components/HeroSection';
import { Video } from '../types';

const VIDEOS_PER_GRADE = 8;

// Same colors as in Sidebar
const GRADE_COLORS = {
  5: 'bg-red-500',
  6: 'bg-blue-500',
  7: 'bg-green-500',
  8: 'bg-yellow-500',
  9: 'bg-purple-500',
  10: 'bg-pink-500',
  11: 'bg-indigo-500',
  12: 'bg-orange-500'
};

const HomePage = () => {
  const [videos, setVideos] = useState<Video[]>([]);

  useEffect(() => {
    const storedVideos = localStorage.getItem('videos');
    if (storedVideos) {
      setVideos(JSON.parse(storedVideos));
    }
  }, []);

  // Group and randomize videos by grade
  const videosByGrade = useMemo(() => {
    const groupedVideos: Record<number, Video[]> = {};
    
    // Group videos by grade
    videos.forEach(video => {
      if (!groupedVideos[video.grade]) {
        groupedVideos[video.grade] = [];
      }
      groupedVideos[video.grade].push(video);
    });

    // Randomize and limit videos for each grade
    Object.keys(groupedVideos).forEach(grade => {
      groupedVideos[Number(grade)] = groupedVideos[Number(grade)]
        .sort(() => Math.random() - 0.5)
        .slice(0, VIDEOS_PER_GRADE);
    });

    return groupedVideos;
  }, [videos]);

  return (
    <div>
      <HeroSection />
      
      <div className="px-6 py-4 space-y-8">
        {Object.entries(videosByGrade)
          .sort(([gradeA], [gradeB]) => Number(gradeA) - Number(gradeB))
          .map(([grade, gradeVideos]) => (
            <div key={grade} className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className={`${GRADE_COLORS[grade as keyof typeof GRADE_COLORS]} w-12 h-12 rounded-lg flex items-center justify-center text-xl font-bold`}>
                  {grade}
                </div>
                <h2 className="text-2xl font-bold">{grade}. Sınıf Videoları</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {gradeVideos.map(video => (
                  <VideoCard key={video.id} video={video} />
                ))}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default HomePage;
