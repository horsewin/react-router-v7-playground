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
  let dataBackendUrl = null;
  let dataServiceConnect = null;
  try {
    const responseBackendUrl = await fetch(
      `${config.api.schema}${config.api.backendUrl}/v1/helloworld`
    ).catch(error => {
      console.error("Error fetching data:", error);
      dataBackendUrl = {
        data: { message: "Hello, API response cannot be used" }
      };
    });
    const responseServiceConnect = await fetch(
      `${config.api.schema}${config.api.serviceConnectUrl}/v1/helloworld`
    ).catch(error => {
      console.error("Error fetching data for service connect:", error);
      dataServiceConnect = {
        data: {
          message: "Hello, API response cannot be used for service connect"
        }
      };
    });

    if (responseBackendUrl instanceof Response && !dataBackendUrl) {
      dataBackendUrl = await responseBackendUrl.json();
    }
    if (responseServiceConnect instanceof Response && !dataServiceConnect) {
      dataServiceConnect = await responseServiceConnect.json();
    }
  } catch (error) {
    console.error("some error occurred", error);
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
