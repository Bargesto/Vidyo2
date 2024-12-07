import { useState, useEffect } from 'react';
import { Video, GRADES, SUBJECTS } from '../types';
import VideoCard from '../components/VideoCard';
import { Trash2, Plus } from 'lucide-react';

const MyChannelPage = () => {
  const [myVideos, setMyVideos] = useState<Video[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    youtubeUrl: '',
    grade: GRADES[0],
    subject: SUBJECTS[0].id,
    channelName: ''
  });

  useEffect(() => {
    loadVideos();
  }, []);

  const loadVideos = () => {
    const allVideos = JSON.parse(localStorage.getItem('videos') || '[]');
    setMyVideos(allVideos.filter((video: Video) => video.addedBy === 'user'));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const videoId = formData.youtubeUrl.split('v=')[1]?.split('&')[0];
    if (!videoId) {
      alert('Geçersiz YouTube URL');
      return;
    }

    const newVideo: Video = {
      id: Date.now().toString(),
      ...formData,
      thumbnailUrl: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
      watched: false,
      favorite: false,
      addedBy: 'user'
    };

    const existingVideos = JSON.parse(localStorage.getItem('videos') || '[]');
    localStorage.setItem('videos', JSON.stringify([...existingVideos, newVideo]));

    setFormData({
      title: '',
      youtubeUrl: '',
      grade: GRADES[0],
      subject: SUBJECTS[0].id,
      channelName: ''
    });
    setShowAddForm(false);
    loadVideos();
  };

  const handleDelete = (videoId: string) => {
    if (window.confirm('Bu videoyu silmek istediğinizden emin misiniz?')) {
      const allVideos = JSON.parse(localStorage.getItem('videos') || '[]');
      const updatedVideos = allVideos.filter((v: Video) => v.id !== videoId);
      localStorage.setItem('videos', JSON.stringify(updatedVideos));
      loadVideos();
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold mb-2">Benim Kanalım</h1>
          <p className="text-gray-400">
            Eklediğiniz tüm eğitim videoları burada listelenir
          </p>
        </div>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="flex items-center space-x-2 bg-red-500 hover:bg-red-600 px-4 py-2 rounded-md"
        >
          <Plus className="w-5 h-5" />
          <span>Video Ekle</span>
        </button>
      </div>

      {showAddForm && (
        <div className="mb-8 bg-gray-800 p-6 rounded-lg">
          <h2 className="text-xl font-bold mb-4">Yeni Video Ekle</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block mb-1">Başlık</label>
              <input
                type="text"
                required
                className="w-full bg-gray-700 rounded-md px-4 py-2"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
              />
            </div>

            <div>
              <label className="block mb-1">YouTube URL</label>
              <input
                type="url"
                required
                className="w-full bg-gray-700 rounded-md px-4 py-2"
                value={formData.youtubeUrl}
                onChange={(e) => setFormData({...formData, youtubeUrl: e.target.value})}
              />
            </div>

            <div>
              <label className="block mb-1">Sınıf</label>
              <select
                required
                className="w-full bg-gray-700 rounded-md px-4 py-2"
                value={formData.grade}
                onChange={(e) => setFormData({...formData, grade: Number(e.target.value)})}
              >
                {GRADES.map(grade => (
                  <option key={grade} value={grade}>{grade}. Sınıf</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block mb-1">Ders</label>
              <select
                required
                className="w-full bg-gray-700 rounded-md px-4 py-2"
                value={formData.subject}
                onChange={(e) => setFormData({...formData, subject: e.target.value})}
              >
                {SUBJECTS.map(subject => (
                  <option key={subject.id} value={subject.id}>{subject.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block mb-1">Kanal İsmi</label>
              <input
                type="text"
                required
                className="w-full bg-gray-700 rounded-md px-4 py-2"
                value={formData.channelName}
                onChange={(e) => setFormData({...formData, channelName: e.target.value})}
              />
            </div>

            <div className="flex space-x-4">
              <button
                type="submit"
                className="flex-1 bg-red-500 hover:bg-red-600 px-4 py-2 rounded-md"
              >
                Video Ekle
              </button>
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="flex-1 bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-md"
              >
                İptal
              </button>
            </div>
          </form>
        </div>
      )}

      {myVideos.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-400">Henüz video eklenmemiş.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {myVideos.map(video => (
            <div key={video.id} className="relative group">
              <VideoCard video={video} />
              <button
                onClick={() => handleDelete(video.id)}
                className="absolute top-2 right-2 bg-red-500 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyChannelPage;
