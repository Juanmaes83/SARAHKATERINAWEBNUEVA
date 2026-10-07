"""Builds the Studio import payload from the read-only live snapshot (2026-10-07).

For every one of the 10 live URLs:
  * revision 1  `import_source`  — verbatim structure of the live page (template tails removed).
  * documents.working             — the adapted editorial proposal for all ten editorials.
  * revision 2  `import_adapted`  — the adapted proposal, when one exists.
  * publications                  — none; editorial approval and preview publication are separate actions.
  * review_notes                  — every discrepancy, governance point and source check, internal only.
  * redirects                     — inactive legacy registry: live path -> new path.

No figure is changed. Adaptations remove group-entity mentions, correct dated rules
against the verified primary source (cited, with check date) and withhold
conflicting headline metrics from the public title; each change is listed in a note.
"""
import json, pathlib, re, sys, uuid

HERE = pathlib.Path(__file__).parent
SRC = json.loads((HERE / 'live-snapshot-2026-10-07.json').read_text(encoding='utf-8'))
CHECKED = '2026-10-07'
BYLINE = {'name': 'Sarah Katerina', 'role': 'Tax, purchase costs and buyer advisory'}

S = {
    'aeat210': {'id': 'aeat-210', 'label': 'Modelo 210 — filing periods (plazo de declaración)', 'publisher': 'Agencia Tributaria (AEAT)',
                'url': 'https://sede.agenciatributaria.gob.es/Sede/no-residentes/irnr-sin-establecimiento-permanente/declaracion-irnr-sin-establecimiento-permanente/modelo-plazo-declaracion.html',
                'checkedOn': CHECKED, 'note': 'Page updated by AEAT on 2 October 2026.'},
    'lgt27': {'id': 'lgt-27', 'label': 'Ley 58/2003, General Tributaria — article 27 (late-filing surcharges)', 'publisher': 'BOE',
              'url': 'https://www.boe.es/buscar/act.php?id=BOE-A-2003-23186', 'checkedOn': CHECKED},
    'stc182': {'id': 'stc-182-2021', 'label': 'Constitutional Court judgment 182/2021 of 26 October 2021 (BOE 25 November 2021)', 'publisher': 'BOE',
               'url': 'https://www.boe.es/buscar/doc.php?id=BOE-A-2021-19511', 'checkedOn': CHECKED},
    'gva': {'id': 'gva-vut', 'label': 'Self-registration of tourist homes (viviendas de uso turístico)', 'publisher': 'Generalitat Valenciana',
            'url': 'https://sede.gva.es/es/inicio/procedimientos?id_proc=19207&version=red', 'checkedOn': CHECKED},
    'boe1528': {'id': 'boe-a-2026-1528', 'label': 'Resolution of 8 October 2025 (BOE 22 January 2026): community approval for tourist rentals', 'publisher': 'BOE',
                'url': 'https://www.boe.es/diario_boe/txt.php?id=BOE-A-2026-1528', 'checkedOn': CHECKED},
    'policia_nie': {'id': 'policia-nie', 'label': 'NIE information for foreign nationals', 'publisher': 'Policía Nacional',
                   'url': 'https://www.policia.es/_es/extranjeria_extranjeros.php/1000', 'checkedOn': CHECKED},
    'boe_rental': {'id': 'boe-rd-1312-2024', 'label': 'Consolidated Royal Decree 1312/2024 on short-duration rental registration', 'publisher': 'BOE',
                   'url': 'https://www.boe.es/eli/es/rd/2024/12/23/1312', 'checkedOn': CHECKED,
                   'note': 'Read with the 2026 Supreme Court judgment and later amendments; legal review required.'},
}

# Live path, new slug, kind, mandatory, category, hero media key
DOCS = [
    ('insights_modelo-210-explained', 'modelo-210-explained', 'article', True, 'Taxes', 'tax-overview', 'April 2026'),
    ('insights_five-documents-before-arras', 'five-documents-before-arras', 'article', True, 'Buying guide', 'one-file', 'March 2026'),
    ('insights_gross-vs-net-yield-costa-blanca', 'gross-vs-net-yield-costa-blanca', 'article', True, 'Investment', 'rental-analysis', 'March 2026'),
    ('insights_short-term-rental-licence-valencian-community', 'short-term-rental-licence-valencian-community', 'article', False, 'Rentals', None, 'February 2026'),
    ('insights_plusvalia-2021-constitutional-ruling', 'plusvalia-2021-constitutional-ruling', 'article', False, 'Taxes', None, 'February 2026'),
    ('insights_nie-application-three-routes', 'nie-application-three-routes', 'article', False, 'Buying guide', None, 'January 2026'),
    ('case-studies_dutch-investor-orihuela', 'dutch-investor-orihuela', 'case', True, 'Tax structure', 'coffee-key', None),
    ('case-studies_german-retiree-guardamar', 'german-retiree-guardamar', 'case', True, 'Tax regularisation', 'coast', None),
    ('case-studies_norwegian-couple-la-zenia', 'norwegian-couple-la-zenia', 'case', False, 'Double taxation', None, None),
    ('case-studies_british-buyer-torrevieja', 'british-buyer-torrevieja', 'case', False, 'Full cycle', None, None),
]


def blocks_from(raw, kind):
    """Live blocks -> Studio blocks. Drops H1, the standfirst, the DL facts and the template tails."""
    out, facts = [], []
    body = raw[2:] if kind == 'article' else raw[2:]
    for b in body:
        t = b['type']
        if t == 'heading' and b['text'] in ('Continue reading', 'Other engagements', "Whatever stage you're at, let's talk."):
            break
        if t == 'heading':
            out.append({'type': 'heading', 'level': 2 if b['level'] <= 2 else 3, 'text': b['text']})
        elif t == 'paragraph':
            out.append({'type': 'paragraph', 'text': b['text'].replace(' ,', ',').replace(' .', '.').replace(' :', ':')})
        elif t == 'list':
            out.append({'type': 'list', 'ordered': b['ordered'], 'items': b['items']})
        elif t == 'table':
            out.append({'type': 'table', 'rows': b['rows']})
        elif t == 'quote':
            out.append({'type': 'quote', 'text': b['text']})
        elif t == 'dl':
            it = b['items']
            facts = [{'label': it[i], 'value': it[i + 1].lstrip('· ').replace(' · ', ' · ')} for i in range(0, len(it) - 1, 2)]
    return out, facts


def fix_spacing(s):
    s = re.sub(r'\s+([,.;:)])', r'\1', s)
    s = re.sub(r'\(\s+', '(', s)
    return s


def norm(blocks):
    for b in blocks:
        if 'text' in b:
            b['text'] = fix_spacing(b['text'])
        if b['type'] == 'list':
            b['items'] = [fix_spacing(x) for x in b['items']]
    return blocks


def base(kind, raw, category):
    head = raw['head']
    title = raw['blocks'][0]['text']
    dek = fix_spacing(raw['blocks'][1]['text'])
    blocks, facts = blocks_from(raw['blocks'], kind)
    c = {'kind': kind, 'schemaVersion': 1, 'dek': dek, 'category': category, 'tags': [], 'byline': BYLINE,
         'dates': {}, 'blocks': norm(blocks), 'sources': [], 'seo': {'mode': 'auto'},
         'related': {'documents': [], 'services': []}}
    if kind == 'article':
        c.update({'assumptions': []})
    else:
        c.update({'facts': facts, 'context': '', 'challenge': '', 'intervention': '', 'outcome': '', 'results': []})
    return title, c, head


def replace_text(blocks, old, new, count=1):
    hits = 0
    for b in blocks:
        for key in ('text',):
            if key in b and old in b[key]:
                b[key] = b[key].replace(old, new); hits += 1
        if b['type'] == 'list':
            for i, item in enumerate(b['items']):
                if old in item:
                    b['items'][i] = item.replace(old, new); hits += 1
    assert hits >= count, f'not found: {old[:60]}'


def replace_pattern(blocks, pattern, new, count=1):
    hits = 0
    for block in blocks:
        if 'text' in block:
            block['text'], found = re.subn(pattern, new, block['text'])
            hits += found
    assert hits >= count, f'not found: {pattern}'


def drop_block(blocks, startswith):
    for i, b in enumerate(blocks):
        if b.get('text', '').startswith(startswith):
            del blocks[i]; return
    raise AssertionError(f'block not found: {startswith}')


def replace_block(blocks, startswith, new_text):
    for b in blocks:
        if b.get('text', '').startswith(startswith):
            b['text'] = new_text; return
    raise AssertionError(f'block not found: {startswith}')


def replace_item(blocks, startswith, new_text):
    for b in blocks:
        if b['type'] == 'list':
            for i, item in enumerate(b['items']):
                if item.startswith(startswith):
                    b['items'][i] = new_text; return
    raise AssertionError(f'item not found: {startswith}')


def insert_after(blocks, startswith, new_block):
    for i, b in enumerate(blocks):
        if b.get('text', '').startswith(startswith):
            blocks.insert(i + 1, new_block); return
    raise AssertionError(f'anchor not found: {startswith}')


def table_note(blocks, first_cell, caption=None, note=None):
    for b in blocks:
        if b['type'] == 'table' and b['rows'][0][0] == first_cell:
            if caption: b['caption'] = caption
            if note: b['note'] = note
            return
    raise AssertionError(first_cell)


# ---------------------------------------------------------------------------
# Adaptations (public preview proposals) and internal notes
# ---------------------------------------------------------------------------
NOTES = {}


def note(slug, domain, severity, body, code=None):
    NOTES.setdefault(slug, []).append({'domain': domain, 'severity': severity, 'body': body, 'code': code})


def adapt_modelo210(title, c):
    b = c['blocks']
    c['jurisdiction'] = 'Spain — non-resident income tax (IRNR)'
    c['answer'] = ('If you own a home in Spain and are not tax resident here, you file Modelo 210 for the income the property '
                   'produces — or is deemed to produce when it is not rented. The rate depends on where you are tax resident, '
                   'not on your passport: 19% for residents of the EU/EEA, 24% for everyone else. Filing windows changed '
                   'for income accrued from 2026; the dates below follow the Tax Agency page checked on 7 October 2026.')
    replace_text(b, 'the non-resident rate is 19% for EU/EEA citizens and 24% for everyone else (UK included since Brexit).',
                 'the non-resident rate is 19% if you are tax resident in the EU/EEA and 24% if you are tax resident anywhere else (the UK included since Brexit).')
    replace_block(b, 'You file once a year',
                  'You file once a year. For income imputed for 2025 and earlier years, the return is due during the following calendar year (by 31 December); '
                  'for income imputed from 2026 onwards, between 1 April and 31 December of the following year. A €180,000 cadastral value, '
                  'owner tax resident in an EU country, comes out around €376. Same property, owner tax resident in the UK, around €475.')
    replace_block(b, 'The moment a euro of rent',
                  'The moment a euro of rent enters the picture, the rules change. You declare the actual rental income. Since the 2024 tax year, '
                  'rental income with tax to pay can be grouped into one return per year — filed between 1 and 20 January of the following year for '
                  '2024 and 2025 income, and between 1 and 20 April for income from 2026 — or declared separately. Other income keeps the '
                  'quarterly calendar (the first twenty days of April, July, October and January).')
    replace_text(b, 'EU/EEA non-residents may deduct expenses', 'Non-residents who are tax resident in the EU/EEA may deduct expenses')
    replace_text(b, 'Non-EU residents — UK, US, Switzerland — cannot deduct anything and pay 24% on the gross.',
                 'Tax residents of other countries — UK, US, Switzerland — cannot deduct anything and pay 24% on the gross.')
    replace_item(b, 'Filing once a year when the property was rented.',
                 'Treating a rented home like an empty one. Imputed income is for the periods the home is not rented; once there is rent, you declare the actual income. '
                 'Late filings made before Hacienda contacts you carry a surcharge that starts at 1% and rises by 1% for each full month of delay, up to 15% after twelve months.')
    table_note(b, 'Tax residence', caption='Illustrative example: €220,000 apartment in Torrevieja, €18,400 gross rent a year',
               note='Illustrative figures. Allowable expenses of €6,200 are assumed only where the owner is entitled to deduct them.')
    c['assumptions'] = ['Imputed income at 1.1% of the cadastral value (2% where the value has not been revised under the applicable rule).',
                        'Example figures are illustrative; your file will produce its own.']
    c['sources'] = [S['aeat210'], S['lgt27']]
    c['related']['services'] = ['tax']
    c['tags'] = ['Modelo 210', 'non-resident tax', 'IRNR']
    note('modelo-210-explained', 'tax', 'review', 'Filing calendar rewritten against AEAT (page updated 02/10/2026): annual grouping of rental income since 2024 (Jan 1–20 for 2024–2025 income, Apr 1–20 from 2026 income) and imputed income window Apr 1–Dec 31 from 2026 income. The live text said rentals were always quarterly. Needs Sarah/professional review.', 'M210-01')
    note('modelo-210-explained', 'tax', 'review', '19%/24% now worded by tax residence, not passport/citizenship ("EU passport", "British passport" in the live text). Figures €376/€475 unchanged.', 'M210-02')
    note('modelo-210-explained', 'tax', 'review', 'Live text said late surcharges "start at 5%". Replaced with the art. 27 LGT scale (1% + 1% per full month, 15% after 12 months) — confirm wording and whether to mention interest.', 'M210-03')
    note('modelo-210-explained', 'tax', 'review', '"2% if the value has not been revised in the last decade" is imprecise: the 1.1% rate depends on a general valuation procedure in force from 1 January 2012. Kept in assumptions with neutral wording; confirm.', 'M210-04')
    note('modelo-210-explained', 'source', 'info', 'Original listing date on the live site: April 2026 (month only). No day is invented; datePublished uses the preview publication date.', 'M210-05')
    return title


def adapt_arras(title, c):
    b = c['blocks']
    c['jurisdiction'] = 'Spain — property purchase (Valencian Community examples)'
    c['answer'] = ('Before you sign an arras contract, your lawyer should have read five documents: the nota simple, the habitability '
                   'certificate, the community-debt certificate, the town-hall planning certificate and the tax documents (IBI, '
                   'plusvalía estimate and, for non-resident sellers, their Modelo 210 history). They take two to four weeks to gather.')
    replace_block(b, 'The arras contract is the moment',
                  'The arras contract is the moment the deal becomes binding. Its effect depends on the type of arras the contract states. '
                  'In arras penitenciales (article 1454 of the Civil Code), the form most often used in coastal purchases, either side may withdraw: '
                  'the buyer loses the deposit — commonly 10% of the price, though the amount is agreed — and a seller who withdraws returns it doubled. '
                  'Confirmatory or penal arras work differently, so the contract must say which type it is. Most of the mistakes I see in tax appeals '
                  'five years later trace back to a document that should have been read in the week before that signature — and was not.')
    replace_item(b, 'Mortgages and embargoes.',
                 'Mortgages and embargoes. A standing mortgage must be cancelled at the notary or the price adjusted accordingly. An embargo (court attachment) '
                 'has to be lifted or dealt with before completion — your lawyer must confirm how before you commit.')
    replace_block(b, 'The cédula de habitabilidad',
                  'The cédula de habitabilidad (called licencia de segunda ocupación in some municipalities) is the certificate that the property meets '
                  'habitability standards. In many Valencian Community towns it is needed to contract water and electricity, and municipalities can '
                  'ask for it in other procedures — check what yours requires.')
    replace_block(b, 'The certificate has an expiry date',
                  'The certificate has an expiry date — check it on the document itself. If the seller cannot produce a current one, request it before '
                  'arras. The inspection that issues it can take 4–8 weeks; agree the cost split in writing.')
    replace_item(b, 'Coastal law (Ley de Costas) zoning.',
                 'Coastal law (Ley de Costas). Properties inside the coastal protection easement — generally 100 m inland from the shore — are subject to '
                 'restrictions on works and use. Ask for the property’s coastal status in writing.')
    replace_item(b, 'Latest IBI receipt',
                 'Latest IBI receipt with the cadastral reference and the cadastral value. The cadastral value drives the Modelo 210 imputed income; '
                 'transfer tax (ITP) is assessed on the price or on the Catastro’s reference value (valor de referencia), whichever is higher — two '
                 'different values, so check both before you agree the price.')
    c['sources'] = []
    c['related']['services'] = ['purchase']
    c['tags'] = ['arras', 'due diligence', 'nota simple']
    note('five-documents-before-arras', 'legal', 'review', 'Arras: live text stated universal rules (10% deposit, buyer loses 10%, seller pays 20%). Rewritten to distinguish arras penitenciales (art. 1454 CC) from confirmatory/penal arras. Legal review required; add BOE Civil Code source when approved.', 'ARR-01')
    note('five-documents-before-arras', 'legal', 'review', 'Embargo: live text said "the deal cannot proceed at all". Softened to "must be lifted or dealt with before completion". Confirm with the lawyer.', 'ARR-02')
    note('five-documents-before-arras', 'legal', 'review', 'Cédula: removed universal claims ("cannot legally connect utilities", "cannot rent short-term", "typically 10 years"). The GVA tourist-home registration requires a municipal compatibility report, not necessarily the cédula.', 'ARR-03')
    note('five-documents-before-arras', 'tax', 'review', 'Cadastral value vs reference value: live text said both were needed for ITP. ITP uses price or valor de referencia (whichever is higher). Confirm wording and add a Catastro/BOE source.', 'ARR-04')
    note('five-documents-before-arras', 'legal', 'review', 'Ley de Costas wording (100 m "maritime-terrestrial zone", demolition orders) replaced with the protection-easement formulation. Confirm.', 'ARR-05')
    return title


def adapt_yield(title, c):
    b = c['blocks']
    c['jurisdiction'] = 'Spain — Costa Blanca rental example'
    c['answer'] = ('Gross yield divides annual rent by the price; net yield is what reaches your account after vacancy, running costs, '
                   'management and tax. In the worked example below — a €200,000 apartment in Torrevieja — 7.7% gross becomes 1.5% net.')
    replace_text(b, 'On a typical €200,000 apartment in Torrevieja, the gap between the brochure number and the bank-account number is between 3 and 4 percentage points.',
                 'In the worked example below, a €200,000 apartment in Torrevieja, the brochure says 7.7% and the bank account says 1.5%.')
    replace_text(b, 'ITP at 10% of the price,', 'ITP at 10% of the price (the rate assumed in this example; check the Valencian rate in force on your completion date),')
    insert_after(b, 'You pay them once at purchase',
                 {'type': 'paragraph', 'text': 'The waterfall below shows the annual cash flow only. It does not deduct this acquisition drag, which would lower the return further.'})
    replace_item(b, 'Maintenance reserve:',
                 'Maintenance reserve: rule of thumb 1% of the property value annually for repairs and replacements. €2,000 on a €200k property. A reserve is cash set aside, not a tax-deductible expense; for EU/EEA residents, repairs are deductible when they are actually incurred.')
    replace_pattern(b, r'All of them appear in a [^.]+ cash-flow analysis\.', 'All of them appear in a proper cash-flow analysis.')
    table_note(b, 'Line', caption='Worked example: €200,000 two-bedroom apartment in Torrevieja, Dutch owner, full year',
               note='Illustrative. For simplicity, the Modelo 210 line applies 19% to the pre-tax cash income shown above.')
    c['assumptions'] = ['€1,400 a month for 11 months; 10% vacancy.', 'Owner tax resident in the Netherlands (EU rules, 19% on net income).',
                        'Mixed short- and long-term rental, professionally managed at 20% of effective rent.']
    c['sources'] = [S['aeat210']]
    c['related']['services'] = ['investment', 'tax']
    c['tags'] = ['rental yield', 'Torrevieja', 'cash flow']
    note('gross-vs-net-yield-costa-blanca', 'figures', 'review', 'Live intro said the gap is "between 3 and 4 percentage points" while the table goes from 7.7% to 1.5% (6.2 points). Intro now quotes only the two table figures. No reconciliation invented.', 'YLD-01')
    note('gross-vs-net-yield-costa-blanca', 'figures', 'review', 'Annualised acquisition cost (€2,400/yr) is described in the text but not deducted in the final table. Added a visible sentence saying the waterfall excludes it. Sarah to decide whether to add a line to the table.', 'YLD-02')
    note('gross-vs-net-yield-costa-blanca', 'tax', 'review', 'Maintenance reserve (€2,000) is used as a deduction before the 19% line; a reserve is not a deductible expense. Visible note added; Sarah to decide whether to recompute the tax line.', 'YLD-03')
    note('gross-vs-net-yield-costa-blanca', 'tax', 'review', 'ITP 10% kept as this historical example assumption. Primary source: Ley 5/2025, art. 33 (DOGV 31 May 2025), amending Ley 13/1997 art. 13, sets 9% for relevant taxable events from 1 June 2026, with 11% above EUR 1 million and other special rates possible. Verify the transaction date and applicable rate professionally before changing the example.', 'YLD-04')
    note('gross-vs-net-yield-costa-blanca', 'governance', 'info', 'Group-entity wording replaced by a neutral description of the cash-flow analysis; original retained in revision 1.', 'YLD-05')
    return title


def adapt_dutch(title, c):
    b = c['blocks']
    c['jurisdiction'] = 'Spain and the Netherlands — purchase structure'
    replace_pattern(b, r'The client came in through a [^.]+ discovery call', 'The client came in through a discovery call')
    replace_pattern(b, r"[^.]+ first run of the numbers came back", 'Our first run of the numbers came back')
    replace_pattern(b, r'Property entered the rental market via [^.]+ in week 13\.', 'The property entered the rental market in week 13.')
    replace_text(b, '8-year hold, mid-six-figure rental intake, existing Dutch corporate structure', '8-year hold, existing Dutch corporate structure')
    replace_text(b, 'NIE for the client and the company in week 5–6.', 'NIE for the client and tax number for the company in weeks 5–6.')
    table_note(b, 'Structure', caption='Three structures, modelled before the arras',
               note='Modelled at the time of the decision. The lifetime delta is a projection over an eight-year hold, not a saving already realised.')
    c['context'] = 'A Dutch investor with two rental properties in the Netherlands wanted a coastal apartment on the Costa Blanca to hold for 8–10 years.'
    c['challenge'] = 'The default plan — buying as an individual — exposed the Spanish asset to Dutch box-3 taxation on top of Spanish non-resident tax.'
    c['intervention'] = 'Two weeks before the arras, three ownership structures were compared side by side; a Spanish SL was incorporated so the company could sign the arras in its own name.'
    c['outcome'] = 'Arras signed in the company’s name in week 7, completion in week 11. One year on, the file is producing the modelled net cash.'
    c['results'] = [
        {'label': 'Modelled tax delta vs. buying as an individual (Spanish SL)', 'value': '−€12,400', 'period': '8-year hold', 'type': 'projected', 'note': 'Model at the decision date'},
        {'label': 'Modelled annual tax, Spain + NL (Spanish SL)', 'value': '€3,290', 'period': 'Per year', 'type': 'projected'},
        {'label': 'From first call to keys', 'value': '11 weeks', 'type': 'observed'},
    ]
    c['related']['services'] = ['tax', 'purchase']
    c['tags'] = ['Orihuela Costa', 'Spanish SL', 'Netherlands']
    note('dutch-investor-orihuela', 'figures', 'review', 'Lifetime delta does not reconcile with the table: Spanish SL (4,840−3,290)×8 = 12,400 annual only, +1,600 at disposal = 14,000; Dutch BV (4,840−3,510)×8 = 10,640, +2,400 = 13,040 vs −10,200 shown. Figures kept as validated by Juanma (07/10/2026); presentation to be reconciled by Sarah.', 'ORI-01')
    note('dutch-investor-orihuela', 'figures', 'review', 'Live headline "Saved €12,400" presents a projected 8-year figure as achieved. Public title now neutral; the figure appears as a projected result with its period.', 'ORI-02')
    note('dutch-investor-orihuela', 'figures', 'review', '"mid-six-figure rental intake" conflicts with a €1,950/month projection. Phrase removed from the public proposal; confirm what was meant.', 'ORI-03')
    note('dutch-investor-orihuela', 'tax', 'info', 'Companies receive a NIF, not an NIE: wording changed to "tax number for the company". Confirm.', 'ORI-04')
    note('dutch-investor-orihuela', 'governance', 'review', 'Removed three group-entity mentions from the public proposal under AGENTS.md / D-06. Verbatim text kept in revision 1.', 'ORI-05')
    return 'Dutch investor, Orihuela Costa: the purchase structure decided before the arras'


def adapt_german(title, c):
    b = c['blocks']
    c['jurisdiction'] = 'Spain — non-resident income tax (IRNR)'
    c['dek'] = 'Voluntary regularisation after three years of missed non-resident declarations: file closed, no penalties, and a yearly filing calendar in place.'
    # The exposure table and its derived "worst case" do not reconcile; withheld from the public proposal.
    drop_block(b, 'The exposure on the desk by the time we met:')
    b[:] = [x for x in b if not (x['type'] == 'table' and x['rows'][0][0] == 'Item')]
    replace_text(b, 'Paid principal plus voluntary-disclosure surcharges of 5%, 10%, and 15% for the three years respectively (the scale climbs with delay).',
                 'Paid the principal plus the surcharges for late voluntary filing (the scale climbs with delay).')
    replace_text(b, 'Set up the recurring quarterly filing calendar with the client.', 'Set up the recurring filing calendar with the client.')
    replace_text(b, 'Confirmed EU-citizen 19% rate.', 'Confirmed the 19% rate for EU residents.')
    for x in b:
        if x['type'] == 'table' and x['rows'][0][0] == 'Outcome':
            x['rows'] = [r for r in x['rows'] if not r[0].startswith('vs. worst case')]
            x['caption'] = 'What the client paid'
    replace_block(b, 'Spanish tax law treats unsolicited regularisation',
                  'Spanish tax law treats unsolicited regularisation very differently from regularisation triggered by a notification. '
                  'The window closes the moment a letter from Hacienda arrives. If you have unfiled years, move now.')
    replace_block(b, 'A year on, all four quarterly cycles',
                  'A year on, the €380/year imputed-income filing runs on a calendar, paid via domiciliation, with one reminder before each deadline.')
    c['context'] = 'A German retiree bought a holiday apartment in Guardamar del Segura in 2021 through a power of attorney and had never heard of Modelo 210.'
    c['challenge'] = 'Three years of imputed-income returns (2021–2023) were unfiled. Waiting for Hacienda to find them would have exposed her to penalties.'
    c['intervention'] = 'The cadastral history was rebuilt, the three returns were filed voluntarily before any notification, and the principal and surcharges were paid.'
    c['outcome'] = 'No notification was triggered and the file was closed in twelve weeks.'
    c['results'] = [
        {'label': 'Principal paid (Modelo 210, three years)', 'value': '€1,140', 'period': '2021–2023', 'type': 'observed'},
        {'label': 'Voluntary-disclosure surcharges', 'value': '€340', 'type': 'observed'},
        {'label': 'Penalties', 'value': '€0', 'type': 'observed'},
        {'label': 'Total paid', 'value': '€1,480', 'type': 'observed'},
        {'label': 'Imputed-income filing going forward', 'value': '€380', 'period': 'Per year', 'type': 'observed'},
    ]
    c['sources'] = [S['aeat210'], S['lgt27']]
    c['related']['services'] = ['tax']
    c['tags'] = ['Guardamar del Segura', 'Modelo 210', 'regularisation']
    note('german-retiree-guardamar', 'figures', 'review', 'Exposure table does not reconcile: "late surcharges (5%–20%) €820" exceeds 20% of the €1,140 principal (€228); penalties "50%–150%" of €1,140 would be €570–€1,710, not €2,280–€6,840; components sum to ~€8,800, not ~€8,600. Table and the derived "around €7,100" withheld from the public proposal; values kept in revision 1.', 'GUA-01')
    note('german-retiree-guardamar', 'figures', 'review', 'Surcharges paid €340 vs "5%, 10% and 15%" of €380 per year (= €114). Percentages removed from the public proposal; the paid amount is kept (outcome table sums correctly: 1,140 + 340 = 1,480).', 'GUA-02')
    note('german-retiree-guardamar', 'tax', 'review', 'Live text mixes an annual imputed-income obligation with "quarterly filings"/"four quarterly cycles". A non-rented home files annually. Quarterly references removed from the public proposal.', 'GUA-03')
    note('german-retiree-guardamar', 'tax', 'review', 'The 5/10/15% surcharge scale is the pre-2021 regime; current art. 27 LGT is 1% + 1%/month up to 15%. Confirm which regime applied to these filings.', 'GUA-04')
    note('german-retiree-guardamar', 'figures', 'review', 'Live headline "From €8,600 in backdated penalties…" presents a worst-case estimate as incurred penalties. Public title now neutral.', 'GUA-05')
    note('german-retiree-guardamar', 'tax', 'info', '"EU-citizen 19% rate" reworded as "the 19% rate for EU residents" (the rate follows tax residence).', 'GUA-07')
    note('german-retiree-guardamar', 'tax', 'info', '"Hacienda issued the standard resolución confirming the three years closed" — confirm the document type.', 'GUA-06')
    return 'German retiree, Guardamar del Segura: three missed years of Modelo 210, regularised before any notification'


def adapt_short_term(title, c):
    c['dek'] = 'A property-by-property route through municipal planning, community consent and Valencian registration before offering short stays.'
    c['jurisdiction'] = 'Comunitat Valenciana, Spain — tourist accommodation'
    c['answer'] = 'A regional registration number alone does not establish that short stays are permitted at an address. Check the municipal compatibility report, the owners’ community and the current Valencian procedure before committing to a rental plan.'
    c['assumptions'] = ['The address and municipality must be identified before local rules can be checked.', 'This is a review proposal dated 7 October 2026, not a licence decision for a particular property.']
    c['blocks'] = [
        {'type': 'heading', 'level': 2, 'text': 'Begin with the exact address'},
        {'type': 'paragraph', 'text': 'Municipal planning rules and a favourable compatibility report are address-specific. La Zenia and Cabo Roig are areas of Orihuela Costa, in the municipality of Orihuela; they are not separate licensing authorities. Check the current municipal position before relying on a listing or a seller’s description.'},
        {'type': 'heading', 'level': 2, 'text': 'Check the owners’ community'},
        {'type': 'paragraph', 'text': 'For a new tourist-rental activity, review the building’s statutes and resolutions and obtain the express community approval required by the current Horizontal Property Act where applicable. The cited BOE resolution discusses the three-fifths majority of owners and quotas. Have the community position checked for this property.'},
        {'type': 'heading', 'level': 2, 'text': 'Confirm the Valencian filing'},
        {'type': 'paragraph', 'text': 'The Generalitat’s self-registration procedure lists the declaration, municipal compatibility document, ownership or right-to-use evidence and operating conditions. It states a five-year registration validity subject to the applicable exceptions and renewal rules. Check the current procedure on the filing date.'},
        {'type': 'heading', 'level': 2, 'text': 'Check stay length and online registration'},
        {'type': 'paragraph', 'text': 'The regional tourist-home rules distinguish stays of up to ten consecutive days from other arrangements. A separate national short-duration rental register has changed through 2026 litigation and amendments. The exact national platform requirement needs a current legal check before the property is advertised.'},
        {'type': 'heading', 'level': 2, 'text': 'Decision before arras'},
        {'type': 'list', 'ordered': True, 'items': ['Identify the municipality and obtain the address-specific planning position.', 'Review the community’s current documents and required approval.', 'Check the Generalitat filing and any national online-listing requirement at the proposed start date.', 'Model a fallback use only on verified permissions and costs.']},
    ]
    c['sources'] = [S['gva'], S['boe1528'], S['boe_rental']]
    c['related']['services'] = ['purchase', 'investment']
    c['tags'] = ['tourist homes', 'Valencian Community', 'due diligence']
    note('short-term-rental-licence-valencian-community', 'legal', 'review', 'Replaced the live municipal-status table, moratorium claims and universal yield comparison with an address-specific decision sequence. Review current municipal ordinances and 2026 national-register litigation before approval.', 'STR-06')
    return 'Short-term rental in the Valencian Community: four checks before you buy'


def adapt_plusvalia(title, c):
    c['dek'] = 'What the 2021 Constitutional Court judgment changed, and why a refund depends on the assessment and its procedural history.'
    c['jurisdiction'] = 'Spain — municipal land-value tax'
    c['answer'] = 'The 2021 ruling does not create an automatic refund for every seller. The assessment method, whether the case was already final and the steps taken before 26 October 2021 determine what can still be challenged.'
    c['assumptions'] = ['The sale date, municipal assessment, payment and any prior challenge must be checked individually.', 'No general claim deadline is stated for an unidentified file.']
    c['blocks'] = [
        {'type': 'heading', 'level': 2, 'text': 'What the judgment decided'},
        {'type': 'paragraph', 'text': 'Constitutional Court judgment 182/2021, dated 26 October 2021 and published in the BOE on 25 November 2021, invalidated parts of the calculation method in article 107 of the Local Tax Law. It did not erase every assessment or payment.'},
        {'type': 'heading', 'level': 2, 'text': 'The consolidated-situation limit'},
        {'type': 'paragraph', 'text': 'The judgment’s legal effect is limited for situations already consolidated when it was handed down. Its section FJ 6 identifies final judgments and administrative decisions, unchallenged liquidations and self-assessments for which rectification had not been requested by 26 October 2021. The exact procedural category matters.'},
        {'type': 'heading', 'level': 2, 'text': 'Liquidation or self-assessment?'},
        {'type': 'paragraph', 'text': 'Ask the municipality for the original document and proof of payment. A municipal liquidation and a taxpayer’s self-assessment follow different challenge routes. Do not calculate a filing window from the article’s publication date.'},
        {'type': 'heading', 'level': 2, 'text': 'What to review in a real file'},
        {'type': 'list', 'ordered': True, 'items': ['Purchase and sale deeds, dates and land cadastral data.', 'The exact tax document, payment date and any appeal or rectification already filed.', 'The calculation method applied and any later municipal decision.', 'A current professional assessment of the available procedure and deadline.']},
    ]
    c['sources'] = [S['stc182']]
    c['related']['services'] = ['tax']
    c['tags'] = ['plusvalía', 'constitutional court', 'municipal tax']
    note('plusvalia-2021-constitutional-ruling', 'legal', 'blocking', 'Removed the expired spring-2026 countdown, generic refund probabilities and anonymous practice examples from the adapted copy. Confirm the procedural analysis and any specific claim deadline before resolving the original PLU-01 block.', 'PLU-03')
    return 'Plusvalía after the 2021 ruling: what determines a possible refund'


def adapt_nie(title, c):
    c['dek'] = 'Three ways to arrange an NIE application, with the timing and documents checked against the office that will process the file.'
    c['jurisdiction'] = 'Spain — foreign national identification'
    c['answer'] = 'An NIE is an identification number, not a residence permit. The practical route depends on where the applicant is, whether they can attend in Spain, and whether a representative is authorised. Appointment availability and documents must be confirmed for the chosen office.'
    c['assumptions'] = ['Appointment and processing times vary by office and date.', 'Fees and representation requirements must be checked before submitting the application.']
    c['blocks'] = [
        {'type': 'heading', 'level': 2, 'text': 'Route 1: a Spanish consulate'},
        {'type': 'paragraph', 'text': 'An applicant abroad can ask the competent Spanish consulate for its current NIE procedure and appointment process. Confirm the EX-15 form, reason for the request, identification documents and local fee instructions with that consulate.'},
        {'type': 'heading', 'level': 2, 'text': 'Route 2: in person in Spain'},
        {'type': 'paragraph', 'text': 'The National Police handles NIE assignment for foreign nationals with economic, professional or social interests in Spain. Check which office accepts the application, its appointment availability and the current documentation before arranging travel.'},
        {'type': 'heading', 'level': 2, 'text': 'Route 3: an authorised representative'},
        {'type': 'paragraph', 'text': 'Representation may be possible with a valid power of attorney, but its form and acceptance must be checked with the receiving office. Plan for notarisation, legalisation or translation where the specific document requires them.'},
        {'type': 'heading', 'level': 2, 'text': 'Choose without relying on a universal timetable'},
        {'type': 'list', 'ordered': True, 'items': ['Identify the office that will process the application.', 'Confirm its current appointment route, document list and fee.', 'Allow time before the intended arras or deed date without promising same-day issuance.', 'Keep the NIE separate from residence status and any visa requirement.']},
    ]
    c['sources'] = [S['policia_nie']]
    c['related']['services'] = ['purchase']
    c['tags'] = ['NIE', 'non-resident', 'purchase preparation']
    note('nie-application-three-routes', 'legal', 'review', 'Removed unverified country-by-country 2026 timing and fee tables and the 80% fastest-route claim. An office-specific official source and date are required for any numerical timeframe.', 'NIE-02')
    return 'Applying for an NIE: three routes and what to verify first'


def adapt_norwegian(title, c):
    c['dek'] = 'A Spanish and Norwegian filing mismatch was corrected for two rental apartments, then a coordinated calendar was put in place.'
    c['jurisdiction'] = 'Spain and Norway — cross-border rental income'
    c['facts'] = [fact for fact in c['facts'] if fact['label'] != 'Service lines']
    c['context'] = 'A retired Norwegian couple owned two adjacent rental apartments in La Zenia and Cabo Roig, both in the municipality of Orihuela. They sought advice after their Norwegian accountant identified a possible duplicate tax charge.'
    c['challenge'] = 'The Spanish filings and Norwegian foreign-tax-credit evidence had not been coordinated in the first year. The original case records tax paid in both countries on the same rental income.'
    c['intervention'] = 'The Spanish payments were checked, supporting certificates requested, and a corrective Norwegian filing coordinated with the client’s accountant. A calendar for both countries was then established.'
    c['outcome'] = 'The source records a first-year recovery and a cleaner second filing cycle.'
    c['results'] = [
        {'label': 'Norwegian overpayment refunded', 'value': '€4,800', 'period': 'Year 1 correction', 'type': 'observed'},
        {'label': 'Spanish late surcharges paid', 'value': '€280', 'period': 'Year 1 correction', 'type': 'observed'},
        {'label': 'Net first-year recovery', 'value': '€4,520', 'period': 'One-off', 'type': 'observed'},
        {'label': 'Spanish and Norwegian tax recorded', 'value': '€6,920', 'period': 'Year 2', 'type': 'observed'},
    ]
    c['blocks'] = [
        {'type': 'heading', 'level': 2, 'text': 'The first-year correction'},
        {'type': 'paragraph', 'text': 'The original file records a €4,800 Norwegian refund after Spanish payment evidence was supplied, offset by €280 in Spanish late-filing surcharges. The net €4,520 is a one-off recovery, not a recurring annual saving.'},
        {'type': 'heading', 'level': 2, 'text': 'The second filing cycle'},
        {'type': 'paragraph', 'text': 'The source records Spanish tax of €5,840 and an additional Norwegian amount of €1,080 for year 2. Those figures total €6,920. The timing of Modelo 210 declarations and the credit documentation must be checked against the tax years involved.'},
    ]
    c['sources'] = [S['aeat210']]
    c['related']['services'] = ['tax']
    c['tags'] = ['Orihuela Costa', 'Norway', 'double taxation']
    note('norwegian-couple-la-zenia', 'figures', 'blocking', 'Adapted copy separates observed one-off €4,520 recovery from year-2 €6,920 tax. Original €6,200/year and €4,920/year claims remain in source revision only; Sarah must reconcile period and calculation.', 'LAZ-04')
    return 'Norwegian couple, Orihuela Costa: coordinating tax on two rentals'


def adapt_british(title, c):
    c['dek'] = 'A British buyer’s Torrevieja purchase, tax setup and rental launch in the sequence recorded by the original case.'
    c['jurisdiction'] = 'Torrevieja, Spain — purchase and rental planning'
    c['facts'] = [fact for fact in c['facts'] if fact['label'] != 'Service lines']
    c['context'] = 'A retired British buyer sought a three-bedroom Torrevieja apartment for personal stays and possible short-term rental. The recorded purchase price was €275,000.'
    c['challenge'] = 'This was her first overseas purchase. The file needed purchase due diligence, a non-resident tax comparison and address-specific rental checks before the expected use could be relied on.'
    c['intervention'] = 'Three properties and two ownership routes were compared. The team coordinated the NIE, arras checks, deed and subsequent rental-registration steps. The exact permissions and tax treatment remain subject to case review.'
    c['outcome'] = 'The original timeline records keys in week 14 and a first guest in week 18. A verified full-year rental result is not established by those milestones.'
    c['results'] = [
        {'label': 'Purchase price', 'value': '€275,000', 'period': 'At completion', 'type': 'observed'},
        {'label': 'Keys received', 'value': 'Week 14', 'period': 'From first contact', 'type': 'observed'},
        {'label': 'First guest', 'value': 'Week 18', 'period': 'From first contact', 'type': 'observed'},
    ]
    c['blocks'] = [
        {'type': 'heading', 'level': 2, 'text': 'The property decision'},
        {'type': 'paragraph', 'text': 'The three-property comparison in the source favoured the Torrevieja-centre apartment. The modelled yields and owner-cash figures belong to the decision model, not an observed full-year result.'},
        {'type': 'heading', 'level': 2, 'text': 'Purchase and setup'},
        {'type': 'paragraph', 'text': 'The source records NIE arrangements, five-document due diligence before arras, an expired habitability document and its renewal, and completion in week 14. Each document and timing should be checked against the case file before approval.'},
        {'type': 'heading', 'level': 2, 'text': 'Rental launch and the open calculation'},
        {'type': 'paragraph', 'text': 'The first guest arrived in week 18. That milestone records the start of activity; it does not establish a full-year rental result.'},
    ]
    c['sources'] = [S['aeat210'], S['gva']]
    c['related']['services'] = ['investment', 'purchase', 'tax']
    c['tags'] = ['Torrevieja', 'purchase', 'rental planning']
    note('british-buyer-torrevieja', 'figures', 'blocking', 'Adapted copy retains purchase and process milestones while withholding the contradictory €3,200/month, table, €9,900/year and €19,800/year statements from the proposed summary. Original figures remain in source revision 1.', 'TOR-03')
    return 'British buyer, Torrevieja: from property analysis to first guest'


ADAPT = {'modelo-210-explained': adapt_modelo210, 'five-documents-before-arras': adapt_arras,
         'gross-vs-net-yield-costa-blanca': adapt_yield, 'dutch-investor-orihuela': adapt_dutch,
         'german-retiree-guardamar': adapt_german,
         'short-term-rental-licence-valencian-community': adapt_short_term,
         'plusvalia-2021-constitutional-ruling': adapt_plusvalia,
         'nie-application-three-routes': adapt_nie,
         'norwegian-couple-la-zenia': adapt_norwegian,
         'british-buyer-torrevieja': adapt_british}

DRAFT_NOTES = {
    'short-term-rental-licence-valencian-community': [
        ('legal', 'review', 'Licensing is municipal (compatibility report) plus regional registration; the live text frames it as one regional licence. GVA self-registration requires a favourable municipal compatibility report (max 6 months old) and is valid 5 years (Decreto 10/2021, Ley 15/2018, Decreto-ley 9/2024).', 'STR-01'),
        ('legal', 'review', 'Community approval: since 3 April 2025, art. 7.3 LPH requires express approval of the owners’ community (3/5 of owners and quotas, art. 17.12). Source BOE-A-2026-1528 (resolution 8 Oct 2025). Add to the article.', 'STR-02'),
        ('legal', 'review', 'National single rental registry (RD 1312/2024) and maximum stay rules are not covered. Add where applicable.', 'STR-03'),
        ('editorial', 'review', 'Do not treat La Zenia / Cabo Roig as municipalities — both are in the municipality of Orihuela.', 'STR-04'),
        ('legal', 'review', '"The 2024 moratorium" section must be checked against Decreto-ley 9/2024 before publication.', 'STR-05'),
    ],
    'plusvalia-2021-constitutional-ruling': [
        ('legal', 'blocking', 'Time-bound urgency has expired ("claim deadline is spring 2026", "four months to act", "arriving in May 2026 has lost the window"). Must be rewritten before any publication.', 'PLU-01'),
        ('legal', 'review', 'Distinguish consolidated situations (STC 182/2021 FJ 6: firm judgments/resolutions, liquidations not challenged and self-assessments not rectified by 26 Oct 2021), types of assessment (liquidación vs autoliquidación) and the right to claim.', 'PLU-02'),
    ],
    'nie-application-three-routes': [
        ('legal', 'review', '"Real timings for 2026" are presented as universal. Give indicative ranges with date and official sources (Policía Nacional / consulates); no promises.', 'NIE-01'),
    ],
    'norwegian-couple-la-zenia': [
        ('figures', 'review', 'Separate the one-off recovery from the recurring saving ("€6,200/year ongoing") and reconcile the announced annual average.', 'LAZ-01'),
        ('governance', 'blocking', 'Service line "Property Management" is held publicly (D-06). Remove from the public version.', 'LAZ-02'),
        ('editorial', 'info', 'La Zenia is in the municipality of Orihuela (Orihuela Costa).', 'LAZ-03'),
    ],
    'british-buyer-torrevieja': [
        ('governance', 'blocking', 'Case is built around held group entities and a held service line. Not publishable while the group-entity decision (D-06) is open.', 'TOR-01'),
        ('figures', 'blocking', 'Reconcile €3,200/month, the monthly table and the conclusions of €9,900/€19,800 per year before any publication.', 'TOR-02'),
    ],
}

COMMON_IMPORT_NOTE = ('Imported from the live site on 2026-10-07 (read-only snapshot). Live audit: canonical pointed to the home page, '
                      'not in sitemap.xml, hreflang EN/ES pointed to the home pages, no JSON-LD, shared OG image, no editorial images, '
                      'footer links with href="#". All fixed in the new templates.')


payloads = []
summary = []
for key, slug, kind, mandatory, category, hero, listing_date in DOCS:
    raw = SRC[key]
    title, content, head = base(kind, raw, category)
    source_content = json.loads(json.dumps(content))
    live_path = '/' + key.replace('_', '/', 1)
    working, working_title, status = source_content, title, 'draft'
    revisions = [{'number': 1, 'reason': 'import_source', 'title': title, 'slug': slug, 'content': source_content,
                  'note': 'Verbatim structure of ' + live_path + ' (live snapshot 2026-10-07)' + (f'; live listing date {listing_date}' if listing_date else '')}]
    publish = None
    if slug in ADAPT:
        adapted = json.loads(json.dumps(content))
        working_title = ADAPT[slug](title, adapted)
        working, status = adapted, 'draft'
        revisions.append({'number': 2, 'reason': 'import_adapted', 'title': working_title, 'slug': slug, 'content': adapted,
                          'note': 'Editorial proposal for the preview: see the review notes for every change.'})
    if slug in ('norwegian-couple-la-zenia', 'british-buyer-torrevieja'):
        status = 'blocked'
    base_path = '/preview/insights/' if kind == 'article' else '/preview/case-studies/'
    notes = NOTES.get(slug, []) + [{'domain': d, 'severity': s, 'body': bd, 'code': cd} for d, s, bd, cd in DRAFT_NOTES.get(slug, [])]
    notes.append({'domain': 'seo', 'severity': 'info', 'body': COMMON_IMPORT_NOTE, 'code': 'IMP-01'})
    if slug in ADAPT:
        notes.append({'domain': 'editorial', 'severity': 'review', 'body': 'Adapted proposal requires editorial approval before publication in preview.', 'code': 'IMP-02'})
    payloads.append({
        'document': {'kind': kind, 'slug': slug, 'title': working_title, 'working': working, 'status': status,
                     'has_unpublished_changes': status != 'published',
                     'blocked_reason': 'Governance decision (D-06) and, for Torrevieja, unreconciled figures' if status == 'blocked' else None,
                     'source_url': 'https://www.sarahkaterina' + '.com' + live_path,
                     'next_review_on': '2027-04-01' if mandatory else None},
        'revisions': revisions, 'publish_revision': publish,
        'redirects': [{'source_path': live_path, 'destination_path': base_path + slug, 'origin': 'legacy_site', 'active': False,
                       'note': 'Legacy URL registry. Activate only when the domain migration is approved; the destination will drop the /preview prefix.'}],
        'notes': notes, 'hero': hero,
    })
    summary.append((slug, kind, status, live_path, base_path + slug, hero))

for page, title in (('home', 'Home'), ('investment', 'Investment landing')):
    content = {'kind': 'page', 'schemaVersion': 1, 'fields': {}}
    payloads.append({'document': {'kind': 'page', 'slug': page, 'title': title, 'working': content, 'status': 'draft', 'has_unpublished_changes': True},
                     'revisions': [{'number': 1, 'reason': 'import_adapted', 'title': title, 'slug': page, 'content': content,
                                    'note': 'Baseline: no overrides, the approved page renders unchanged.'}],
                     'publish_revision': None, 'redirects': [], 'notes': []})

output_path = pathlib.Path(sys.argv[1]) if len(sys.argv) > 1 else HERE / 'payloads.json'
output_path.write_text(json.dumps(payloads, ensure_ascii=False), encoding='utf-8')
for s in summary:
    print(s)
print('notes', sum(len(p['notes']) for p in payloads))
