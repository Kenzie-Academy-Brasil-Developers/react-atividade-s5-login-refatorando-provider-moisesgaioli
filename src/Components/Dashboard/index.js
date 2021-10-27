import { useAuth } from "../../Providers/Auth";


const Dashboard = () => {

    const { logout } = useAuth()

    return (
        <button className="button logout" onClick={logout}> Logout </button>
    )
}

export default Dashboard;