import type { Format, Platform } from './types';

export interface MetricDef { key: string; label: string; hint?: string }

// Metric sets per platform/format. Kept separate so raw numbers are never compared across platforms.
export const METRICS: Record<string, MetricDef[]> = {
  instagram: [
    { key: 'views', label: 'Views' }, { key: 'reach', label: 'Accounts reached' },
    { key: 'nonFollowerPct', label: 'Reach from non-followers %', hint: 'Insights → Reach breakdown' },
    { key: 'avgWatchSec', label: 'Avg watch time (s)', hint: 'Reels only' }, { key: 'likes', label: 'Likes' }, { key: 'comments', label: 'Comments' },
    { key: 'shares', label: 'Shares' }, { key: 'saves', label: 'Saves' }, { key: 'profileVisits', label: 'Profile visits' },
    { key: 'follows', label: 'Follows' }, { key: 'linkTaps', label: 'Link taps / website clicks' }, { key: 'dms', label: 'Qualified DMs' },
  ],
  linkedin: [
    { key: 'impressions', label: 'Impressions' }, { key: 'membersReached', label: 'Members reached' }, { key: 'reactions', label: 'Reactions' },
    { key: 'comments', label: 'Comments' }, { key: 'icpComments', label: 'Comments from target roles', hint: 'Count manually' }, { key: 'reposts', label: 'Reposts' },
    { key: 'profileViews', label: 'Profile views (from post)' }, { key: 'clicks', label: 'Link / document clicks' }, { key: 'conversations', label: 'Conversations started' },
  ],
  facebook: [
    { key: 'reach', label: 'Reach' }, { key: 'plays', label: 'Plays / views' }, { key: 'reactions', label: 'Reactions' }, { key: 'comments', label: 'Comments' },
    { key: 'shares', label: 'Shares' }, { key: 'linkClicks', label: 'Link clicks' }, { key: 'messages', label: 'Messenger conversations' },
  ],
  'yt-long': [
    { key: 'impressions', label: 'Impressions' }, { key: 'ctr', label: 'Impressions CTR %' }, { key: 'views', label: 'Views' },
    { key: 'watchTimeHours', label: 'Watch time (hours)' }, { key: 'avgViewDurationSec', label: 'Avg view duration (s)' },
    { key: 'searchPct', label: 'Traffic from YouTube search %' }, { key: 'returningViewers', label: 'Returning viewers' },
    { key: 'subscribers', label: 'Subscribers gained' }, { key: 'websiteClicks', label: 'Website clicks (UTM)' },
  ],
  'yt-short': [
    { key: 'views', label: 'Views' }, { key: 'viewedPct', label: 'Viewed (vs swiped away) %' }, { key: 'avgViewDurationSec', label: 'Avg view duration (s)' },
    { key: 'likes', label: 'Likes' }, { key: 'subscribers', label: 'Subscribers gained' }, { key: 'relatedClicks', label: 'Related-video clicks' },
  ],
};

export function metricsFor(platform: Platform, format: Format): MetricDef[] {
  if (platform === 'youtube') return METRICS[format === 'yt-long' ? 'yt-long' : 'yt-short'];
  return METRICS[platform] ?? [{ key: 'visits', label: 'Visits' }, { key: 'enquiries', label: 'Enquiries' }];
}

export const FUNNEL_LAYERS = [
  { key: 'reach', label: 'Reach', fields: ['reach', 'impressions', 'views', 'plays', 'membersReached'] },
  { key: 'engagement', label: 'Meaningful engagement', fields: ['shares', 'saves', 'comments', 'reposts', 'icpComments'] },
  { key: 'profile', label: 'Profile / channel activity', fields: ['profileVisits', 'profileViews', 'follows', 'subscribers'] },
  { key: 'traffic', label: 'Website traffic', fields: ['linkTaps', 'linkClicks', 'clicks', 'websiteClicks'] },
  { key: 'conversations', label: 'Identifiable conversations', fields: ['dms', 'messages', 'conversations'] },
];
