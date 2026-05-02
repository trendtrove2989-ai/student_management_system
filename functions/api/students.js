export async function onRequestGet(context) {
    const { results } = await context.env.DB.prepare("SELECT * FROM students").all();
    return Response.json(results);
}

export async function onRequestPost(context) {
    const body = await context.request.json();

    await context.env.DB.prepare(
        "INSERT INTO students (id, fname, lname, phone, email, address, gender, program, department, level) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"
    ).bind(body.id, body.fname, body.lname, body.phone, body.email, body.address, body.gender, body.program, body.department, body.level).run();

    await context.env.DB.prepare(
        "INSERT INTO users (username, password, role, reference_id) VALUES (?, ?, 'student', ?)"
    ).bind(body.email, body.id, body.id).run();

    return Response.json({ success: true });
}
