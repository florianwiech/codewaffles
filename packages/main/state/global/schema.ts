import type { JSONSchema } from "json-schema-typed";
import { JSONSchemaType } from "json-schema-typed";
import type { Schema } from "electron-store";
import type { State } from "./types";

export const coordinateSchema: JSONSchema = {
  type: JSONSchemaType.Number,
  maximum: 1_000_000,
  minimum: -1_000_000,
};

export const rectangleSchema: JSONSchema = {
  type: JSONSchemaType.Object,
  properties: {
    x: coordinateSchema,
    y: coordinateSchema,
    width: coordinateSchema,
    height: coordinateSchema,
  },
};

export const windowState: JSONSchema = {
  type: JSONSchemaType.Object,
  properties: {
    x: coordinateSchema,
    y: coordinateSchema,
    width: coordinateSchema,
    height: coordinateSchema,
    isMaximized: { type: JSONSchemaType.Boolean },
    isFullScreen: { type: JSONSchemaType.Boolean },
    displayBounds: rectangleSchema,
  },
};

export const schema: Schema<State> = {
  windowsState: {
    type: JSONSchemaType.Object,
    required: ["home", "settings"],
    properties: {
      home: windowState,
      settings: {
        type: JSONSchemaType.Object,
        properties: {
          x: coordinateSchema,
          y: coordinateSchema,
          displayBounds: rectangleSchema,
        },
      },
    },
  },
  appearance: {
    type: JSONSchemaType.String,
  },
};
