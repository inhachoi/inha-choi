import { SlotMachine } from "@/entities";
import { FOOD_NAMES } from "./constants";

export function FoodSlotMachine() {
  return <SlotMachine prefix="점심은..🤔" dataArr={FOOD_NAMES} />;
}
