export async function onRequestGet(context) {
    const { results } = await context.env.DB.prepare("SELECT * FROM programs").all();
    return Response.json(results);
}

export async function onRequestPost(context) {
    const body = await context.request.json();
    await context.env.DB.prepare(
        "INSERT INTO programs (id, name, duration, level, department) VALUES (?, ?, ?, ?, ?)"
    ).bind(body.id, body.name, body.duration, body.level, body.department).run();
    return Response.json({ success: true });
}
