import 'index.css';
import { createRoot } from 'react-dom/client';

import { App } from 'App';

const container = document.createElement('div');
document.querySelector('body')!.appendChild(container);

const root = createRoot(container!);
root.render(<App />);
