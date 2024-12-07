import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import AdminPage from './pages/AdminPage';
import VideoPage from './pages/VideoPage';
import MyChannelPage from './pages/MyChannelPage';
import AllChannelsPage from './pages/AllChannelsPage';
import FavoritesPage from './pages/FavoritesPage';
import WatchedPage from './pages/WatchedPage';
import AIChatPage from './pages/AIChatPage';
import GradePage from './pages/GradePage';
import SearchPage from './pages/SearchPage';
import './index.css';

function App() {
  return (
    <Router>
      <div className="flex min-h-screen bg-gray-900 text-white">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-x-hidden">
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/admin" element={<AdminPage />} />
              <Route path="/video/:id" element={<VideoPage />} />
              <Route path="/my-channel" element={<MyChannelPage />} />
              <Route path="/channels" element={<AllChannelsPage />} />
              <Route path="/channels/:channelName" element={<AllChannelsPage />} />
              <Route path="/favorites" element={<FavoritesPage />} />
              <Route path="/watched" element={<WatchedPage />} />
              <Route path="/ai-chat" element={<AIChatPage />} />
              <Route path="/grade/:grade" element={<GradePage />} />
              <Route path="/search" element={<SearchPage />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;
