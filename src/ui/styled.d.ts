import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    fontFamily: string;
    fontFamilyMono: string;

    zIndex: number;

    primaryColor: string;
    secondaryColor: string;

    textColor: string;
    textColorSubtle: string;

    backgroundColor: string;
    backgroundColorSubtle: string;
    backgroundColorInvert: string;

    borderColor: string;

    [key: string]: any;
  }
}
