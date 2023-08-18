import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    #root {
      margin: 0 auto;
      text-align: center;
      background-color: #c5c8ce;
    }
    body {
      margin: 0;
      padding: 0;
      -webkit-user-select:none;
      -moz-user-select:none;
      -ms-user-select:none;
      user-select:none
    }
    .App {
      max-width: 420px;
      min-height: 100vh;
      background-color: #fff;
      margin: 0 auto;
      box-shadow: 0 4px 20px rgba(0, 0, 0, .1);
    }
`;

export default GlobalStyle;