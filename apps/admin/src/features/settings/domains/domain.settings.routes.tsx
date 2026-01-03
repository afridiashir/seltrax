import RootRedirect from "@/app/RootRedirect";
import SettingsLayout from "@/components/settingslayout/SettingsLayout";
import DomainList from "./list/DomainList";

export default [
    {
        path: "domains",
        element: (
            <DomainList />
        ),
    },
];
