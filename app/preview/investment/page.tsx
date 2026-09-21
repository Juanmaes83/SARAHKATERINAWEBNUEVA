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
import { Button } from '@/components/ui/Button';
import { Divider } from '@/components/ui/Divider';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { Accordion } from '@/components/ui/Accordion';
import { Timeline } from '@/components/ui/Timeline';
import { ScenarioPanel } from '@/components/ui/ScenarioPanel';
import { ResponsiveImage } from '@/components/ui/ResponsiveImage';
import { RevealOnScroll } from '@/components/motion/RevealOnScroll';
import { PrototypeBanner } from '@/components/sections/PrototypeBanner';
import { Hero } from '@/components/sections/Hero';
import { TrustStrip } from '@/components/sections/TrustStrip';
import { BuyerSystemBridge } from '@/components/sections/BuyerSystemBridge';
import { buildMetadata } from '@/lib/seo/metadata';
import {
  PROTOTYPE_NOTICE,
  authority,
  benefits,
  cases,
  decisionDoors,
  faq,
  finalCta,
  hero,
  problem,
  process,
  seo,
  trustStrip,
  visualProof,
} from '@/content/en/investment';

/**
 * INVESTMENT — VISUAL PROTOTYPE, NOT PRODUCTION.
 *
 * Lives under /preview/ deliberately. See docs/phase-2-decision-gate.md:
 * the approved business priority is Pre-Arras / tax-diagnostic, and this
 * prototype does not change that. It exists to validate the design system
 * against a composition the proposal actually explored.
 *
 * `laboratory: true` forces noindex/nofollow and keeps the route out of the
 * sitemap regardless of the site-wide indexing flag.
 */
export const metadata: Metadata = buildMetadata({
  title: seo.title,
  description: seo.description,
  path: '/preview/investment',
  laboratory: true,
});

const SOURCE_PAGE = '/preview/investment';

export default function InvestmentPrototypePage() {
  return (
    <>
      <PrototypeBanner label={PROTOTYPE_NOTICE.label} body={PROTOTYPE_NOTICE.body.text} />

      {/* 2. HERO ------------------------------------------------------- */}
      <Section spacing="generous">
        <Container>
          <Hero
            eyebrow={hero.eyebrow.text}
            heading={hero.heading.text}
            subheading={hero.subheading.text}
            primaryCta={hero.primaryCta.text}
            secondaryCta={hero.secondaryCta.text}
            visualIntent={hero.visualIntent.text}
          />
        </Container>
      </Section>

      {/* 3. TRUST STRIP ------------------------------------------------ */}
      <Section spacing="comfortable" surface="soft">
        <Container>
          <Stack gap={24}>
            <SectionLabel code="01">What is actually confirmed</SectionLabel>
            <TrustStrip items={trustStrip} />
            <Text variant="legal">
              Entries marked PENDING_APPROVAL are not missing content. Every published credential,
              metric or coverage claim requires a dossier with source, date, permission and scope
              before it may appear.
            </Text>
          </Stack>
        </Container>
      </Section>

      {/* 4. PROBLEM / TENSION ------------------------------------------ */}
      <Section spacing="generous">
        <Container>
          <Stack gap={32}>
            <RevealOnScroll>
              <Stack gap={16}>
                <Eyebrow>{problem.eyebrow.text}</Eyebrow>
                <Heading level={2} measure>
                  {problem.heading.text}
                </Heading>
                <Text variant="lead">{problem.intro.text}</Text>
              </Stack>
            </RevealOnScroll>

            <Divider accent />

            <Grid columns={2} gap="wide">
              {problem.tensions.map((tension, index) => (
                <RevealOnScroll key={tension.text} order={index}>
                  <Stack gap={8}>
                    <Text full>{tension.text}</Text>
                    {tension.review && tension.review !== 'none' ? (
                      <Badge tone="outline">{tension.review.toUpperCase()} — REVIEW REQUIRED</Badge>
                    ) : null}
                  </Stack>
                </RevealOnScroll>
              ))}
            </Grid>
          </Stack>
        </Container>
      </Section>

      {/* 5. DECISION DOORS --------------------------------------------- */}
      <Section spacing="generous" surface="warm">
        <Container>
          <Stack gap={32}>
            <Stack gap={16}>
              <Eyebrow>{decisionDoors.eyebrow.text}</Eyebrow>
              <Heading level={2} measure>
                {decisionDoors.heading.text}
              </Heading>
            </Stack>

            <Grid columns={3}>
              {decisionDoors.doors.map((door, index) => (
                <RevealOnScroll key={door.id} order={index}>
                  <Card variant="feature" accent style={{ height: '100%' }}>
                    <Heading level={3}>{door.title.text}</Heading>
                    <Text variant="bodySmall" full>
                      {door.body.text}
                    </Text>
                    <div style={{ marginBlockStart: 'auto', paddingBlockStart: 'var(--sk-space-16)' }}>
                      <Button variant="text">{door.action.text}</Button>
                    </div>
                  </Card>
                </RevealOnScroll>
              ))}
            </Grid>
          </Stack>
        </Container>
      </Section>

      {/* 6. VISUAL PROOF ----------------------------------------------- */}
      <Section spacing="generous">
        <Container>
          <Stack gap={32}>
            <Stack gap={16}>
              <Eyebrow>{visualProof.eyebrow.text}</Eyebrow>
              <Heading level={2} measure>
                {visualProof.heading.text}
              </Heading>
              <Text variant="lead">{visualProof.intro.text}</Text>
            </Stack>

            <RevealOnScroll>
              <ScenarioPanel
                scenarios={visualProof.scenarios.map((scenario) => ({
                  id: scenario.id,
                  label: scenario.label.text,
                  description: scenario.description.text,
                }))}
                artefacts={visualProof.artefacts.map((artefact) => artefact.text)}
              />
            </RevealOnScroll>

            <Text variant="legal">
              The scenario chart is a structural placeholder. No modelled figure, yield, return or
              projection appears anywhere on this page, and none may be published without competent
              review.
            </Text>
          </Stack>
        </Container>
      </Section>

      {/* 7. PROCESS ---------------------------------------------------- */}
      <Section spacing="generous" surface="soft">
        <Container>
          <Stack gap={32}>
            <Stack gap={16}>
              <Eyebrow>{process.eyebrow.text}</Eyebrow>
              <Heading level={2} measure>
                {process.heading.text}
              </Heading>
            </Stack>

            <Timeline
              stages={process.stages.map((stage) => ({
                id: stage.id,
                title: stage.title.text,
                facets: [
                  { label: 'What happens', value: stage.what.text },
                  { label: 'What you receive', value: stage.deliverable.text },
                  {
                    label: 'Decision it enables',
                    value: (
                      <>
                        {stage.decision.text}
                        <br />
                        <Badge tone="pending">TIMING PENDING_APPROVAL</Badge>
                      </>
                    ),
                  },
                ],
              }))}
            />
          </Stack>
        </Container>
      </Section>

      {/* 8. BENEFITS --------------------------------------------------- */}
      <Section spacing="generous">
        <Container>
          <Stack gap={32}>
            <Stack gap={16}>
              <Eyebrow>{benefits.eyebrow.text}</Eyebrow>
              <Heading level={2} measure>
                {benefits.heading.text}
              </Heading>
            </Stack>

            <Grid columns={2} gap="wide">
              {benefits.items.map((item, index) => (
                <RevealOnScroll key={item.feature.text} order={index}>
                  <Card style={{ height: '100%' }}>
                    <Heading level={3}>{item.feature.text}</Heading>
                    <Stack gap={16}>
                      <div>
                        <Text variant="caption" tone="secondary" full>
                          Benefit
                        </Text>
                        <Text variant="bodySmall" full>
                          {item.benefit.text}
                        </Text>
                      </div>
                      <div>
                        <Text variant="caption" tone="secondary" full>
                          In practice
                        </Text>
                        <Text variant="bodySmall" full>
                          {item.outcome.text}
                        </Text>
                      </div>
                      <div>
                        <Text variant="caption" tone="secondary" full>
                          Risk removed
                        </Text>
                        <Text variant="bodySmall" full>
                          {item.risk.text}
                        </Text>
                      </div>
                    </Stack>
                  </Card>
                </RevealOnScroll>
              ))}
            </Grid>
          </Stack>
        </Container>
      </Section>

      {/* 9. BUYER SYSTEM ----------------------------------------------- */}
      <Section spacing="generous" surface="warm">
        <Container>
          <Stack gap={32}>
            <Stack gap={16}>
              <Eyebrow>Before you pay for anything</Eyebrow>
              <Heading level={2} measure>
                Start with the free calculations.
              </Heading>
              <Text variant="lead">
                The Buyer System is a separate product with its own governance. It answers two
                questions well, shows the result without asking for anything first, and routes
                what it cannot answer honestly to review.
              </Text>
            </Stack>

            <BuyerSystemBridge
              experiences={['askingPrice', 'realCashNeeded']}
              sourcePage={SOURCE_PAGE}
            />
          </Stack>
        </Container>
      </Section>

      {/* 10. AUTHORITY -------------------------------------------------- */}
      <Section spacing="generous">
        <Container>
          <Grid columns="split" gap="wide">
            <Stack gap={24}>
              <Eyebrow>{authority.eyebrow.text}</Eyebrow>
              <Heading level={2}>{authority.heading.text}</Heading>
              <Text variant="lead">{authority.body.text}</Text>
              <Badge tone="pending">BIOGRAPHY PENDING_APPROVAL</Badge>

              <Divider />

              <Stack gap={16}>
                <Text variant="caption" tone="secondary" full>
                  Stated limits
                </Text>
                {authority.limits.map((limit) => (
                  <Stack key={limit.text} gap={8}>
                    <Text variant="bodySmall" full>
                      {limit.text}
                    </Text>
                    {limit.review && limit.review !== 'none' ? (
                      <Badge tone="outline">{limit.review.toUpperCase()} — REVIEW REQUIRED</Badge>
                    ) : null}
                  </Stack>
                ))}
              </Stack>

              <Text variant="legal">{authority.methodNote.text}</Text>
            </Stack>

            <Stack gap={16}>
              <ResponsiveImage
                ratio="3x2"
                pendingAsset={authority.portraitIntent.text}
              />
              <Text variant="legal">
                No authorised photograph exists in this repository. Synthetic imagery may represent
                the brand but may never stand in as documentary evidence of a person, a meeting or
                a place.
              </Text>
            </Stack>
          </Grid>
        </Container>
      </Section>

      {/* 11. CASES ------------------------------------------------------ */}
      <Section spacing="generous" surface="soft">
        <Container>
          <Stack gap={32}>
            <Stack gap={16}>
              <Eyebrow>{cases.eyebrow.text}</Eyebrow>
              <Heading level={2} measure>
                {cases.heading.text}
              </Heading>
              <Text variant="lead">{cases.intro.text}</Text>
            </Stack>

            <Grid columns={3}>
              {cases.placeholders.map((placeholder, index) => (
                <Card key={index} variant="decision" style={{ minHeight: 'var(--sk-space-80)' }}>
                  <Badge tone="pending">{placeholder.text}</Badge>
                  <Text variant="legal" full>
                    Structure only. Situation, decision, outcome and limits would appear here once
                    written permission and verified figures exist.
                  </Text>
                </Card>
              ))}
            </Grid>
          </Stack>
        </Container>
      </Section>

      {/* 12. FAQ -------------------------------------------------------- */}
      <Section spacing="generous">
        <Container width="focused">
          <Stack gap={32}>
            <Stack gap={16}>
              <Eyebrow>{faq.eyebrow.text}</Eyebrow>
              <Heading level={2} measure>
                {faq.heading.text}
              </Heading>
            </Stack>

            <Accordion
              items={faq.items.map((item) => ({
                id: item.id,
                question: item.question.text,
                children: (
                  <Stack gap={16}>
                    <Text full>{item.answer.text}</Text>
                    {item.answer.review && item.answer.review !== 'none' ? (
                      <Badge tone="outline">
                        {item.answer.review.toUpperCase()} — REVIEW REQUIRED
                      </Badge>
                    ) : null}
                  </Stack>
                ),
              }))}
            />

            <Text variant="legal">
              FAQ schema is prepared but not emitted. Structured data may only describe visible,
              verified content, and most answers here are pending.
            </Text>
          </Stack>
        </Container>
      </Section>

      {/* 13. FINAL CTA -------------------------------------------------- */}
      <Section spacing="generous" surface="dark">
        <Container width="focused">
          <Stack gap={24}>
            <Eyebrow onDark>{finalCta.eyebrow.text}</Eyebrow>
            <Heading level={2}>{finalCta.heading.text}</Heading>
            <Text variant="lead" tone="onDark">
              {finalCta.body.text}
            </Text>

            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 'var(--sk-space-16)',
                marginBlockStart: 'var(--sk-space-8)',
              }}
            >
              <Button variant="primary" onDark>
                {finalCta.primaryCta.text}
              </Button>
              <Button variant="secondary" onDark>
                {finalCta.secondaryCta.text}
              </Button>
            </div>

            <Text variant="legal" tone="onDark">
              {finalCta.alternativeNote.text}
            </Text>
          </Stack>
        </Container>
      </Section>
    </>
  );
}
