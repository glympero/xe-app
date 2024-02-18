import { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Layout from './components/Layout';
import { RouterPaths } from './interfaces';
const Form = lazy(() => import('./pages/Form'));
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
              <Form />
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
