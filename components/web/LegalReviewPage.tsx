import { Container } from '@/components/layout/Container';
import { WebHeader } from './WebHeader';
import { WebFooter } from './WebFooter';
import { CookiePreferencesReview } from './CookiePreferencesReview';
import { BUYER_TOOLS_LABEL, HOME_PREVIEW_ROUTE, UNIFIED_WEB_NAV } from '@/content/en/site-navigation';
import styles from './LegalReviewPage.module.css';

const copy = {
  notice: { title: 'Legal notice', sections: [
    ['Website operator', 'PENDING_APPROVAL: verified legal name, tax identification and legal address. The brand name and the office contact details do not substitute for the operator’s legal identity.'],
    ['Professional and registration information', 'PENDING_APPROVAL: applicable registration, regulated professional details and approved contact information.'],
    ['Use of this website', 'PENDING_APPROVAL: scope, intellectual property and approved terms of use.'],
  ] },
  privacy: { title: 'Privacy policy', sections: [
    ['Controller and contact', 'PENDING_APPROVAL: verified controller identity and contact for privacy requests.'],
    ['Purposes and legal basis', 'PENDING_APPROVAL: treatment of enquiries and any other approved purpose, its legal basis and retention criteria.'],
    ['Recipients and transfers', 'PENDING_APPROVAL: actual processors, hosting and contact services, recipients and any international transfers.'],
    ['Your rights', 'PENDING_APPROVAL: approved instructions for exercising rights and contacting the supervisory authority.'],
  ] },
  cookies: { title: 'Cookie policy', sections: [
    ['Cookie inventory', 'PENDING_APPROVAL: browser and network audit of the final configuration, including purposes, providers and durations.'],
    ['Optional services', 'Analytics, tags and other optional providers require an express implementation decision. This review does not connect them.'],
  ] },
} as const;

export function LegalReviewPage({ kind }: { kind: keyof typeof copy }) {
  const page = copy[kind];
  return <>
    <WebHeader nav={UNIFIED_WEB_NAV} ctaLabel={BUYER_TOOLS_LABEL} brandHref={HOME_PREVIEW_ROUTE} showLanguageSwitcher={false} />
    <main id="main" tabIndex={-1} className={styles.page}>
      <Container><div className={styles.copy}>
        <h1>{page.title}</h1>
        <aside className={styles.notice} aria-label="Review status"><strong>Draft for visual review — PENDING_APPROVAL</strong><p>This page is a layout proposal, not an approved legal policy. Information awaiting verification is explicitly marked below.</p></aside>
        {page.sections.map(([title, body]) => <section className={styles.section} key={title}><h2>{title}</h2><p>{body}</p></section>)}
        {kind === 'cookies' ? <CookiePreferencesReview /> : null}
      </div></Container>
    </main>
    <WebFooter showLanguageStatus={false} />
  </>;
}
