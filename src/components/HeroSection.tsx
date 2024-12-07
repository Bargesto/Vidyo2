import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import { Play, ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import 'swiper/css';
import { Video, HeroContent } from '../types';

const HeroSection = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [randomVideos, setRandomVideos] = useState<Video[]>([]);
  const [heroContent, setHeroContent] = useState<HeroContent[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedVideos = localStorage.getItem('videos');
    const storedHeroContent = localStorage.getItem('heroContent');

    if (storedVideos) {
      const allVideos = JSON.parse(storedVideos);
      setVideos(allVideos);
      
      // Select 5 random videos
      const shuffled = [...allVideos].sort(() => 0.5 - Math.random());
      setRandomVideos(shuffled.slice(0, 5));
    }

    if (storedHeroContent) {
      const allHeroContent = JSON.parse(storedHeroContent);
      // Only show active hero content
      const activeHeroContent = allHeroContent.filter((hero: HeroContent) => hero.active);
      
      // Check if there's a standalone hero
      const standaloneHero = activeHeroContent.find((hero: HeroContent) => hero.standalone);
      
      if (standaloneHero) {
        setHeroContent([standaloneHero]);
      } else {
        setHeroContent(activeHeroContent);
      }
    }
  }, []);

  const handlePlay = (videoId: string) => {
    navigate(`/video/${videoId}`);
  };

  // Only include videos if there's no standalone hero and at least one hero has includeVideos set to true
  const shouldIncludeVideos = !heroContent.find(hero => hero.standalone) && 
    heroContent.some(hero => hero.includeVideos !== false);

  const allContent = [
    ...heroContent,
    ...(shouldIncludeVideos ? randomVideos.map(video => ({
      id: video.id,
      title: video.title,
      description: `${video.grade}. Sınıf - ${video.subject}`,
      imageUrl: video.thumbnailUrl,
      isVideo: true
    })) : [])
  ];

  if (allContent.length === 0) return null;

  return (
    <div className="w-full aspect-[21/9] bg-gray-800">
      <Swiper
        modules={[Autoplay]}
        autoplay={{ delay: 5000 }}
        loop={allContent.length > 1}
        className="w-full h-full"
      >
        {allContent.map((content) => (
          <SwiperSlide key={content.id} className="cursor-pointer">
            <div 
              className="relative w-full h-full group"
              onClick={() => {
                if (!('isVideo' in content) && content.link) {
                  window.open(content.link, '_blank');
                }
              }}
            >
              <img
                src={content.imageUrl}
                alt={content.title}
                className="w-full h-full object-cover brightness-75 group-hover:brightness-50 transition-all duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <h2 className="text-4xl font-bold mb-4 group-hover:text-red-500 transition-colors">
                  {content.title}
                </h2>
                <div className="flex items-center space-x-4">
                  {'isVideo' in content ? (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handlePlay(content.id);
                      }}
                      className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 px-6 py-3 rounded-md font-semibold transition-colors duration-300"
                    >
                      <Play className="w-6 h-6" />
                      <span>İzle</span>
                    </button>
                  ) : content.link ? (
                    <a
                      href={content.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="flex items-center space-x-2 bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-md font-semibold transition-colors duration-300"
                    >
                      <ExternalLink className="w-6 h-6" />
                      <span>Ziyaret Et</span>
                    </a>
                  ) : null}
                  <div className="text-gray-300">
                    <p>{content.description}</p>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HeroSection;
