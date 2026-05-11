// workers/waitlist.js
// Deploy to Cloudflare Workers
// Bind KV namespace: SAK_WAITLIST

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const CORS_HEADERS = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
};

async function getBaseline(env) {
    const stored = await env.SAK_WAITLIST.get('baseline', { cacheTtl: 0 });
    return stored ? parseInt(stored, 10) : 79;
}

async function getRealCount(env) {
    const list = await env.SAK_WAITLIST.list({ prefix: 'email:' });
    return list.keys.length;
}

async function getTotal(env) {
    const baseline = await getBaseline(env);
    const real = await getRealCount(env);
    return baseline + real;
}

export default {
    async fetch(request, env) {

        if (request.method === 'OPTIONS') {
            return new Response(null, { headers: CORS_HEADERS });
        }

        const url = new URL(request.url);

        // GET /api/waitlist/count
        if (request.method === 'GET' &&
            url.pathname === '/api/waitlist/count') {

            const total = await getTotal(env);

            return Response.json(
                { count: total },
                { headers: CORS_HEADERS }
            );
        }

        // POST /api/waitlist
        if (request.method === 'POST' &&
            url.pathname === '/api/waitlist') {

            let body;
            try {
                body = await request.json();
            } catch {
                return Response.json(
                    { error: 'Invalid request' },
                    { status: 400, headers: CORS_HEADERS }
                );
            }

            const email = body.email?.toLowerCase().trim();

            if (!email || !EMAIL_RE.test(email)) {
                return Response.json(
                    { error: 'Valid email required' },
                    { status: 400, headers: CORS_HEADERS }
                );
            }

            const existing = await env.SAK_WAITLIST.get(`email:${email}`, { cacheTtl: 0 });
            if (existing) {
                const total = await getTotal(env);
                return Response.json(
                    {
                        success: true,
                        duplicate: true,
                        message: "You're already on the list.",
                        count: total
                    },
                    { headers: CORS_HEADERS }
                );
            }

            await env.SAK_WAITLIST.put(
                `email:${email}`,
                JSON.stringify({
                    email,
                    timestamp: new Date().toISOString(),
                    source: body.source || 'landing_page'
                })
            );

            const total = await getTotal(env);

            return Response.json(
                {
                    success: true,
                    message: `You're #${total} on the list.`,
                    count: total
                },
                { headers: CORS_HEADERS }
            );
        }

        // GET /api/waitlist/list
        if (request.method === 'GET' &&
            url.pathname === '/api/waitlist/list') {

            const authHeader = request.headers.get('Authorization');
            const expected = `Bearer ${env.ADMIN_SECRET}`;

            if (authHeader !== expected) {
                return Response.json(
                    { error: 'Unauthorized' },
                    { status: 401, headers: CORS_HEADERS }
                );
            }

            const list = await env.SAK_WAITLIST.list({ prefix: 'email:' });
            const emails = await Promise.all(
                list.keys.map(async key => {
                    const val = await env.SAK_WAITLIST.get(key.name);
                    return JSON.parse(val);
                })
            );

            return Response.json(
                { emails, total: emails.length + await getBaseline(env) },
                { headers: CORS_HEADERS }
            );
        }

        return Response.json(
            { error: 'Not found' },
            { status: 404, headers: CORS_HEADERS }
        );
    }
};