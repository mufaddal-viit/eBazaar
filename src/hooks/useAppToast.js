import { useCallback } from "react";
import { toast } from "react-toastify";

export const APP_TOAST_CONTAINER_ID = "app-toast";

const defaultOptions = {
  containerId: APP_TOAST_CONTAINER_ID,
  position: "top-right",
  autoClose: 2000,
};

const withDefaults = (options = {}) => ({
  ...defaultOptions,
  ...options,
});

const useAppToast = () => {
  const success = useCallback((message, options = {}) => {
    toast.success(message, withDefaults(options));
  }, []);

  const error = useCallback((message, options = {}) => {
    toast.error(message, withDefaults(options));
  }, []);

  const info = useCallback((message, options = {}) => {
    toast.info(message, withDefaults(options));
  }, []);

  const warning = useCallback((message, options = {}) => {
    toast.warning(message, withDefaults(options));
  }, []);

  return { success, error, info, warning };
};

export default useAppToast;
