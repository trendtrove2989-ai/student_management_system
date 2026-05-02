export async function onRequestGet(context) {
    const { results } = await context.env.DB.prepare("SELECT * FROM enrollments").all();
    return Response.json(results);
}

export async function onRequestPost(context) {
    const body = await context.request.json();
    
    if (body.action === 'add') {
        await context.env.DB.prepare(
            "INSERT INTO enrollments (enrollmentId, studentId, courseId, academicYear, semester, enrollDate, status) VALUES (?, ?, ?, ?, ?, ?, ?)"
        ).bind(body.enrollmentId, body.studentId, body.courseId, body.academicYear, body.semester, body.enrollDate, body.status).run();
    } 
    else if (body.action === 'remove') {
        await context.env.DB.prepare(
            "DELETE FROM enrollments WHERE enrollmentId = ?"
        ).bind(body.enrollmentId).run();
    }
    
    return Response.json({ success: true });
}
