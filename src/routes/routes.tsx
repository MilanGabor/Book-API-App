import { lazy } from "react";
import { createBrowserRouter } from 'react-router-dom';
import { Layout } from '../components/layouts/Layout';


// Lazy loading
const HomePage = lazy(() => import('../pages/HomePage'));
const FavoritesPage = lazy(() => import('../pages/FavoritesPage'));
const PageNotFound = lazy(() => import('../pages/PageNotFound'))

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout><HomePage/></Layout>
  },
  {
    path: '/favorites',
    element: <Layout><FavoritesPage/></Layout>
  },
  {
    path: '*',
    element: <PageNotFound/>
  }
]);