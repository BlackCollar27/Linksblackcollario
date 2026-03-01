import { createBrowserRouter, Outlet } from "react-router";
import { AuthProvider } from "./contexts/auth-context";
import { ThemeProvider } from "./contexts/theme-context";
import { LandingPage } from "./pages/landing-page";
import { AuthPage } from "./pages/auth-page";
import { DashboardPage } from "./pages/dashboard-page";
import { LinksPage } from "./pages/links-page";
import { LinkDetailPage } from "./pages/link-detail-page";
import { LinkEditPage } from "./pages/link-edit-page";
import { CampaignsPage } from "./pages/campaigns-page";
import { CampaignDetailPage } from "./pages/campaign-detail-page";
import { CampaignFormPage } from "./pages/campaign-form-page";
import { GlobalAnalyticsPage } from "./pages/global-analytics-page";
import { AnalyticsPage } from "./pages/analytics-page";
import { TeamPage } from "./pages/team-page";
import { SettingsPage } from "./pages/settings-page";

function RootLayout() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Outlet />
      </AuthProvider>
    </ThemeProvider>
  );
}

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: "/",
        Component: LandingPage,
      },
      {
        path: "/auth",
        Component: AuthPage,
      },
      {
        path: "/dashboard",
        Component: DashboardPage,
      },
      {
        path: "/links",
        Component: LinksPage,
      },
      {
        path: "/links/:linkId",
        Component: LinkDetailPage,
      },
      {
        path: "/links/:linkId/edit",
        Component: LinkEditPage,
      },
      {
        path: "/campaigns",
        Component: CampaignsPage,
      },
      {
        path: "/campaigns/new",
        Component: CampaignFormPage,
      },
      {
        path: "/campaigns/:campaignId",
        Component: CampaignDetailPage,
      },
      {
        path: "/campaigns/:campaignId/edit",
        Component: CampaignFormPage,
      },
      {
        path: "/analytics",
        Component: GlobalAnalyticsPage,
      },
      {
        path: "/analytics/:linkId",
        Component: AnalyticsPage,
      },
      {
        path: "/team",
        Component: TeamPage,
      },
      {
        path: "/settings",
        Component: SettingsPage,
      },
    ],
  },
]);