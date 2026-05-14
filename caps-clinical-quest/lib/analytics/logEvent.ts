import { supabase } from '@/lib/supabase/client';

interface LogEventInput {
  user_id?: string;
  case_id?: number;
  event_type: string;
  metadata?: Record<string, unknown>;
}

export async function logEvent({
  user_id,
  case_id,
  event_type,
  metadata = {},
}: LogEventInput) {
  const { error } = await supabase
    .from('analytics_events')
    .insert({
      user_id,
      case_id,
      event_type,
      metadata,
    });

  if (error) {
    console.error('Analytics logging error:', error.message);
  }
}
