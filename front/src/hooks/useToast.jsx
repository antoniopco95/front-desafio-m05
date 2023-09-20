import { toast } from "react-toastify";

const useToast = (msg, status = null) => {

    toast.dismiss();

    if (!status) {
        toast.success(msg, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            theme: "light",
        });
    } else if (status === "error") {
        toast.error(msg, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            theme: "colored",
        })
    }
}

export default useToast;