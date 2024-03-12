import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom/";

import App from './App.jsx';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import GamePage from './pages/GamePage';
import Error from './pages/Error';
import Highscore from './pages/Highscore.jsx';
import Score from './components/Score/index.jsx';
import User from './pages/User.jsx'


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    error: <Error />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      // {game page,} //
      {
        path: "/gamepage",
        element: <GamePage />,
      },
      // {scores page}, //
      {
        path: "Score",
        element: <Score />,
      },

      {
        path: "/highscore",
        element: <Highscore />,
      },

      {
        path: "/me",
        element: <User />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
