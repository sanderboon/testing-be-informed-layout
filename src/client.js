// @flow
// To prevent problems with context paths,
// make sure that the be informed client is the first import!
import { default as beinformedClient } from "beinformed/client/client";

// import customized getTheme method
import TutorialTheme from "./tutorial/_theme/TutorialTheme.json"

// dont forget to add the theme option to the client

beinformedClient({
    theme: TutorialTheme
});
