import { useFetcher } from "react-router";
import { Button } from "~/components/ui/button";
import type { Route } from "../../../.react-router/types/app/routes/pets/+types/pet";
import { config } from "~/lib/config";

export async function loader({ params }: Route.LoaderArgs) {
  const { id } = params;
  console.log(`Loading pet ${id}`);
  return { id: id };
}

export async function action({ params, request }: Route.ActionArgs) {
  const { id } = params;

  const formData = await request.formData();
  const body = Object.fromEntries(formData);
  const { like, userId } = body;
  if (!like || !userId) {
    console.log("Missing required fields", like, userId, id, { body });
    return {
      status: 400,
      body: "Missing required fields"
    };
  }

  try {
    const response = await fetch(
      `${config.api.schema}${config.api.backendUrl}/v1/pets/${id}/like`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          user_id: userId,
          value: true
        })
      }
    );

    if (!response.ok) {
      return {
        body: "Failed to update like status",
        status: 500
      };
    }

    return await response.json();
  } catch (error) {
    console.error("Error updating like status:", error);
    return { body: "Failed to update like status", status: 500 };
  }
}

export default function PetPage({ loaderData }: Route.ComponentProps) {
  const fetcher = useFetcher();

  const handleToggle = () => {
    console.log("handleToggle");
    fetcher.submit(
      {
        userId: "5",
        like: true
      },
      {
        method: "post",
        action: "/pet/3"
      }
    );
  };

  return (
    <div>
      <p>{loaderData.id}</p>
      <Button type={"button"} onClick={handleToggle}>
        Like
      </Button>
    </div>
  );
}
