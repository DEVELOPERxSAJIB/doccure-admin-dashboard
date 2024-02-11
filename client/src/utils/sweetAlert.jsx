import swal from "sweetalert";

export const sweetalertBasic = (msg) => {
  swal(msg.title, msg.message);
};

export const sweetAlertStandard = (msg, icon = "warning") => {
    swal(msg.title, msg.message, icon);
} 

export const sweetalertDelete = (msg, icon) => {
  swal({
    title: msg.title,
    text: msg.message,
    icon: icon,
    buttons: true,
    dangerMode: true,
  }).then((willDelete) => {
    if (willDelete) {
      swal("Done", {
        icon: "success",
      });
    }
  });
};
