import React from "react";
import { ThemeProvider } from "styled-components";

const theme = {
    mediumViewport : "500px",
    largeViewport : "1200px",
    colors: {
        powderWhite: "#FFFDF9",
        persianGreen: "#06B49A",
        lightBlue: "#AFDBD2",
        onyx: "#36313D"
    },
}

const Theme = ({ children }) => (
    <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

export default Theme;