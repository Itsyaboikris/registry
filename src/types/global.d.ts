// Global type declarations for external libraries

declare global {
  interface Window {
    grecaptcha: {
      getResponse(): string;
      reset(): void;
      render(container: string | HTMLElement, options?: any): number;
    };
  }
}

export {}; 