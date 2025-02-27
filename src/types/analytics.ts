export interface SlideData {
  slide: number;
  views: number;
  timeSpent: number;
}

export interface ExitData {
  slide: number;
  count: number;
}

export interface StartData {
  slide: number;
  count: number;
}

export interface QuizData {
  title: string;
  averageScore: number;
  totalParticipants: number;
}

export interface MediaData {
  source: string;
  playCount: number;
  avgProgress: number;
}

export interface LinkClickData {
  href: string;
  clicks: number;
}

export interface PresentationViews {
  totalViews: number;
  sumDwellTime: number;
  avgDwellTime: number;
}

export interface PresentationAnalytics {
  views: PresentationViews;
  slideData: SlideData[];
  exitData: ExitData[];
  startData: StartData[];
  quizData: QuizData[];
  mediaData: MediaData[];
  linkClicks: LinkClickData[];
}

export interface DateRange {
  from: Date | undefined;
  to: Date | undefined;
}
