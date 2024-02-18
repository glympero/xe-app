import { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Layout from './components/Layout/Layout';
import { RouterPaths } from './interfaces';
const NewProperty = lazy(() => import('./pages/NewProperty'));
const EditProperty = lazy(() => import('./pages/EditProperty'));
const NotFound = lazy(() => import('./pages/NotFound'));

const Router: React.FC = () => {
  return (
    <Layout>
      <Routes>
        <Route path={RouterPaths.HOME} element={<Home />} />
        <Route
          path={RouterPaths.NEW_PROPERTY}
          element={
            <Suspense>
              <NewProperty />
            </Suspense>
          }
        />
        <Route
          path={RouterPaths.EDIT_PROPERTY}
          element={
            <Suspense>
              <EditProperty />
            </Suspense>
          }
        />
        <Route
          path='*'
          element={
            <Suspense>
              <NotFound />
            </Suspense>
          }
        />
      </Routes>
    </Layout>
  );
};

export default Router;
