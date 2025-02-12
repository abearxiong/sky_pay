import { createRoot } from 'react-dom/client';

export const ReactApp = () => {
  const root = createRoot(document.getElementById('app')!);
  root.render(<div>Hello, World!</div>);
};
