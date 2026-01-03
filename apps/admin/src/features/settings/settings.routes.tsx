import RootRedirect from "@/app/RootRedirect";
import SettingsLayout from "@/components/settingslayout/SettingsLayout";
import domainSettingsRoutes from "./domains/domain.settings.routes";
import userSettingsRoutes from "./users/users.settings.routes";
import ComingSoon from "./comingSoon";

export default [
    {
        path: "/settings",
        element: <SettingsLayout />,
        children: [
            {
                path: "general",
                element: (
                    <div>
                        General
                    </div>
                ),
            },
            ...domainSettingsRoutes,
            ...userSettingsRoutes,
            {
                path: "*",
                element: (
                    <ComingSoon />
                ),
            }
        ],
    },
];
