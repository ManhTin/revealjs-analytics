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
import { auth } from "@/lib/auth";
import { formatToTimeString } from "@/lib/utils";
import { AnalyticsRepository, PresentationRepository } from "@/repositories";
import { PresentationAnalyticsService } from "@/services";
import {
  ArrowLeft,
  ArrowRight,
  BarChart3,
  ChevronLeft,
  Clock,
  LinkIcon,
  Users,
} from "lucide-react";
import { redirect } from "next/navigation";

export default async function PageView({ params }: { params: { id: string } }) {
  const { id } = await params;
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) redirect("/sign-in");

  const analyticsRepository = new AnalyticsRepository();
  const presentationAnalyticsService = new PresentationAnalyticsService(analyticsRepository);
  const presentationRepository = new PresentationRepository();

  const presentation = await presentationRepository.getPresentationById(id, userId);

  const { views, slideData, exitData, startData, quizData, mediaData, linkClicks } =
    await presentationAnalyticsService.call(id);

  return (
    <>
      <Header
        title="Presentation Detail"
        action={{ path: "/presentations", label: "Back", icon: ChevronLeft }}
      />
      <div className="mb-4 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">{presentation.title}</h1>
          <p className="text-muted-foreground">Analytics Overview</p>
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
            <div className="text-2xl font-bold">{views.totalViews}</div>
            <p className="text-xs text-muted-foreground">Non-Unique views</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Time Spent</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatToTimeString(views.sumDwellTime)}</div>
            <p className="text-xs text-muted-foreground">Across all views</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Average Time Spent</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatToTimeString(Math.round(views.avgDwellTime))}
            </div>
            <p className="text-xs text-muted-foreground">Per viewer</p>
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
            {quizData.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">No quiz data available</div>
            ) : (
              <>
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="border rounded-md p-4 text-center">
                    <div className="text-2xl font-bold">{quizData.length}</div>
                    <div className="text-sm text-muted-foreground">Quizzes</div>
                  </div>
                  <div className="border rounded-md p-4 text-center">
                    <div className="text-2xl font-bold">
                      {quizData.reduce((acc, quiz) => acc + quiz.totalParticipants, 0)}
                    </div>
                    <div className="text-sm text-muted-foreground">Total Participants</div>
                  </div>
                  <div className="border rounded-md p-4 text-center">
                    <div className="text-2xl font-bold text-blue-500">
                      {quizData.length > 0
                        ? Math.round(
                            (quizData.reduce((acc, quiz) => acc + quiz.averageScore, 0) /
                              quizData.length) *
                              100,
                          )
                        : 0}
                      %
                    </div>
                    <div className="text-sm text-muted-foreground">Average Score</div>
                  </div>
                </div>

                {quizData.length > 0 && (
                  <div className="space-y-3 mt-4">
                    <h4 className="text-sm font-medium">Individual Quiz Performance</h4>
                    {quizData.map((quiz) => (
                      <div
                        key={`quiz-${quiz.title}`}
                        className="flex items-center justify-between border-b pb-2"
                      >
                        <div className="font-medium truncate max-w-[200px]">{quiz.title}</div>
                        <div className="flex items-center gap-4">
                          <div className="text-sm text-muted-foreground">
                            {quiz.totalParticipants} participants
                          </div>
                          <div className="font-bold text-blue-500">
                            {Math.round(quiz.averageScore * 100)}% avg
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Media Engagement</CardTitle>
            <CardDescription>Audio, video, and interactive content</CardDescription>
          </CardHeader>
          <CardContent>
            {mediaData.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">No media data available</div>
            ) : (
              <>
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="border rounded-md p-4 text-center">
                    <div className="text-2xl font-bold">{mediaData.length}</div>
                    <div className="text-sm text-muted-foreground">Media files</div>
                  </div>
                  <div className="border rounded-md p-4 text-center">
                    <div className="text-2xl font-bold">
                      {mediaData.reduce((acc, media) => acc + media.playCount, 0)}
                    </div>
                    <div className="text-sm text-muted-foreground">Total Plays</div>
                  </div>
                  <div className="border rounded-md p-4 text-center">
                    <div className="text-2xl font-bold text-blue-500">
                      {mediaData.length > 0
                        ? Math.round(
                            mediaData.reduce((acc, media) => acc + media.avgProgress, 0) /
                              mediaData.length,
                          )
                        : 0}
                      %
                    </div>
                    <div className="text-sm text-muted-foreground">Average Progress</div>
                  </div>
                </div>

                {mediaData.length > 0 && (
                  <div className="space-y-3 mt-4">
                    <h4 className="text-sm font-medium">Individual Media Performance</h4>
                    {mediaData.map((media) => (
                      <div
                        key={`media-${media.source}`}
                        className="flex items-center justify-between border-b pb-2"
                      >
                        <div className="font-medium truncate max-w-[200px]">{media.source}</div>
                        <div className="flex items-center gap-4">
                          <div className="text-sm text-muted-foreground">
                            {media.playCount} plays
                          </div>
                          <div className="font-bold text-blue-500">
                            {Math.round(media.avgProgress)}% progress
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
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
          {linkClicks.length === 0 ? (
            <div className="text-center py-4 text-muted-foreground">
              No link click data available
            </div>
          ) : (
            <div className="space-y-4">
              {linkClicks.map((item) => (
                <div key={`link-${item.href}`} className="flex items-center justify-between">
                  <div className="font-medium truncate max-w-md">{item.href}</div>
                  <div className="font-bold">{item.clicks} clicks</div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
        {linkClicks.length > 0 && (
          <CardFooter className="text-sm text-muted-foreground">
            Total of {linkClicks.reduce((sum, item) => sum + item.clicks, 0)} clicks on external
            links
          </CardFooter>
        )}
      </Card>

      {/* Audience Flow */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
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
              {startData.slice(0, 5).map((item) => (
                <div key={`start-${item.slide}`} className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Slide #{item.slide}</div>
                    <div className="text-sm text-muted-foreground">
                      {((item.count / views.totalViews) * 100).toFixed(1)}% start rate
                    </div>
                  </div>
                  <div className="font-bold text-green-500">{item.count} starts</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

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
              {exitData.slice(0, 5).map((item) => (
                <div key={`exit-${item.slide}`} className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Slide #{item.slide}</div>
                    <div className="text-sm text-muted-foreground">
                      {((item.count / views.totalViews) * 100).toFixed(1)}% exit rate
                    </div>
                  </div>
                  <div className="font-bold text-red-500">{item.count} exits</div>
                </div>
              ))}
            </div>
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
          <CardContent>
            {/* Chart would go here - using mock bar representation */}
            <div className="space-y-2">
              {slideData.map((item) => (
                <div key={`view-${item.slide}`} className="flex items-center">
                  <span className="w-10">#{item.slide}</span>
                  <div className="relative w-full bg-muted h-4 rounded">
                    <div
                      className="absolute left-0 top-0 h-4 bg-primary rounded"
                      style={{
                        width: `${(item.views / Math.max(...slideData.map((i) => i.views))) * 100}%`,
                      }}
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
          <CardContent>
            {/* Chart would go here - using mock bar representation */}
            <div className="space-y-2">
              {slideData.map((item) => (
                <div key={`time-${item.slide}`} className="flex items-center">
                  <span className="w-10">#{item.slide}</span>
                  <div className="relative w-full bg-muted h-4 rounded">
                    <div
                      className="absolute left-0 top-0 h-4 bg-blue-500 rounded"
                      style={{
                        width: `${(item.timeSpent / Math.max(...slideData.map((i) => i.timeSpent))) * 100}%`,
                      }}
                    />
                  </div>
                  <span className="w-12 text-right text-xs">{item.timeSpent}s</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
