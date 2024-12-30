import Header from "../components/common/Header";
import ChangePassword from "../components/Settings/ChangePassword";
import DangerZone from "../components/Settings/DangerZone";
import Profile from "../components/Settings/Profile";

const SettingPage = () => {
  return (
    <div className="relative z-10 flex-1 overflow-auto">
      <Header title="Settings" />
      <main className="mx-auto max-w-4xl px-3 py-8 lg:px-4 xl:px-12">
        <Profile />
        <ChangePassword/>
        <DangerZone/>
      </main>
    </div>
  );
};
export default SettingPage;
