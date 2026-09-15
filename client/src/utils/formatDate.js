export const formatDate = (date) => {
  if (!date) return "Not Available";

  return new Date(date).toLocaleDateString("en-GB");
};
