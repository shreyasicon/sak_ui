// workers/waitlist.js
// Deploy to Cloudflare Workers
// Bind KV namespace: SAK_WAITLIST

const BASELINE = 79; // from your pitch deck
const CORS_HEADERS = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
};

export default {
    async fetch(request, env) {

        // Handle CORS preflight
        if (request.method === 'OPTIONS') {
            return new Response(null, { headers: CORS_HEADERS });
        }

        const url = new URL(request.url);

        // GET /api/waitlist/count
        // Returns current count for the landing page
        if (request.method === 'GET' &&
            url.pathname === '/api/waitlist/count') {

            const count = await env.SAK_WAITLIST.get('count');
            const total = BASELINE + parseInt(count || '0');

            return Response.json(
                { count: total, real: parseInt(count || '0') },
                { headers: CORS_HEADERS }
            );
        }

        // POST /api/waitlist
        // Saves email, returns new count
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

            // Validate email
            if (!email || !email.includes('@') || !email.includes('.')) {
                return Response.json(
                    { error: 'Valid email required' },
                    { status: 400, headers: CORS_HEADERS }
                );
            }

            // Check duplicate
            const existing = await env.SAK_WAITLIST.get(`email:${email}`);
            if (existing) {
                const count = await env.SAK_WAITLIST.get('count');
                const total = BASELINE + parseInt(count || '0');
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

            // Save email with timestamp
            await env.SAK_WAITLIST.put(
                `email:${email}`,
                JSON.stringify({
                    email,
                    timestamp: new Date().toISOString(),
                    source: body.source || 'landing_page'
                })
            );

            // Increment counter
            const current = await env.SAK_WAITLIST.get('count');
            const newCount = parseInt(current || '0') + 1;
            await env.SAK_WAITLIST.put('count', newCount.toString());

            const total = BASELINE + newCount;

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
        // Returns all emails (protect this in production)
        if (request.method === 'GET' &&
            url.pathname === '/api/waitlist/list') {

            // Basic auth check
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
                { emails, total: emails.length + BASELINE },
                { headers: CORS_HEADERS }
            );
        }

        return Response.json(
            { error: 'Not found' },
            { status: 404, headers: CORS_HEADERS }
        );
    }
};