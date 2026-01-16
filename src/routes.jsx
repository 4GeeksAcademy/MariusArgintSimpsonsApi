import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
} from "react-router-dom";
import { Layout } from "./pages/Layout";
import { Home } from "./pages/Home";
import { CharacterDetail } from "./pages/CharacterDetail";
import { Episodes } from "./pages/Episodes";
import { EpisodeDetail } from "./pages/EpisodeDetail";
import { Locations } from "./pages/Locations";
import { LocationDetail } from "./pages/LocationDetail";
import { ErrorPage } from "./pages/ErrorPage";

export const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />} errorElement={<ErrorPage />} >
        <Route path= "/" element={<Home />} />
        <Route path="/character/:id" element={<CharacterDetail />} />
        <Route path="/episodes" element={<Episodes />} />
        <Route path="/episode/:id" element={<EpisodeDetail />} />
        <Route path="/locations" element={<Locations />} />
        <Route path="/location/:id" element={<LocationDetail />} />
        <Route path="*" element={<ErrorPage />} />
      </Route>
    )
);