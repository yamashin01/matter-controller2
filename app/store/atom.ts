import { atom } from "jotai";
import { MatterType } from "../types/types";

export const matterListAtom = atom<MatterType[]>([]);
