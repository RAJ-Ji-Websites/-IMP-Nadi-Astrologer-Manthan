import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import './index.css';
import App from './App';
import AdminLayout from './pages/AdminLayout';
import BlogPage from './pages/BlogPage';
import BlogPostPage from './pages/BlogPostPage';
import EntityPage from './pages/EntityPage';
import Dashboard from './pages/Dashboard';
import Report from './pages/Report';
import ArticlesIndex from './pages/ArticlesIndex';
import ArticlePost from './pages/ArticlePost';
import { ENTITY_PAGES } from './data/pages';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/admin/*" element={<AdminLayout />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/:slug" element={<BlogPostPage />} />
        <Route path="/growth-dashboard" element={<Dashboard />} />
        <Route path="/month-1-report" element={<Report />} />
        <Route path="/articles" element={<ArticlesIndex />} />
        <Route path="/articles/:slug" element={<ArticlePost />} />
        {ENTITY_PAGES.map((p) => (
          <Route key={p.slug} path={`/${p.slug}`} element={<EntityPage />} />
        ))}
        <Route path="/*" element={<App />} />
      </Routes>
      <Analytics />
    </BrowserRouter>
  </StrictMode>
);
