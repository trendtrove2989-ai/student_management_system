export async function onRequestGet(context) {
    const { results } = await context.env.DB.prepare("SELECT * FROM assignments").all();
    return Response.json(results);
}

export async function onRequestPost(context) {
    const body = await context.request.json();
    
    if (body.action === 'add') {
        await context.env.DB.prepare(
            "INSERT INTO assignments (instructorId, courseId) VALUES (?, ?)"
        ).bind(body.instructorId, body.courseId).run();
    } 
    else if (body.action === 'remove') {
        await context.env.DB.prepare(
            "DELETE FROM assignments WHERE instructorId = ? AND courseId = ?"
        ).bind(body.instructorId, body.courseId).run();
    }
    
    return Response.json({ success: true });
}
