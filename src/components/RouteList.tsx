import React, { useState, useCallback } from "react";
import { DragDropContext, Droppable, DropResult } from "@hello-pangea/dnd";
import RouteStep from "./RouteStep";
import type { Route, RouteStep as RouteStepType } from "../types";
import { GripVertical } from "lucide-react";

interface Props {
  route: Route;
  onRouteUpdate: (updatedRoute: Route) => void;
}

const RouteList: React.FC<Props> = ({ route, onRouteUpdate }) => {
  const [steps, setSteps] = useState(route.steps);

  const handleDragEnd = useCallback(
    (result: DropResult) => {
      if (!result.destination) return;

      const items = Array.from(steps);
      const [reorderedItem] = items.splice(result.source.index, 1);
      items.splice(result.destination.index, 0, reorderedItem);

      // Update sequences
      const updatedItems = items.map((item, index) => ({
        ...item,
        sequence: index + 1,
      }));

      setSteps(updatedItems);
      onRouteUpdate({
        ...route,
        steps: updatedItems,
      });
    },
    [steps, route, onRouteUpdate]
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
              <GripVertical className="w-5 h-5" />
              <span className="text-sm font-medium">Drag steps to reorder</span>
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

export default RouteList;
