import Swal from "sweetalert2";

const makeToast = (type, msg) => {
  const toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
  });

  toast.fire({
    icon: type,
    title: msg,
  });

  toast.getPopup().addEventListener("willOpen", () => {
    
    Swal.stopTimer();
    toast.getPopup().addEventListener("mouseenter", Swal.stopTimer);
    toast.getPopup().addEventListener("mouseleave", Swal.resumeTimer);
  });
};

export default makeToast;
