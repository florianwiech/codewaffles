import jwtDecode from "jwt-decode";

const key = "decode-jwt";
const label = "Decode JWT";

const handler = (text: string) => {
  try {
    const jwtParts = text.split(".");
    if (jwtParts.length !== 3) {
      return "";
    }

    const header = jwtDecode<object>(text, { header: true });
    const payload = jwtDecode<object>(text);

    const decodedJwt = {
      header,
      payload,
      signature: jwtParts[2],
    };

    return JSON.stringify(decodedJwt, undefined, 2);
  } catch (e) {
    // todo provide error notification
  }
  return "";
};

export const decodeJwt = {
  key,
  label,
  handler,
};
