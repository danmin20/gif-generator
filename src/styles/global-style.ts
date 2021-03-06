import { createGlobalStyle } from "styled-components";
import { reset } from "styled-reset";
import { media } from "./theme";

export const GlobalStyle = createGlobalStyle`
    ${reset}
    :focus {
        outline: none;
        border: none;
    }
    div[role="button"] {
        cursor: pointer;
    }
    ::-webkit-scrollbar {
        display: none;
    }
    html{
        -webkit-text-size-adjust: none;
        font-family: -apple-system,BlinkMacSystemFont,helvetica,Apple SD Gothic Neo,sans-serif;       
        font-display: fallback;
        ${media.tablet}{
            font-size: 10px;
        }
        -ms-overflow-style: none;
        scrollbar-width: none;
    }
    button {
        background: none;
        padding: 0;
        border: none;
        cursor: pointer;
        &:disabled {
            cursor: default;
            fill: #f2f3f4;
        }
    }

    .pc-tablet-only {
        display: block;
        ${media.mobile} {
            display: none;
        }
    }
    .tablet-mobile-only{
        display: none;
        ${media.tablet}{
            display:block;
        }
    }
    .mobile-only {
        display: none;
        ${media.mobile} {
            display: block;
        }
    }

    .tui-image-editor-container {
    border-radius: 1.5rem;
    .color-picker-control {
      cursor: default;
    }
    .color-picker-control .tui-colorpicker-palette-button {
      width: 16px;
      height: 16px;
      cursor: pointer;
    }
    .tui-colorpicker-palette-container li {
      float: left;
    }
    .tui-colorpicker-clearfix:after {
      clear: both;
      display: block;
      content: "";
    }
    .tui-image-editor-help-menu.top {
      left: 19rem;
      top: 1rem;
    }
    .tui-image-editor-header-logo {
      display: none;
    }
    .tui-image-editor-help-menu {
      display: none;
    }
    .tui-image-editor-header-buttons {
      position: absolute;
    }
    .tui-colorpicker-palette-preview {
      font-size: 0;
    }
    .tui-colorpicker-palette-hex {
      margin-top: 1px;
    }
  }
`;
