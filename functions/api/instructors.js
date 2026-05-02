export async function onRequestGet(context) {
    // Fetch instructors AND their assignments so the table loads correctly
    const { results: instructors } = await context.env.DB.prepare("SELECT * FROM instructors").all();
    const { results: assignments } = await context.env.DB.prepare("SELECT * FROM assignments").all();
    return Response.json({ instructors, assignments });
}

export async function onRequestPost(context) {
    const body = await context.request.json();
    
    // 1. Save the Instructor
    await context.env.DB.prepare(
        "INSERT INTO instructors (id, fname, lname, qualification, email, gender, department, type) VALUES (?, ?, ?, ?, ?, ?, ?, ?)"
    ).bind(body.id, body.fname, body.lname, body.qualification, body.email, body.gender, body.department, body.type).run();
    
    // 2. Automatically create their Login Account
    await context.env.DB.prepare(
        "INSERT INTO users (username, password, role, reference_id) VALUES (?, ?, 'instructor', ?)"
    ).bind(body.email, body.id, body.id).run();

    return Response.json({ success: true });
}
