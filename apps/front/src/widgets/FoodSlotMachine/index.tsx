import { SlotMachine } from "@/shared/ui";
import { FOOD_NAMES } from "./constants";

export function FoodSlotMachine() {
  return <SlotMachine data={FOOD_NAMES} />;
}
