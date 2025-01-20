import {type RouteConfig, index, route} from "@react-router/dev/routes";

export default [index("routes/home.tsx"),
    route("healthcheck", "routes/healthcheck.tsx"),
    route("pets", "routes/pets.tsx"),
] satisfies RouteConfig;