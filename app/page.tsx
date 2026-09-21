import type { Metadata } from 'next';
import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { Stack } from '@/components/layout/Stack';
import { Grid } from '@/components/layout/Grid';
import { Heading } from '@/components/ui/Heading';
import { Text } from '@/components/ui/Text';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { LinkButton } from '@/components/ui/LinkButton';
import { Divider } from '@/components/ui/Divider';
import { buildMetadata, APPROVED_BRAND_PROMISE } from '@/lib/seo/metadata';
import { siteConfig } from '@/lib/seo/config';

export const metadata: Metadata = buildMetadata({
  title: 'Foundation preview',
  description:
    'Internal technical preview of the new Sarah Katerina website. Not a public site and not approved for production.',
  path: '/',
});

/**
 * Overview page.
 *
 * This is NOT a landing page and must not be mistaken for one. No approved
 * marketing copy, hero narrative, claim, metric, testimonial or commercial CTA
 * exists for this phase. The page states what the repository is and where the
 * component laboratory lives.
 *
 * The only brand string used is "Clarity before commitment.", which is
 * APPROVED + PUBLIC_PRODUCTION in the source of truth.
 */
export default function OverviewPage() {
  return (
    <>
      <Section spacing="generous">
        <Container>
          <Stack gap={24}>
            <Stack gap={16} direction="row">
              <Badge tone="pending">NOT PRODUCTION</Badge>
              <Badge tone="outline">{siteConfig.mode.toUpperCase()}</Badge>
              <Badge tone="outline">NOINDEX</Badge>
            </Stack>

            <Eyebrow>Technical foundation</Eyebrow>

            {/* Exactly one h1 per page. */}
            <Heading level={1} measure>
              {APPROVED_BRAND_PROMISE}
            </Heading>

            <Text variant="lead">
              This repository holds the technical and visual foundation for the new Sarah Katerina
              website. It is an internal build: nothing here is approved for publication, and no
              page in it represents finished marketing.
            </Text>

            <Divider accent />

            <Stack gap={16} direction="row">
              <LinkButton href="/foundation" variant="primary">
                Explore section
              </LinkButton>
            </Stack>
          </Stack>
        </Container>
      </Section>

      <Section spacing="comfortable" surface="soft">
        <Container>
          <Stack gap={32}>
            <Heading level={2} measure>
              What this phase does and does not include
            </Heading>

            <Grid columns={3}>
              <Card variant="feature">
                <Heading level={3}>Included</Heading>
                <Text variant="bodySmall" full>
                  Design tokens ported from the source of truth, reusable accessible components,
                  responsive header and footer, technical SEO scaffolding and a typed analytics
                  contract.
                </Text>
              </Card>

              <Card variant="feature">
                <Heading level={3}>Not included</Heading>
                <Text variant="bodySmall" full>
                  Final landings for Investment, Property Purchase, Tax Advisory or Property
                  Management. No final copy, no CRM integration, no calculators, no domain
                  connection and no indexable publication.
                </Text>
              </Card>

              <Card variant="decision">
                <Heading level={3}>Needs a human decision</Heading>
                <Text variant="bodySmall" full>
                  The canonical production host, the institutional descriptor, the logo asset,
                  legal entity details, contact channels and every commercial claim. See AGENTS.md
                  before changing anything in those areas.
                </Text>
              </Card>
            </Grid>
          </Stack>
        </Container>
      </Section>
    </>
  );
}
