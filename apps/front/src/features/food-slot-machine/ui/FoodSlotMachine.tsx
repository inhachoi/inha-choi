import { SlotMachine } from "./SlotMachine";
import { FOOD_NAMES } from "../config/constants";

export function FoodSlotMachine() {
  return <SlotMachine prefix="점심은..🤔" dataArr={FOOD_NAMES} />;
}
