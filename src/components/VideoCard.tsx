import { Link } from 'react-router-dom';
import { Check, Heart } from 'lucide-react';
import { Video } from '../types';
import ChannelAvatar from './ChannelAvatar';

interface VideoCardProps {
  video: Video;
}

const VideoCard = ({ video }: VideoCardProps) => {
  return (
    <Link to={`/video/${video.id}`} className="group">
      <div className="relative bg-gray-800 rounded-lg overflow-hidden">
        <img 
          src={video.thumbnailUrl} 
          alt={video.title}
          className="w-full aspect-video object-cover"
        />
        <div className="absolute top-2 right-2 flex space-x-1">
          {video.watched && (
            <div className="bg-green-500 p-1 rounded-full">
              <Check className="w-4 h-4" />
            </div>
          )}
          {video.favorite && (
            <div className="bg-red-500 p-1 rounded-full">
              <Heart className="w-4 h-4" />
            </div>
          )}
        </div>
        <div className="p-4">
          <h3 className="font-semibold group-hover:text-red-500 line-clamp-2">{video.title}</h3>
          <div className="text-sm text-gray-400 mt-2">
            <p>{video.grade}. Sınıf - {video.subject}</p>
            <div className="flex items-center space-x-2 mt-1">
              <ChannelAvatar name={video.channelName} size="sm" />
              <p>{video.channelName}</p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default VideoCard;
