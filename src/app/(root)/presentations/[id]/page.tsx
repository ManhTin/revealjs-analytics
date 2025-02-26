import Header from "@/components/header";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getPresentationById } from "@/data/presentation";
import {
  ArrowLeft,
  ArrowRight,
  BarChart3,
  CheckCircle,
  ChevronLeft,
  Clock,
  LinkIcon,
  PlayCircle,
  Users,
} from "lucide-react";

export default async function PageView({ params }: { params: { id: string } }) {
  // TODO check if user is allowed to view this presentation
  const { id } = await params;
  const presentation = await getPresentationById(id);

  // Mock data for charts and visualizations
  const totalViews = 1204;
  const totalTimeSum = 11412;
  const avgTimeString = 840;

  const mockSlideData = [
    { slide: 1, views: 150, timeSpent: 320 },
    { slide: 2, views: 145, timeSpent: 280 },
    { slide: 3, views: 130, timeSpent: 420 },
    { slide: 4, views: 120, timeSpent: 250 },
    { slide: 5, views: 110, timeSpent: 200 },
  ];

  const mockExitData = [
    { slide: 3, count: 25 },
    { slide: 5, count: 18 },
    { slide: 7, count: 12 },
    { slide: 1, count: 10 },
    { slide: 9, count: 8 },
  ];

  const mockStartData = [
    { slide: 1, count: 150 },
    { slide: 4, count: 45 },
    { slide: 7, count: 30 },
    { slide: 10, count: 15 },
  ];

  const mockQuizData = {
    completion: 78,
    averageScore: 72,
    totalParticipants: 120,
    questions: 5,
  };

  const mockLinkClicks = [
    { href: "https://example.com/resource1", clicks: 45 },
    { href: "https://example.com/resource2", clicks: 32 },
    { href: "https://example.com/resource3", clicks: 27 },
  ];

  const mockMediaData = {
    started: 95,
    completed: 72,
    completionRate: 76,
  };

  return (
    <>
      <Header
        title="Presentation Detail"
        action={{ path: "/presentations", label: "Back", icon: ChevronLeft }}
      />
      <div className="mb-4">
        <h1 className="text-2xl font-bold">{presentation.title}</h1>
        <p className="text-muted-foreground">Analytics Overview</p>
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
            <p className="text-xs text-muted-foreground">+20% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Time Spent</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalTimeSum || "00:45:30"}</div>
            <p className="text-xs text-muted-foreground">Across all views</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Average Time Spent</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{avgTimeString || "00:05:12"}</div>
            <p className="text-xs text-muted-foreground">Per viewer</p>
          </CardContent>
        </Card>
      </div>

      {/* Slide Analytics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Slide Views</CardTitle>
            <CardDescription>Number of views per slide</CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            {/* Chart would go here - using mock bar representation */}
            <div className="space-y-2">
              {mockSlideData.map((item) => (
                <div key={`view-${item.slide}`} className="flex items-center">
                  <span className="w-10">#{item.slide}</span>
                  <div className="relative w-full bg-muted h-4 rounded">
                    <div
                      className="absolute left-0 top-0 h-4 bg-primary rounded"
                      style={{ width: `${(item.views / 150) * 100}%` }}
                    />
                  </div>
                  <span className="w-12 text-right text-xs">{item.views}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Time Spent Per Slide</CardTitle>
            <CardDescription>Average seconds spent on each slide</CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            {/* Chart would go here - using mock bar representation */}
            <div className="space-y-2">
              {mockSlideData.map((item) => (
                <div key={`time-${item.slide}`} className="flex items-center">
                  <span className="w-10">#{item.slide}</span>
                  <div className="relative w-full bg-muted h-4 rounded">
                    <div
                      className="absolute left-0 top-0 h-4 bg-blue-500 rounded"
                      style={{ width: `${(item.timeSpent / 420) * 100}%` }}
                    />
                  </div>
                  <span className="w-12 text-right text-xs">{item.timeSpent}s</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Audience Flow */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Most Exited Slides</CardTitle>
              <CardDescription>Where viewers leave the presentation</CardDescription>
            </div>
            <ArrowRight className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockExitData.slice(0, 3).map((item) => (
                <div key={`exit-${item.slide}`} className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Slide #{item.slide}</div>
                    <div className="text-sm text-muted-foreground">
                      {((item.count / totalViews) * 100).toFixed(1)}% exit rate
                    </div>
                  </div>
                  <div className="font-bold text-red-500">{item.count} exits</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Most Started Slides</CardTitle>
              <CardDescription>Where viewers begin viewing</CardDescription>
            </div>
            <ArrowLeft className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockStartData.slice(0, 3).map((item) => (
                <div key={`start-${item.slide}`} className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Slide #{item.slide}</div>
                    <div className="text-sm text-muted-foreground">
                      {((item.count / totalViews) * 100).toFixed(1)}% start rate
                    </div>
                  </div>
                  <div className="font-bold text-green-500">{item.count} starts</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quiz and Media Analytics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Quiz Results</CardTitle>
            <CardDescription>Performance metrics from quizzes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="border rounded-md p-4 text-center">
                <div className="text-2xl font-bold text-blue-500">{mockQuizData.averageScore}%</div>
                <div className="text-sm text-muted-foreground">Average Score</div>
              </div>
              <div className="border rounded-md p-4 text-center">
                <div className="text-2xl font-bold text-green-500">{mockQuizData.completion}%</div>
                <div className="text-sm text-muted-foreground">Completion Rate</div>
              </div>
              <div className="border rounded-md p-4 text-center">
                <div className="text-2xl font-bold">{mockQuizData.totalParticipants}</div>
                <div className="text-sm text-muted-foreground">Participants</div>
              </div>
              <div className="border rounded-md p-4 text-center">
                <div className="text-2xl font-bold">{mockQuizData.questions}</div>
                <div className="text-sm text-muted-foreground">Questions</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Media Engagement</CardTitle>
            <CardDescription>Audio, video, and interactive content</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="border rounded-md p-4 text-center">
                <div className="text-2xl font-bold">{mockMediaData.started}</div>
                <div className="text-sm text-muted-foreground">Media Started</div>
              </div>
              <div className="border rounded-md p-4 text-center">
                <div className="text-2xl font-bold">{mockMediaData.completed}</div>
                <div className="text-sm text-muted-foreground">Media Completed</div>
              </div>
              <div className="col-span-2 border rounded-md p-4 text-center">
                <div className="text-2xl font-bold text-blue-500">
                  {mockMediaData.completionRate}%
                </div>
                <div className="text-sm text-muted-foreground">Media Completion Rate</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Link Clicks */}
      <Card className="mb-6">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Link Clicks</CardTitle>
            <CardDescription>External resource engagement</CardDescription>
          </div>
          <LinkIcon className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockLinkClicks.map((item, i) => (
              <div key={`link-${i}`} className="flex items-center justify-between">
                <div className="font-medium truncate max-w-md">{item.href}</div>
                <div className="font-bold">{item.clicks} clicks</div>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter className="text-sm text-muted-foreground">
          Total of {mockLinkClicks.reduce((sum, item) => sum + item.clicks, 0)} clicks on external
          links
        </CardFooter>
      </Card>
    </>
  );
}
