import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './layout/Layout';

const Home = lazy(() => import('./pages/Home'));
const Admin = lazy(() => import('./pages/Admin'));
const NotFound = lazy(() => import('./pages/NotFound'));
const NewsDetails = lazy(() => import('./pages/NewsDetails'));


function App() {
  return (
    <Suspense fallback={<div className="p-6 text-center">Loading...</div>}>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/news/:id" element={<NewsDetails />} /> 
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
