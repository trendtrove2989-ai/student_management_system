export async function onRequestGet(context) {
    const { results } = await context.env.DB.prepare("SELECT * FROM courses").all();
    return Response.json(results);
}

export async function onRequestPost(context) {
    const body = await context.request.json();
    await context.env.DB.prepare(
        "INSERT INTO courses (id, name, credits, totalMarks, type, department) VALUES (?, ?, ?, ?, ?, ?)"
    ).bind(body.id, body.name, body.credits, body.totalMarks, body.type, body.department).run();
    return Response.json({ success: true });
}
