import useAuth from "../../hooks/useAuth";

const AdminDashboard = () => {
  const { user } = useAuth();

  console.log(user);

  return <div>Dashboard</div>;
};
export default AdminDashboard;
