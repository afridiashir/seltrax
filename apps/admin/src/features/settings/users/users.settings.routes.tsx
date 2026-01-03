import RootRedirect from "@/app/RootRedirect";
import SettingsLayout from "@/components/settingslayout/SettingsLayout";
import UsersList from "./list/UsersList";

export default [
    {
        path: "users",
        element: (
            <UsersList />
        ),
    },
];
