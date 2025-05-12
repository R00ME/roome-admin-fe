import BaseLayout from './layout/BaseLayout';
import { Route, Routes } from 'react-router-dom';

const Router = () => {
  return (
    <Routes>
      <Route path='/' element={<BaseLayout />} />
    </Routes>
  );
};

export default Router