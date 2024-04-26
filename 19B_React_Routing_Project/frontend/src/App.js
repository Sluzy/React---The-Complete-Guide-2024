import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Root from "./routes/Root"
import Home from "./routes/Home"
import Events, { loader as eventsLoader } from "./routes/Events"
import EventDetails, {
  loader as eventDetailsLoader,
  action as deleteEventAction
} from "./routes/EventDetails"
import NewEvent from "./routes/NewEvent"
import EditEvent from "./routes/EditEvent"
import EventRoot from "./routes/EventRoot"
import Error from "./routes/Error"
import { action as manipulateEventAction } from "./components/EventForm"
import Newsletter, { action as newsletterAction } from './routes/Newsletter';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <Error />,
    children: [
      { index: true, element: <Home /> },
      {
        path: "events",
        element: <EventRoot />,
        children: [
          { index: true, element: <Events />, loader: eventsLoader },
          {
            path: ":id", id: "event-details", loader: eventDetailsLoader, children: [
              { index: true, element: <EventDetails />, action: deleteEventAction },
              { path: "edit", element: <EditEvent />, action: manipulateEventAction },
            ]
          },
          { path: "new", element: <NewEvent />, action: manipulateEventAction }
        ]
      },
      {
        path: 'newsletter',
        element: <Newsletter />,
        action: newsletterAction,
      },
    ]
  }
])

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App;
