import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "sample web app" },
    { name: "description", content: "Welcome to v2" },
  ];
}

export async function loader() {
  try {
    const response = await fetch(
      "https://ebf4qapz35.execute-api.ap-southeast-2.amazonaws.com/prod/helloworld"
    );
    const data = await response.json();
    return { message: data.message };
  } catch (error) {
    return { message: "Hello, API response cannot be used" };
  }
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const { message } = loaderData;
  return <Welcome message={message} />;
}
