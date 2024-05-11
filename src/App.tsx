import React, { Suspense } from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes/routes';
import LoadingIndicator from './components/LoadingIndicator';

function App() {
  return (
    <div className="App">
      <Suspense fallback={<LoadingIndicator/>}>
        <RouterProvider router={router}/>
      </Suspense>
    </div>
  );
}

export default App;
