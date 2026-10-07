"""Extract structured editorial content + SEO audit from the live sarahkaterina.com pages (read-only snapshot)."""
import glob, json, re, sys
from bs4 import BeautifulSoup

out = {}
for f in sorted(glob.glob('*.html')):
    if f in ('insights.html', 'case-studies.html'):
        continue
    soup = BeautifulSoup(open(f, encoding='utf-8'), 'html.parser')
    head = {
        'title': soup.title.get_text(strip=True) if soup.title else None,
        'description': (soup.find('meta', attrs={'name': 'description'}) or {}).get('content'),
        'canonical': (soup.find('link', rel='canonical') or {}).get('href'),
        'og_type': (soup.find('meta', property='og:type') or {}).get('content'),
        'og_image': (soup.find('meta', property='og:image') or {}).get('content'),
        'hreflang': [(l.get('hreflang'), l.get('href')) for l in soup.find_all('link', rel='alternate') if l.get('hreflang')],
        'jsonld': len(soup.find_all('script', type='application/ld+json')),
        'imgs_in_main': 0,
    }
    main = soup.find('article') or soup.find('main') or soup.body
    head['imgs_in_main'] = len(main.find_all('img'))
    for t in main.find_all(['script', 'style', 'nav', 'footer', 'svg', 'button', 'form']):
        t.decompose()
    blocks = []
    for el in main.find_all(['h1', 'h2', 'h3', 'h4', 'p', 'ul', 'ol', 'table', 'blockquote', 'dl'], recursive=True):
        if el.find_parent(['ul', 'ol', 'table', 'blockquote', 'dl']):
            continue
        text = ' '.join(el.get_text(' ', strip=True).split())
        if not text:
            continue
        if el.name in ('ul', 'ol'):
            blocks.append({'type': 'list', 'ordered': el.name == 'ol', 'items': [' '.join(li.get_text(' ', strip=True).split()) for li in el.find_all('li', recursive=False)]})
        elif el.name == 'table':
            rows = [[' '.join(c.get_text(' ', strip=True).split()) for c in tr.find_all(['th', 'td'])] for tr in el.find_all('tr')]
            blocks.append({'type': 'table', 'rows': rows})
        elif el.name == 'dl':
            blocks.append({'type': 'dl', 'items': [' '.join(x.get_text(' ', strip=True).split()) for x in el.find_all(['dt', 'dd'])]})
        elif el.name == 'blockquote':
            blocks.append({'type': 'quote', 'text': text})
        elif el.name.startswith('h'):
            blocks.append({'type': 'heading', 'level': int(el.name[1]), 'text': text})
        else:
            blocks.append({'type': 'paragraph', 'text': text})
    links = sorted({(a.get('href'), ' '.join(a.get_text(' ', strip=True).split())[:60]) for a in soup.find_all('a') if a.get('href')})
    out[f[:-5]] = {'head': head, 'blocks': blocks, 'links': links}

json.dump(out, open('extracted.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
for k, v in out.items():
    h = v['head']
    print(k, '| blocks', len(v['blocks']), '| canonical', h['canonical'], '| og', h['og_type'], '| jsonld', h['jsonld'], '| imgs', h['imgs_in_main'], '| hreflang', h['hreflang'][:2])
    print('   title:', h['title'], '| hash links:', sum(1 for l in v['links'] if l[0] == '#'))
