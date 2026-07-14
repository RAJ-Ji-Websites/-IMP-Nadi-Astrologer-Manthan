import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import App from './App';
import AdminLayout from './pages/AdminLayout';
import BlogPage from './pages/BlogPage';
import BlogPostPage from './pages/BlogPostPage';
import EntityPage from './pages/EntityPage';
import Dashboard from './pages/Dashboard';
import { ENTITY_PAGES } from './data/pages';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/admin/*" element={<AdminLayout />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/:slug" element={<BlogPostPage />} />
        <Route path="/growth-dashboard" element={<Dashboard />} />
        {ENTITY_PAGES.map((p) => (
          <Route key={p.slug} path={`/${p.slug}`} element={<EntityPage />} />
        ))}
        <Route path="/*" element={<App />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
