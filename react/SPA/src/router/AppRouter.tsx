import { Routes, Route } from 'react-router-dom';
import { Home } from '../pages/Home';
// import { Notes } from '../pages/Notes';
// import { Profile } from '../pages/Profile';
// import { Settings } from '../pages/Settings';
import { NotFound } from '../pages/NotFound';

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      {/* <Route path="/notes" element={<Notes />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/settings" element={<Settings />} /> */}

      {/* 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRouter;
