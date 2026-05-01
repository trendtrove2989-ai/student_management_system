export async function onRequestGet(context) {
    // This handles GET requests to fetch all students
    const { results } = await context.env.DB.prepare("SELECT * FROM students").all();
    return Response.json(results);
}

export async function onRequestPost(context) {
    // This handles POST requests when the Admin adds a new student
    const body = await context.request.json();
    
    // 1. Insert the student into the students table
    await context.env.DB.prepare(
        "INSERT INTO students (id, fname, lname, phone, email, address, gender, program, department, level) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"
    )
    .bind(body.id, body.fname, body.lname, body.phone, body.email, body.address, body.gender, body.program, body.department, body.level)
    .run();

    // 2. Automatically create the login account (Username = Email, Password = Student ID)
    await context.env.DB.prepare(
        "INSERT INTO users (username, password, role, reference_id) VALUES (?, ?, 'student', ?)"
    )
    .bind(body.email, body.id, body.id)
    .run();

    return new Response(JSON.stringify({ success: true, message: "Student and login created!" }), { 
        status: 200,
        headers: { "Content-Type": "application/json" }
    });
}
