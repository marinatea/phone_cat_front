// / <reference types="react-scripts" />
interface ImportMetaEnv {
  readonly REACT_CLERK_PUBLISHABLE_KEY: string;
  // add more environment variables here as needed
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
