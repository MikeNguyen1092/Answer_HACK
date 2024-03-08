import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom/';

import App from './App.jsx';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
// import Game from './pages/Game';
// import SingleThought from './pages/SingleThought';
// import Profile from './pages/Profile';
import Error from './pages/Error';
import User from './pages/User.jsx';

const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
		error: <Error />,
		children: [
			{
				index: true,
				element: <Home />,
			},
			{
				path: '/login',
				element: <Login />,
			},
			{
				path: '/signup',
				element: <Signup />,
			},
			// {
			// 	// {game page,} //
			// 	path: '/game',
			// 	element: <Game />,
			// },

			// {scores page}, //

			{
				path: '/user',
				element: <User />
			}
		],
	},
]);

ReactDOM.createRoot(document.getElementById('root')).render(<RouterProvider router={router} />);
