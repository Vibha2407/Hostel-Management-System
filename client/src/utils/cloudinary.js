export const openCloudinaryWidget = (callback) => {
  window.cloudinary.openUploadWidget(
    {
      cloudName: "ile5zcpx",
      uploadPreset: "hostel_management",
      multiple: true,
      maxFiles: 10,
      folder: "HostelRooms",
      sources: ["local", "camera"],
    },
    (error, result) => {
      if (!error && result.event === "success") {
        callback(result.info.secure_url);
      }
    },
  );
};
