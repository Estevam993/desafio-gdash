import {toast, type ToastClassnames,} from "sonner";

type ToastType = "success" | "error" | "info" | "warning" | "default";

interface ToastOptions {
  className?: string
  closeButton?: boolean
  descriptionClassName?: string
  style?: React.CSSProperties
  cancelButtonStyle?: React.CSSProperties
  actionButtonStyle?: React.CSSProperties
  duration?: number
  unstyled?: boolean
  classNames?: ToastClassnames
  closeButtonAriaLabel?: string
  toasterId?: string,
  description?: string,
}

export default function useToast() {

  const showToast = (
    message: string,
    type: ToastType = "default",
    options?: ToastOptions
  ) => {
    const defaultOptions: ToastOptions = {
      duration: 5000,
      closeButton: true,
      description: undefined,
      ...options,
    };


    switch (type) {
      case "success":
        toast.success(message, {
          ...defaultOptions,
        });
        break;

      case "error":
        toast.error(message, {
          ...defaultOptions,
        });
        break;

      case "info":
        toast.info(message, {
          ...defaultOptions,
        });
        break;

      case "warning":
        toast.warning(message, {
          ...defaultOptions,
        });
        break;

      default:
        toast(message, {
          ...defaultOptions,
        });
        break;
    }
  };

  return {showToast};
}
