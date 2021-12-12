import jwtDecode from "jwt-decode";
import { NotificationStatus } from "../store";
import { ScriptHandler } from "./index";

const key = "decode-jwt";
const label = "Decode JWT";

const handler: ScriptHandler = (slices) => {
  try {
    const content = slices.map((text) => {
      const jwtParts = text.split(".");
      if (jwtParts.length !== 3) {
        throw new Error();
      }

      const header = jwtDecode<object>(text, { header: true });
      const payload = jwtDecode<object>(text);

      const decodedJwt = {
        header,
        payload,
        signature: jwtParts[2],
      };

      return JSON.stringify(decodedJwt, undefined, 2);
    });

    return { content };
  } catch (e) {
    return {
      notification: {
        type: NotificationStatus.DANGER,
        message: "Invalid Token",
      },
    };
  }
};

export const decodeJwt = {
  key,
  label,
  handler,
};
