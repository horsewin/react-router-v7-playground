import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "sample web app" },
    { name: "description", content: "Welcome to v2" },
  ];
}

export async function loader() {
  console.log(process.env.BACKEND_URL)
  try {
    const response = await fetch(
      `${process.env.BACKEND_URL}/v1/helloworld`
    );
    const data = await response.json();
    if (response.ok) {
      console.log(JSON.stringify(data));
      return { message: data.message };
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
