import { memo } from "react";
import { Draggable } from "@hello-pangea/dnd";
import { Package, MapPin, CheckCircle, GripVertical } from "lucide-react";
import type { RouteStep as RouteStepType } from "../types";
import { clsx } from "clsx";

interface Props {
  step: RouteStepType;
  index: number;
}

export const RouteStep = memo(({ step, index }: Props) => {
  //we get a different icon for each step type
  const getStepIcon = () => {
    switch (step.type) {
      case "PICKUP":
        return <Package className="w-5 h-5 text-green-500" />;
      case "END":
        return <CheckCircle className="w-5 h-5 text-red-500" />;
      default:
        return <MapPin className="w-5 h-5 text-blue-500" />;
    }
  };

  return (
    <Draggable draggableId={`step-${step.sequence}`} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={clsx(
            "bg-white rounded-lg shadow-md p-4 mb-3 border-l-4 transition-all",
            snapshot.isDragging ? "shadow-lg scale-[1.02]" : "",
            {
              "border-green-500": step.type === "PICKUP",
              "border-blue-500": step.type === "DELIVERY",
              "border-red-500": step.type === "END",
            }
          )}
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <GripVertical className="w-5 h-5" />

              {getStepIcon()}
              <span className="text-lg font-semibold text-gray-800">
                Stop #{index + 1} - {step.type}
              </span>
            </div>
            {step.tasksCount > 0 && (
              <div className="text-sm font-medium text-gray-600">
                {step.completedTasksCount}/{step.tasksCount} tasks
              </div>
            )}
          </div>

          <div className="flex items-start">
            <MapPin className="w-4 h-4 mt-1 mr-2 text-gray-500 flex-shrink-0" />
            <span className="text-gray-700">{step.address}</span>
          </div>
        </div>
      )}
    </Draggable>
  );
});
