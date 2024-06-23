import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './app/app';
import { FirebaseProgramContext, getFirebaseProgram } from './firebase';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const program = getFirebaseProgram();

root.render(
  <StrictMode>
    <BrowserRouter>
      <FirebaseProgramContext.Provider value={program}>
        <App />
      </FirebaseProgramContext.Provider>
    </BrowserRouter>
  </StrictMode>
);
