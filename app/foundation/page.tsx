import type { Metadata } from 'next';
import { AppChrome } from '@/components/layout/AppChrome';
import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { Stack } from '@/components/layout/Stack';
import { Grid } from '@/components/layout/Grid';
import { Heading } from '@/components/ui/Heading';
import { Text } from '@/components/ui/Text';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Badge } from '@/components/ui/Badge';
import { Divider } from '@/components/ui/Divider';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { Button } from '@/components/ui/Button';
import { LinkButton } from '@/components/ui/LinkButton';
import { Card, LinkCard, Metric } from '@/components/ui/Card';
import { IconPlaceholder } from '@/components/ui/IconPlaceholder';
import { ResponsiveImage } from '@/components/ui/ResponsiveImage';
import { VideoPlaceholder } from '@/components/ui/VideoPlaceholder';
import { Reveal } from '@/components/motion/Reveal';
import { Specimen, TokenTable, Swatch, SpacingBar } from '@/components/sections/Specimen';
import { buildMetadata } from '@/lib/seo/metadata';
import { ANALYTICS_EVENT_NAMES } from '@/lib/analytics/events';

/**
 * INTERNAL COMPONENT LABORATORY — never indexable, never in the sitemap.
 *
 * `laboratory: true` forces noindex/nofollow regardless of the site-wide
 * indexing flag. app/sitemap.ts excludes this route by construction and
 * next.config.ts adds an X-Robots-Tag for it at the transport level.
 */
export const metadata: Metadata = buildMetadata({
  title: 'Foundation laboratory',
  description: 'Internal visual system laboratory. Not a public page.',
  path: '/foundation',
  laboratory: true,
});

const COLOR_ROLES = [
  ['--sk-app-background-primary', 'Page ground', 'Ivory #F5F0E7'],
  ['--sk-app-background-secondary', 'Attention block', 'Sage #D8DDD4'],
  ['--sk-app-surface', 'Elevated surface', 'Warm White #FFFDF9'],
  ['--sk-app-surface-warm', 'Warm neutral', 'Sand #E8DDCA'],
  ['--sk-app-surface-dark', 'Conversion / dark panel', 'Forest #173B32'],
  ['--sk-app-text-primary', 'Primary text', 'Ink #17211E — 14.54:1 on Ivory'],
  ['--sk-app-text-secondary', 'Secondary text', 'Forest — 10.83:1 on Ivory'],
  ['--sk-app-accent', 'Editorial accent', 'Terracotta #B96F55 — never interactive'],
  ['--sk-app-border-subtle', 'Subtle border', 'Sand #E8DDCA'],
  ['--sk-app-action-primary', 'Primary action', 'Forest #173B32'],
  ['--sk-app-focus-ring', 'Focus ring (light)', 'Forest #173B32'],
  ['--sk-app-danger', 'Danger', 'Error red #C53030'],
  ['--sk-app-success', 'Success', 'Forest #173B32'],
] as const;

const SPACING = ['4', '8', '16', '24', '32', '48', '64', '80'] as const;

const TYPE_SCALE = [
  ['display / h1', 'Fraunces 400', 'clamp(38px, 5vw, 76px)', '1.06'],
  ['h2', 'Fraunces 400', 'clamp(30px, 3.4vw, 50px)', '1.12'],
  ['h3', 'Fraunces 500', 'clamp(17px, 1.35vw, 22px)', '1.25'],
  ['lead', 'Inter 400', 'clamp(18px, 1.4vw, 20px)', '1.65'],
  ['body', 'Inter 400', 'clamp(16px, 1.1vw, 18px)', '1.55'],
  ['body-small', 'Inter 400', '14px', '1.55'],
  ['eyebrow', 'Inter 600', '13px · 0.32em', '1.2'],
  ['caption', 'Inter 400', 'clamp(13px, 1vw, 14px)', '1.5'],
  ['legal', 'Inter 400', 'clamp(12px, .9vw, 13px)', '1.5'],
] as const;

const BREAKPOINTS = [
  ['320px', 'Minimum supported width', 'Single column, full-width controls'],
  ['375px', 'Common mobile', 'Single column; footer groups become two columns'],
  ['768px', 'Primary collapse — PENDING_APPROVAL', 'Desktop nav, 2-up grids, wider gutters'],
  ['1024px', 'Laptop', '3-up and 4-up grids, generous gutters'],
  ['1440px', 'Large desktop', 'Container caps at 1200px content width'],
] as const;

export default function FoundationPage() {
  return (
    <AppChrome>
      {/* ---------------------------------------------------------------- */}
      <Section spacing="generous">
        <Container>
          <Stack gap={24}>
            <Stack gap={8} direction="row">
              <Badge tone="pending">INTERNAL LABORATORY</Badge>
              <Badge tone="pending">NOINDEX · NOFOLLOW</Badge>
              <Badge tone="outline">NOT A LANDING PAGE</Badge>
            </Stack>

            <Eyebrow>Foundation</Eyebrow>

            <Heading level={1} measure>
              Visual system laboratory
            </Heading>

            <Text variant="lead">
              Every specimen below is a live component rendered from the canonical token layer. The
              purpose is verification, not presentation: this page is deliberately not composed as
              a finished section and carries no approved copy, claim, metric or commercial CTA.
            </Text>

            <Divider accent />

            <Text variant="bodySmall">
              Tokens are copied byte-for-byte from{' '}
              <code>brand-system/tokens/tokens.json</code> in the source-of-truth repository. No
              colour, radius, spacing or motion value in this application was invented. See
              README.md for the exact commit and blob hash.
            </Text>
          </Stack>
        </Container>
      </Section>

      {/* ---------------------------------------------------------------- */}
      <Section spacing="comfortable" surface="soft">
        <Container>
          <Stack gap={32}>
            <SectionLabel code="01">Colour roles</SectionLabel>
            <Heading level={2}>Semantic colour</Heading>
            <Text variant="bodySmall">
              Roles, not raw hues. Terracotta is editorial only: it must never be used for body
              text, eyebrows, buttons, links, focus indicators or form errors, and it is prohibited
              outright on Sand and Sage.
            </Text>

            <TokenTable
              caption="Semantic colour roles"
              columns={['', 'Token', 'Role', 'Resolves to']}
              rows={COLOR_ROLES.map(([token, role, value]) => [
                <Swatch key={token} token={token} />,
                <code key={`${token}-t`}>{token}</code>,
                role,
                value,
              ])}
            />
          </Stack>
        </Container>
      </Section>

      {/* ---------------------------------------------------------------- */}
      <Section spacing="comfortable">
        <Container>
          <Stack gap={32}>
            <SectionLabel code="02">Typography</SectionLabel>
            <Heading level={2}>Two families, one scale</Heading>
            <Text variant="bodySmall">
              Fraunces for display and editorial, Inter for body and interface (BSD-006). Body text
              has a 16px floor. Headings use a fluid clamp so a long headline degrades rather than
              overflowing at 320px.
            </Text>

            <TokenTable
              caption="Type scale"
              columns={['Role', 'Family and weight', 'Size', 'Line height']}
              rows={TYPE_SCALE.map((row) => [...row])}
            />

            <Specimen
              title="Rendered scale"
              note="Resize the viewport to confirm the clamp behaviour and that no headline forces horizontal overflow."
              column
              block
            >
              <Stack gap={16}>
                <Heading level={2} visual="display">
                  Display and h1
                </Heading>
                <Heading level={3} visual="h2">
                  Heading level two
                </Heading>
                <Heading level={4} visual="h3">
                  Heading level three
                </Heading>
                <Text variant="lead">
                  Lead paragraph. Constrained to the canonical 62ch reading measure so a line never
                  becomes uncomfortably wide on a large display.
                </Text>
                <Text>
                  Body paragraph. The reading measure, the 1.55 line height and the 16px minimum
                  size are all canonical decisions rather than implementation preferences.
                </Text>
                <Text variant="caption">Caption text.</Text>
                <Text variant="legal">Legal and supporting text.</Text>
              </Stack>
            </Specimen>
          </Stack>
        </Container>
      </Section>

      {/* ---------------------------------------------------------------- */}
      <Section spacing="comfortable" surface="warm">
        <Container>
          <Stack gap={32}>
            <SectionLabel code="03">Spacing and grid</SectionLabel>
            <Heading level={2}>Eight-point rhythm</Heading>
            <Text variant="bodySmall">
              The scale is restricted to 4, 8, 16, 24, 32, 48, 64 and 80px. Four pixels is
              micro-only; all structural spacing is 8px or above. Sections use 48 / 64 / 80.
            </Text>

            <Specimen title="Spacing primitives" column block>
              <Stack gap={8}>
                {SPACING.map((step) => (
                  <Stack key={step} gap={16} direction="row">
                    <Text variant="caption" full style={{ minWidth: '6ch' }}>
                      {step}px
                    </Text>
                    <SpacingBar token={`--sk-space-${step}`} />
                  </Stack>
                ))}
              </Stack>
            </Specimen>

            <Specimen
              title="Responsive grid"
              note="Mobile-first: every grid is a single column below 768px. Column counts are chosen by content need, not by a rigid column grid."
              column
              block
            >
              <Grid columns={4} gap="tight">
                {['One', 'Two', 'Three', 'Four'].map((label) => (
                  <Card key={label}>
                    <Text variant="bodySmall" full>
                      {label}
                    </Text>
                  </Card>
                ))}
              </Grid>
            </Specimen>

            <TokenTable
              caption="Breakpoints"
              columns={['Width', 'Meaning', 'Behaviour']}
              rows={BREAKPOINTS.map((row) => [...row])}
            />
          </Stack>
        </Container>
      </Section>

      {/* ---------------------------------------------------------------- */}
      <Section spacing="comfortable">
        <Container>
          <Stack gap={32}>
            <SectionLabel code="04">Actions</SectionLabel>
            <Heading level={2}>Buttons</Heading>
            <Text variant="bodySmall">
              Labels are system labels. No commercial CTA appears anywhere in this build: per-intent
              CTA copy is an open P0 in the master audit and no wording is approved. Every control
              is at least 44px tall — the canonical control height is 52px.
            </Text>

            <Specimen title="Light surface" note="Forest fill for primary, Forest outline for secondary.">
              <Button variant="primary">Primary action</Button>
              <Button variant="secondary">Secondary action</Button>
              <Button variant="text">Explore section</Button>
              <Button variant="primary" icon={<IconPlaceholder />}>
                With icon
              </Button>
              <Button variant="primary" loading>
                Continue
              </Button>
              <Button variant="primary" disabled>
                Disabled
              </Button>
            </Specimen>

            <Specimen
              title="Dark surface"
              note="Inverted model (BSD-029): Warm White fill with Forest text. Focus ring switches to Ivory."
              dark
            >
              <Button variant="primary" onDark>
                Primary action
              </Button>
              <Button variant="secondary" onDark>
                Secondary action
              </Button>
              <Button variant="text" onDark>
                Explore section
              </Button>
              <Button variant="primary" onDark disabled>
                Disabled
              </Button>
            </Specimen>

            <Specimen
              title="Link that looks like a button"
              note="Renders an anchor, so it is announced and activated as a link rather than a button."
            >
              <LinkButton href="/" variant="primary">
                Continue
              </LinkButton>
              <LinkButton href="/" variant="secondary">
                Secondary action
              </LinkButton>
            </Specimen>
          </Stack>
        </Container>
      </Section>

      {/* ---------------------------------------------------------------- */}
      <Section spacing="comfortable" surface="soft">
        <Container>
          <Stack gap={32}>
            <SectionLabel code="05">Cards</SectionLabel>
            <Heading level={2}>Surfaces and hierarchy</Heading>
            <Text variant="bodySmall">
              Radius is 4px. Standard cards are separated by surface, border and spacing rather
              than elevation; only the elevated panel uses the single approved shadow. Hover states
              exist only on cards that are genuinely interactive.
            </Text>

            <Grid columns={2}>
              <Card>
                <Heading level={3}>Base card</Heading>
                <Text variant="bodySmall" full>
                  Warm White on the page ground, quiet 1px border, no shadow.
                </Text>
              </Card>

              <Card variant="feature" accent>
                <IconPlaceholder />
                <Heading level={3}>Feature card</Heading>
                <Text variant="bodySmall" full>
                  Carries the 3px Terracotta top rule — the approved editorial emphasis pattern.
                </Text>
              </Card>

              <Card variant="metric">
                <Heading level={3}>Metric card</Heading>
                <Grid columns={2} gap="tight">
                  <Metric value="—" label="No verified figure" />
                  <Metric value="—" label="No verified figure" />
                </Grid>
                <Text variant="legal" full>
                  Values are intentionally empty. Every published metric requires a source, date,
                  permission and scope before it may appear.
                </Text>
              </Card>

              <Card variant="decision">
                <Heading level={3}>Decision card</Heading>
                <Text variant="bodySmall" full>
                  Dashed Terracotta border, the approved treatment for an item that requires
                  attention or a choice.
                </Text>
                <Badge tone="pending">PENDING_APPROVAL</Badge>
              </Card>

              <Card variant="dark">
                <Heading level={3}>Dark surface card</Heading>
                <Text variant="bodySmall" full>
                  Forest panel. BSD-026 reserves the dark surface for the conversion anchor by
                  default; additional dark blocks need explicit design justification.
                </Text>
                <Button variant="primary" onDark>
                  Primary action
                </Button>
              </Card>

              <LinkCard href="/" elevated>
                <Heading level={3}>Interactive card</Heading>
                <Text variant="bodySmall" full>
                  A whole card that is a link. Hover and focus states apply here and nowhere else.
                  Uses the single approved elevated-panel shadow.
                </Text>
              </LinkCard>
            </Grid>
          </Stack>
        </Container>
      </Section>

      {/* ---------------------------------------------------------------- */}
      <Section spacing="comfortable">
        <Container>
          <Stack gap={32}>
            <SectionLabel code="06">Media</SectionLabel>
            <Heading level={2}>Asset placeholders</Heading>
            <Text variant="bodySmall">
              No logo, photograph or video asset is approved for this repository. Authentic Sarah
              photography is the canonical identity source, and synthetic imagery may not fabricate
              documentary reality. Each slot therefore renders an explicit placeholder naming the
              asset that is missing.
            </Text>

            <Grid columns={3}>
              <ResponsiveImage pendingAsset="Authorised portrait of Sarah. Requires image release." />
              <ResponsiveImage
                ratio="1x1"
                pendingAsset="Costa Blanca location photography. Requires licence and authorisation."
              />
              <VideoPlaceholder intent="Process explainer, 30–60s, subtitled." />
            </Grid>

            <Specimen title="Icon placeholders" note="No icon library is installed for a phase that does not yet need one.">
              <IconPlaceholder />
              <IconPlaceholder glyph="→" />
              <IconPlaceholder glyph="✓" />
            </Specimen>
          </Stack>
        </Container>
      </Section>

      {/* ---------------------------------------------------------------- */}
      <Section spacing="comfortable" surface="warm">
        <Container>
          <Stack gap={32}>
            <SectionLabel code="07">Accessibility and motion</SectionLabel>
            <Heading level={2}>Verifiable behaviour</Heading>

            <Grid columns={2}>
              <Card>
                <Heading level={3}>Focus</Heading>
                <Text variant="bodySmall" full>
                  A 2px solid outline at 2px offset, surface-aware: Forest on light surfaces, Ivory
                  on Forest. Tab through this page to confirm every interactive element shows it.
                </Text>
              </Card>

              <Card>
                <Heading level={3}>Touch targets</Heading>
                <Text variant="bodySmall" full>
                  Every button, link-button, navigation link, language option and footer link has a
                  minimum height of 44px. Primary controls use the 52px canonical control height.
                </Text>
              </Card>

              <Card>
                <Heading level={3}>Reduced motion</Heading>
                <Text variant="bodySmall" full>
                  All non-essential animation is disabled under prefers-reduced-motion, including
                  the reveal below and the button loading spinner.
                </Text>
              </Card>

              <Card>
                <Heading level={3}>Keyboard</Heading>
                <Text variant="bodySmall" full>
                  The mobile menu is a modal dialog: Escape closes it, Tab is trapped inside it and
                  focus returns to the trigger on close. A skip link precedes the header.
                </Text>
              </Card>
            </Grid>

            <Specimen
              title="Reveal"
              note="400ms, cubic-bezier(.22,.8,.3,1), 10px distance — all canonical motion tokens. CSS-only: no animation library is installed."
              column
              block
            >
              <Reveal>
                <Card>
                  <Text variant="bodySmall" full>
                    This card animates in on load and is static under reduced motion.
                  </Text>
                </Card>
              </Reveal>
            </Specimen>
          </Stack>
        </Container>
      </Section>

      {/* ---------------------------------------------------------------- */}
      <Section spacing="generous" surface="dark">
        <Container>
          <Stack gap={32}>
            <SectionLabel code="08">Analytics contract</SectionLabel>
            <Heading level={2}>Typed events, no vendor</Heading>
            <Text variant="bodySmall" tone="onDark">
              The event contract is defined and type-checked. The only registered adapter is a
              no-op: no analytics ID, tag manager, pixel, webhook or CRM credential exists in this
              repository, and connecting one requires an approved vendor and an approved consent
              mechanism.
            </Text>

            <Grid columns={4} gap="tight">
              {ANALYTICS_EVENT_NAMES.map((name) => (
                <Badge key={name} tone="onDark">
                  {name}
                </Badge>
              ))}
            </Grid>
          </Stack>
        </Container>
      </Section>
    </AppChrome>
  );
}
