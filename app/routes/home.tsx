import { Welcome } from "~/welcome/welcome";
import type { Route } from "./+types/home";
import { config } from "~/lib/config";

export function meta() {
  return [
    { title: "sample web app" },
    { name: "description", content: "Welcome to v2" }
  ];
}

export async function loader() {
  console.log("config", config);
  let dataBackendUrl = null;
  let dataServiceConnect = null;
  try {
    const responseBackendUrl = await fetch(
      `${config.api.schema}${config.api.backendUrl}/v1/helloworld`
    );
    const responseServiceConnect = await fetch(
      `${config.api.schema}${config.api.serviceConnectUrl}/v1/helloworld`
    );

    dataBackendUrl = await responseBackendUrl.json();
    dataServiceConnect = await responseServiceConnect.json();
  } catch (error) {
    console.log("Error domain:", config.api.schema, config.api.backendUrl);
    console.log(
      "Error domain for service connect:",
      config.api.schema,
      config.api.serviceConnectUrl
    );
    console.error("Error fetching data:", error);
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
