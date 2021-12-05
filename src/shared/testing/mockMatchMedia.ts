const origin = window.matchMedia;
const cleared = Symbol("clear");
let fakeMatchMedia: any = null;

// https://jestjs.io/docs/manual-mocks#mocking-methods-which-are-not-implemented-in-jsdom
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: jest.fn().mockImplementation((query) => {
    return fakeMatchMedia === cleared
      ? origin
      : {
          matches: false,
          media: query,
          onchange: null,
          addListener: jest.fn(), // deprecated
          removeListener: jest.fn(), // deprecated
          addEventListener: jest.fn(),
          removeEventListener: jest.fn(),
          dispatchEvent: jest.fn(),
          ...fakeMatchMedia,
        };
  }),
});

export const clear = () => {
  fakeMatchMedia = cleared;
};

export const mockMatchMedia = (attributes: Partial<MediaQueryList>) => {
  fakeMatchMedia = attributes;
};

export const mockMatchMediaScoped = (attributes: Partial<MediaQueryList>) => {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: jest.fn().mockImplementation((query) => {
      return {
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(), // deprecated
        removeListener: jest.fn(), // deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
        ...attributes,
      };
    }),
  });
};
