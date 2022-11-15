import Help from "./Help";
import Home from "./Home";
import Map from "./Map";

const routes = {
    'home': {component: <Home />, breadcrumbs: ['']},
    'map': {component: <Map />, breadcrumbs: ['']},
    'help': {component: <Help />, breadcrumbs: ['']}
};

export default routes;
