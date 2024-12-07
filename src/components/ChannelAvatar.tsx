import { useMemo } from 'react';

interface ChannelAvatarProps {
  name: string;
  size?: 'sm' | 'md' | 'lg';
}

const ChannelAvatar = ({ name, size = 'md' }: ChannelAvatarProps) => {
  // Get initials from channel name
  const initials = useMemo(() => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  }, [name]);

  // Generate consistent color based on channel name
  const backgroundColor = useMemo(() => {
    const colors = [
      'bg-red-500',
      'bg-blue-500',
      'bg-green-500',
      'bg-yellow-500',
      'bg-purple-500',
      'bg-pink-500',
      'bg-indigo-500',
      'bg-orange-500',
      'bg-teal-500',
      'bg-cyan-500'
    ];
    
    // Use string to generate consistent index
    const index = name.split('').reduce((acc, char) => {
      return acc + char.charCodeAt(0);
    }, 0);
    
    return colors[index % colors.length];
  }, [name]);

  const sizeClasses = {
    sm: 'w-8 h-8 text-sm',
    md: 'w-12 h-12 text-lg',
    lg: 'w-16 h-16 text-xl'
  };

  return (
    <div 
      className={`rounded-full ${backgroundColor} ${sizeClasses[size]} flex items-center justify-center font-semibold text-white`}
    >
      {initials}
    </div>
  );
};

export default ChannelAvatar;
