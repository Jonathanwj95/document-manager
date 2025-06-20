declare module 'react-to-pdf' {
  export function usePDF(options?: {
    filename?: string;
    page?: {
      margin?: number;
      format?: string | string[];
    };
  }): {
    toPDF: () => void;
    targetRef: React.RefObject<HTMLDivElement>;
  };
}