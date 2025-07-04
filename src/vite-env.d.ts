// Type declarations for CSS imports
declare module "*.css" {
    const content: Record<string, string>;
    export default content;
}

declare module "schilling-widgets-system/dist/schilling-widgets.css";
