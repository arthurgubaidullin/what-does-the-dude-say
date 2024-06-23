import { createContext } from 'react';
import { app } from './app';
import { analytics } from './analytics';

export const getFirebaseProgram = () => ({ app, analytics });

export const FirebaseProgramContext = createContext(getFirebaseProgram());
