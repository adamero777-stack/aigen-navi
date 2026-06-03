export const runtime = 'edge';

export async function GET() {
  try {
    const res = await fetch('https://note.com/aigennavi/rss/', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
        'Accept': 'text/xml, application/xml, application/rss+xml, */*',
        'Accept-Language': 'ja,en-US;q=0.9,en;q=0.8',
        'Referer': 'https://note.com/',
      },
    });
    if (!res.ok) return new Response(`failed: ${res.status}`, { status: res.status });
    const xml = await res.text();
    return new Response(xml, {
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
        'Cache-Control': 's-maxage=3600, stale-while-revalidate=86400',
      },
    });
  } catch (e) {
    return new Response(String(e), { status: 500 });
  }
}
