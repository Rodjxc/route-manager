import { useState, useCallback } from "react";
import { DragDropContext, Droppable, DropResult } from "@hello-pangea/dnd";
import { RouteStep } from "./RouteStep";
import type { Route, RouteStep as RouteStepType } from "../types";

interface Props {
  route: Route;
  onRouteUpdate: (updatedRoute: Route) => void;
}

export const RouteList: React.FC<Props> = ({ route, onRouteUpdate }) => {
  const [steps, setSteps] = useState(route.steps);

  // what I want to happen is that when I drag a step, it will update the sequence of the step
  // and the steps above it, and the steps below it
  // so if I drag the first step, it will update the sequence of the second step and the third step
  // and the fourth step  and so on

  const handleDragEnd = useCallback(
    (result: DropResult) => {
      // This is part of the library's types, we call the function based on the result of the dropped item
      if (!result.destination) return;

      const items = Array.from(steps);
      // creates a copy of the steps array to avoid mutatin the original steps array
      const [reorderedItem] = items.splice(result.source.index, 1);
      // removes one item from the array at source.index (the initial position of the dragged item). Reordered item is now the item
      // that was dragged
      items.splice(result.destination.index, 0, reorderedItem);

      // inserts the reordered item at destination.index (the new position of the dragged item)
      const updatedItems = items.map((item, index) => ({
        ...item,
        sequence: index + 1,
      }));
      // updates the steps array with the new sequence numbers

      setSteps(updatedItems);
      onRouteUpdate({
        ...route,
        steps: updatedItems,
      });
      localStorage.setItem("savedRouteSteps", JSON.stringify(updatedItems));
    },
    [steps, route, onRouteUpdate]
    // Updates the steps with teh newly reordered list and we call onRouteUpdate with the new steps to update the "route"
  );

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="route-steps">
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="space-y-2"
          >
            <div className="flex items-center gap-2 text-gray-500 mb-4 px-4">
              <span className="text-sm font-medium">
                Drag stops in the route to reorder
              </span>
            </div>

            {steps.map((step: RouteStepType, index: number) => (
              <RouteStep
                key={`step-${step.sequence}`}
                step={step}
                index={index}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};
