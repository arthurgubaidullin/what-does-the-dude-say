import { Chat } from './chat';
import { UnderDevelopmentAlert } from './under-development-alert';

export function App() {
  return (
    <div className="container mx-auto m-4">
      <UnderDevelopmentAlert />

      <Chat class="mt-4" />
    </div>
  );
}

export default App;
