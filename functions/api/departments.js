export async function onRequestGet(context) {
    const { results } = await context.env.DB.prepare("SELECT * FROM departments").all();
    return Response.json(results);
}

export async function onRequestPost(context) {
    const body = await context.request.json();
    await context.env.DB.prepare(
        "INSERT INTO departments (id, name, location, contact) VALUES (?, ?, ?, ?)"
    ).bind(body.id, body.name, body.location, body.contact).run();
    return Response.json({ success: true });
}
