export async function onRequestPost(context) {
    const body = await context.request.json();
    
    const { results } = await context.env.DB.prepare(
        "SELECT role, reference_id FROM users WHERE username = ? AND password = ?"
    ).bind(body.username, body.password).all();

    if (results.length > 0) {
        return Response.json({ success: true, role: results[0].role, id: results[0].reference_id });
    } else {
        return Response.json({ success: false });
    }
}
