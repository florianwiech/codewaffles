const origin = global.navigator.userAgent;
const cleared = Symbol("clear");
let fakeUserAgent: any = null;

Object.defineProperty(global.navigator, "userAgent", {
  get() {
    return fakeUserAgent === cleared ? origin : fakeUserAgent || "";
  },
});

export const clear = () => {
  fakeUserAgent = cleared;
};

export const mockUserAgent = (agent: string) => {
  fakeUserAgent = agent;
};

export const userAgentWindowsMock = "Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:47.0) Gecko/20100101 Firefox/47.0";
export const userAgentMacOSMock = "Mozilla/5.0 (Macintosh; Intel Mac OS X x.y; rv:42.0) Gecko/20100101 Firefox/42.0";
