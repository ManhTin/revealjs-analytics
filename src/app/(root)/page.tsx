import { ActivityChart } from "@/components/dashboard/activity-chart";
import Header from "@/components/header";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DatePickerWithRange } from "@/components/ui/date-range-picker";
import { findUserOrRedirect, formatToTimeString } from "@/lib/utils";
import { AnalyticsRepository, PresentationRepository } from "@/repositories";
import { DashboardAnalyticsService } from "@/services";
import { Activity, BarChart3, Clock, Users } from "lucide-react";
import { Suspense } from "react";

export default async function HomePage() {
  const userId = await findUserOrRedirect();

  const analyticsRepository = new AnalyticsRepository();
  const presentaionRepository = new PresentationRepository();
  const dashboardAnalyticsService = new DashboardAnalyticsService(
    analyticsRepository,
    presentaionRepository,
  );

  const { views, viewsByDate, recentActivePresentations } =
    await dashboardAnalyticsService.call(userId);

  const totalViews = views.reduce((sum, item) => sum + item.totalViews, 0);
  const totalDwellTime = views.reduce((sum, item) => sum + item.sumDwellTime, 0);
  const avgDwellTime = Math.round(totalDwellTime / totalViews);

  return (
    <>
      <Header title="Overview" />
      <div className="mb-4 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Welcome back</h1>
          <p className="text-muted-foreground">Recent activity in your presentations</p>
        </div>
        <div className="hidden sm:block">
          <DatePickerWithRange />
        </div>
      </div>

      {/* Top Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Views</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalViews}</div>
            <p className="text-xs text-muted-foreground">
              Non-Unique views across all presentations
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Time Spent</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatToTimeString(totalDwellTime)}</div>
            <p className="text-xs text-muted-foreground">Across all presentations</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Average Time Spent</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatToTimeString(avgDwellTime)}</div>
            <p className="text-xs text-muted-foreground">Per viewer</p>
          </CardContent>
        </Card>
      </div>

      {/* Chart */}
      <Suspense fallback={<div>Loading...</div>}>
        <ActivityChart chartData={viewsByDate} />
      </Suspense>

      {/* Active presentations */}
      <Card className="mb-6 h-full">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Active Presentations</CardTitle>
            <CardDescription>Latest activity</CardDescription>
          </div>
          <Activity className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          {recentActivePresentations.length === 0 ? (
            <div className="text-center py-4 text-muted-foreground">
              No link click data available
            </div>
          ) : (
            <div className="space-y-4">
              {recentActivePresentations.map((item) => (
                <div key={`link-${item.id}`} className="flex items-center justify-between">
                  <div className="font-medium truncate max-w-md">{item.title}</div>
                  <div className="font-bold">{item._count.presentationCloses} clicks</div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
        {recentActivePresentations.length > 0 && (
          <CardFooter className="text-sm text-muted-foreground">
            Total of{" "}
            {recentActivePresentations.reduce(
              (sum, item) => sum + item._count.presentationCloses,
              0,
            )}{" "}
            views total
          </CardFooter>
        )}
      </Card>
    </>
  );
}
