import type { Route } from "../../.react-router/types/app/routes/+types/home";

export async function loader() {
  console.log("Healthcheck");
  return { status: true };
}

export default function Healthcheck() {
  return null;
}
