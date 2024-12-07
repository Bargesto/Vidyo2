import { useState, useEffect } from 'react';
import { Video, HeroContent, GRADES, SUBJECTS } from '../types';
import { Plus, X, Presentation, Trash2, ToggleLeft, ToggleRight, Edit2, PinOff, Pin } from 'lucide-react';

const AdminPage = () => {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [isHeroModalOpen, setIsHeroModalOpen] = useState(false);
  const [heroContent, setHeroContent] = useState<HeroContent[]>([]);
  const [editingHero, setEditingHero] = useState<HeroContent | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    youtubeUrl: '',
    grade: GRADES[0],
    subject: SUBJECTS[0].id,
    channelName: ''
  });

  const [heroFormData, setHeroFormData] = useState({
    title: '',
    description: '',
    imageUrl: '',
    link: '',
    standalone: false,
    includeVideos: true
  });

  useEffect(() => {
    const stored = localStorage.getItem('heroContent');
    if (stored) {
      setHeroContent(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    if (editingHero) {
      setHeroFormData({
        title: editingHero.title || '',
        description: editingHero.description || '',
        imageUrl: editingHero.imageUrl || '',
        link: editingHero.link || '',
        standalone: editingHero.standalone || false,
        includeVideos: editingHero.includeVideos !== false
      });
      setIsHeroModalOpen(true);
    }
  }, [editingHero]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Extract video ID from YouTube URL
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
      addedBy: 'admin'
    };

    // Get existing videos and add new one
    const existingVideos = JSON.parse(localStorage.getItem('videos') || '[]');
    localStorage.setItem('videos', JSON.stringify([...existingVideos, newVideo]));

    // Reset form and close modal
    setFormData({
      title: '',
      youtubeUrl: '',
      grade: GRADES[0],
      subject: SUBJECTS[0].id,
      channelName: ''
    });
    setIsVideoModalOpen(false);

    alert('Video başarıyla eklendi!');
  };

  const handleHeroSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    let updatedHeroContent;
    if (editingHero) {
      // Update existing hero
      updatedHeroContent = heroContent.map(hero => 
        hero.id === editingHero.id 
          ? { ...editingHero, ...heroFormData, active: hero.active }
          : hero
      );
    } else {
      // Add new hero
      const newHeroContent: HeroContent = {
        id: Date.now().toString(),
        ...heroFormData,
        active: true
      };
      updatedHeroContent = [...heroContent, newHeroContent];
    }

    // If this hero is standalone, make sure other heroes are not standalone
    if (heroFormData.standalone) {
      updatedHeroContent = updatedHeroContent.map(hero => ({
        ...hero,
        standalone: hero.id === (editingHero?.id || newHeroContent.id)
      }));
    }

    localStorage.setItem('heroContent', JSON.stringify(updatedHeroContent));
    setHeroContent(updatedHeroContent);

    // Reset form and close modal
    setHeroFormData({
      title: '',
      description: '',
      imageUrl: '',
      link: '',
      standalone: false,
      includeVideos: true
    });
    setEditingHero(null);
    setIsHeroModalOpen(false);

    alert(`Hero içeriği başarıyla ${editingHero ? 'güncellendi' : 'eklendi'}!`);
  };

  const handleDeleteHero = (id: string) => {
    if (window.confirm('Bu hero içeriğini silmek istediğinizden emin misiniz?')) {
      const updatedHeroContent = heroContent.filter(hero => hero.id !== id);
      localStorage.setItem('heroContent', JSON.stringify(updatedHeroContent));
      setHeroContent(updatedHeroContent);
    }
  };

  const toggleHeroActive = (id: string) => {
    const updatedHeroContent = heroContent.map(hero =>
      hero.id === id ? { ...hero, active: !hero.active } : hero
    );
    localStorage.setItem('heroContent', JSON.stringify(updatedHeroContent));
    setHeroContent(updatedHeroContent);
  };

  const handleEditHero = (hero: HeroContent) => {
    setEditingHero(hero);
  };

  const handleCloseHeroModal = () => {
    setIsHeroModalOpen(false);
    setEditingHero(null);
    setHeroFormData({
      title: '',
      description: '',
      imageUrl: '',
      link: '',
      standalone: false,
      includeVideos: true
    });
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Admin Panel</h2>
        <div className="flex space-x-4">
          <button
            onClick={() => setIsHeroModalOpen(true)}
            className="flex items-center space-x-2 bg-purple-500 hover:bg-purple-600 px-4 py-2 rounded-md transition-colors"
          >
            <Presentation className="w-5 h-5" />
            <span>Hero Ekle</span>
          </button>
          <button
            onClick={() => setIsVideoModalOpen(true)}
            className="flex items-center space-x-2 bg-red-500 hover:bg-red-600 px-4 py-2 rounded-md transition-colors"
          >
            <Plus className="w-5 h-5" />
            <span>Video Ekle</span>
          </button>
        </div>
      </div>

      {/* Hero Content List */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4">Hero İçerikleri</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {heroContent.map((hero) => (
            <div key={hero.id} className="bg-gray-800 rounded-lg p-4 relative group">
              {hero.imageUrl && (
                <img
                  src={hero.imageUrl}
                  alt={hero.title}
                  className="w-full h-32 object-cover rounded-lg mb-2"
                />
              )}
              <h4 className="font-semibold">{hero.title || 'Başlıksız'}</h4>
              {hero.description && (
                <p className="text-sm text-gray-400 mt-1">{hero.description}</p>
              )}
              {hero.link && (
                <a
                  href={hero.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 text-sm mt-2 block hover:underline"
                >
                  {hero.link}
                </a>
              )}
              <div className="absolute top-2 right-2 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                {hero.standalone ? (
                  <div className="bg-yellow-500 p-1 rounded-full" title="Tek Başına">
                    <Pin className="w-4 h-4" />
                  </div>
                ) : null}
                <button
                  onClick={() => handleEditHero(hero)}
                  className="bg-blue-500 p-1 rounded-full hover:bg-blue-600"
                  title="Düzenle"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => toggleHeroActive(hero.id)}
                  className={`p-1 rounded-full ${hero.active ? 'text-green-500' : 'text-gray-500'}`}
                  title={hero.active ? 'Aktif' : 'Pasif'}
                >
                  {hero.active ? <ToggleRight className="w-6 h-6" /> : <ToggleLeft className="w-6 h-6" />}
                </button>
                <button
                  onClick={() => handleDeleteHero(hero.id)}
                  className="bg-red-500 p-1 rounded-full hover:bg-red-600"
                  title="Sil"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <div className="absolute bottom-2 right-2 flex space-x-2">
                {!hero.includeVideos && (
                  <span className="text-sm px-2 py-1 rounded-full bg-orange-500/20 text-orange-400">
                    Sadece Hero
                  </span>
                )}
                <span className={`text-sm px-2 py-1 rounded-full ${
                  hero.active ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-400'
                }`}>
                  {hero.active ? 'Aktif' : 'Pasif'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Hero Modal */}
      {isHeroModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-lg p-6 w-full max-w-xl mx-4 relative">
            <button
              onClick={handleCloseHeroModal}
              className="absolute right-4 top-4 text-gray-400 hover:text-white"
            >
              <X className="w-6 h-6" />
            </button>

            <h3 className="text-xl font-bold mb-4">
              {editingHero ? 'Hero İçeriğini Düzenle' : 'Yeni Hero İçeriği Ekle'}
            </h3>

            <form onSubmit={handleHeroSubmit} className="space-y-4">
              <div>
                <label className="block mb-1">Başlık</label>
                <input
                  type="text"
                  className="w-full bg-gray-700 rounded-md px-4 py-2"
                  value={heroFormData.title}
                  onChange={(e) => setHeroFormData({...heroFormData, title: e.target.value})}
                />
              </div>

              <div>
                <label className="block mb-1">Açıklama</label>
                <textarea
                  className="w-full bg-gray-700 rounded-md px-4 py-2"
                  value={heroFormData.description}
                  onChange={(e) => setHeroFormData({...heroFormData, description: e.target.value})}
                  rows={3}
                />
              </div>

              <div>
                <label className="block mb-1">Resim URL</label>
                <input
                  type="url"
                  className="w-full bg-gray-700 rounded-md px-4 py-2"
                  value={heroFormData.imageUrl}
                  onChange={(e) => setHeroFormData({...heroFormData, imageUrl: e.target.value})}
                />
              </div>

              <div>
                <label className="block mb-1">Link</label>
                <input
                  type="url"
                  className="w-full bg-gray-700 rounded-md px-4 py-2"
                  value={heroFormData.link}
                  onChange={(e) => setHeroFormData({...heroFormData, link: e.target.value})}
                />
              </div>

              <div className="flex items-center space-x-4">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={heroFormData.standalone}
                    onChange={(e) => setHeroFormData({...heroFormData, standalone: e.target.checked})}
                    className="form-checkbox rounded text-purple-500"
                  />
                  <span>Tek Başına Göster</span>
                </label>

                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={heroFormData.includeVideos}
                    onChange={(e) => setHeroFormData({...heroFormData, includeVideos: e.target.checked})}
                    disabled={heroFormData.standalone}
                    className="form-checkbox rounded text-purple-500"
                  />
                  <span>Video Karışımına İzin Ver</span>
                </label>
              </div>

              <div className="flex space-x-4 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-purple-500 hover:bg-purple-600 px-4 py-2 rounded-md transition-colors"
                >
                  {editingHero ? 'Güncelle' : 'Hero İçeriği Ekle'}
                </button>
                <button
                  type="button"
                  onClick={handleCloseHeroModal}
                  className="flex-1 bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-md transition-colors"
                >
                  İptal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Video Modal */}
      {isVideoModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-lg p-6 w-full max-w-xl mx-4 relative">
            <button
              onClick={() => setIsVideoModalOpen(false)}
              className="absolute right-4 top-4 text-gray-400 hover:text-white"
            >
              <X className="w-6 h-6" />
            </button>

            <h3 className="text-xl font-bold mb-4">Yeni Video Ekle</h3>

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

              <div className="flex space-x-4 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-red-500 hover:bg-red-600 px-4 py-2 rounded-md transition-colors"
                >
                  Video Ekle
                </button>
                <button
                  type="button"
                  onClick={() => setIsVideoModalOpen(false)}
                  className="flex-1 bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-md transition-colors"
                >
                  İptal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPage;
