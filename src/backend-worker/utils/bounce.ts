export const Bounce = (url: string): Response =>
    new Response(null, {
        status: 303,
        headers: {
            location: url,
        },
    });
