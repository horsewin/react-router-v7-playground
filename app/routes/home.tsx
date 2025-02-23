import { Welcome } from "~/welcome/welcome";
import type { Route } from "./+types/home";

export function meta() {
  return [
    { title: "sample web app" },
    { name: "description", content: "Welcome to v2" },
  ];
}

export async function loader() {
  try {
    const response = await fetch(`${process.env.BACKEND_URL}/v1/helloworld`);
    const data = await response.json();
    if (response.ok) {
      console.log(JSON.stringify(data));
      return { message: data.data.message };
    } else {
      return {
        message: "API呼び出しでエラーが発生しましたが、このまま続けましょう！",
      };
    }
  } catch (error) {
    return { message: "Hello, API response cannot be used" };
  }
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const { message } = loaderData;
  return <Welcome message={message} />;
}
