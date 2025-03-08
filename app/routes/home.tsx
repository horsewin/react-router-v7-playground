import { Welcome } from "~/welcome/welcome";
import type { Route } from "./+types/home";

export function meta() {
  return [
    { title: "sample web app" },
    { name: "description", content: "Welcome to v2" }
  ];
}

export async function loader() {
  let dataBackendUrl = null;
  let dataServiceConnect = null;
  try {
    const responseBackendUrl = await fetch(
      `${process.env.BACKEND_URL}/v1/helloworld`
    );
    const responseServiceConnect = await fetch(
      `${process.env.BACKEND_SERVICE_CONNECT_URL}/v1/helloworld`
    );

    dataBackendUrl = await responseBackendUrl.json();
    dataServiceConnect = await responseServiceConnect.json();
  } catch (error) {
    return {
      message:
        dataBackendUrl?.data.message ?? "Hello, API response cannot be used",
      messageServiceConnect:
        dataServiceConnect?.data.message ?? "Hello, API response cannot be used"
    };
  }

  return {
    message: dataBackendUrl.data.message,
    messageServiceConnect: dataServiceConnect.data.message
  };
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const { message, messageServiceConnect } = loaderData;
  return (
    <Welcome message={message} messageServiceConnect={messageServiceConnect} />
  );
}
