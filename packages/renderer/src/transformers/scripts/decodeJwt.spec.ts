import { describe, it, expect } from "vitest";
import { NotificationStatus } from "../types";
import { decodeJwt } from "./decodeJwt";

describe("decodeJwt", () => {
  it("should return decoded jwt", () => {
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";
    const decodedToken = {
      header: { alg: "HS256", typ: "JWT" },
      payload: { sub: "1234567890", name: "John Doe", iat: 1516239022 },
      signature: "SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
    };

    expect(decodeJwt.handler([token])).toMatchObject({
      content: [JSON.stringify(decodedToken, undefined, 2)],
    });
  });

  it("should return error notification", () => {
    expect(decodeJwt.handler(["invalid-token"])).toMatchObject({
      notification: {
        type: NotificationStatus.DANGER,
        message: "Invalid Token",
      },
    });
  });
});
