import "styled-components";
import light from "@primer/primitives/dist/js/colors/light";

declare module "styled-components" {
  type Theme = typeof light;

  export interface DefaultTheme extends Theme {}
}
