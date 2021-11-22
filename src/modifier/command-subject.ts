import { Subject } from "rxjs";
import { Command } from "../types";

export const command$ = new Subject<Command>();