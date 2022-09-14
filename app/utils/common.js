import { getOwner } from "@ember/application";

const refreshCurrentRoute = (controller) => {
  const currentRouteName = controller.get("routing.currentRouteName");
  const currentRouteInstance = getOwner(controller).lookup(
    `route:${currentRouteName}`
  );
  currentRouteInstance.refresh();
};

export { refreshCurrentRoute };
