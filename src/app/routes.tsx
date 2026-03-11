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
import { CampaignAddLinksPage } from "./pages/campaign-add-links-page";
import { GlobalAnalyticsPage } from "./pages/global-analytics-page";
import { AnalyticsPage } from "./pages/analytics-page";
import { TeamPage } from "./pages/team-page";
import { TeamMemberDetailPage } from "./pages/team-member-detail-page";
import { WorkspacesPage } from "./pages/workspaces-page";
import { WorkspaceDetailPage } from "./pages/workspace-detail-page";
import { SettingsPage } from "./pages/settings-page";
import { UseCasesPage } from "./pages/use-cases-page";
import { BookACallPage } from "./pages/book-a-call-page";
import { PricingPage } from "./pages/pricing-page";

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
        path: "/campaigns/:campaignId/add-links",
        Component: CampaignAddLinksPage,
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
        path: "/team/:memberId",
        Component: TeamMemberDetailPage,
      },
      {
        path: "/workspaces",
        Component: WorkspacesPage,
      },
      {
        path: "/workspaces/:workspaceId",
        Component: WorkspaceDetailPage,
      },
      {
        path: "/settings",
        Component: SettingsPage,
      },
      {
        path: "/use-cases",
        Component: UseCasesPage,
      },
      {
        path: "/book-a-call",
        Component: BookACallPage,
      },
      {
        path: "/pricing",
        Component: PricingPage,
      },
    ],
  },
]);