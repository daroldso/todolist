import React from 'react';
import { render } from 'react-dom';
import Todo from './Todo';

// Import global styles
import '../stylus/app.styl';

// Render React root component
render(<Todo />, document.getElementById('app'));
