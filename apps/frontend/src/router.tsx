import { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Layout from './components/Layout';
import { RouterPaths } from './interfaces';
const Form = lazy(() => import('./pages/Form'));

const Router: React.FC = () => {
  return (
    <Layout>
      <Routes>
        <Route path={RouterPaths.HOME} element={<Home />} />
        <Route
          path={RouterPaths.CREATE_PROPERTY}
          element={
            <Suspense>
              <Form />
            </Suspense>
          }
        />
      </Routes>
    </Layout>
  );
};

export default Router;
