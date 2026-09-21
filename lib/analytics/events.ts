/**
 * Typed analytics event contract.
 *
 * The event names come from the approved Buyer System activation brief
 * (website/02-activation/buyer-system-lead-magnet-strategy-2026-09.md §4) and
 * the foundation work order.
 *
 * Defining the contract is NOT the same as connecting a vendor. No Google
 * Analytics ID, no GTM container, no Meta Pixel, no Hotjar, no webhook and no
 * CRM credential exists in this repository.
 */

export interface AnalyticsEventMap {
  nav_cta_click: {
    /** Stable identifier of the navigation control, not its visible label. */
    location: 'header' | 'mobile_menu' | 'footer';
    target: string;
  };
  primary_cta_click: {
    section: string;
    target: string;
  };
  section_view: {
    section: string;
  };
  calculator_start: {
    calculator: string;
    source_page: string;
  };
  calculator_result_view: {
    calculator: string;
    source_page: string;
  };
  lead_capture_submit: {
    source_page: string;
    calculator?: string;
  };
  booking_start: {
    source_page: string;
  };
  booking_complete: {
    source_page: string;
  };
}

export type AnalyticsEventName = keyof AnalyticsEventMap;

export type AnalyticsEvent = {
  [K in AnalyticsEventName]: { name: K; payload: AnalyticsEventMap[K] };
}[AnalyticsEventName];

export const ANALYTICS_EVENT_NAMES = [
  'nav_cta_click',
  'primary_cta_click',
  'section_view',
  'calculator_start',
  'calculator_result_view',
  'lead_capture_submit',
  'booking_start',
  'booking_complete',
] as const satisfies readonly AnalyticsEventName[];
