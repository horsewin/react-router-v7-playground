import {
  type RouteConfig,
  index,
  prefix,
  route,
} from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("healthcheck", "routes/healthcheck.tsx"),

  // ペット関連
  ...prefix("pets", [
    index("routes/pets/index.tsx"),
    route(":id", "routes/pets/pet.tsx"),
  ]),
] satisfies RouteConfig;
