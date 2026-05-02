export async function onRequestGet(context) {
    const url = new URL(context.request.url);
    const instId = url.searchParams.get("id");

    // Fetch the courses assigned specifically to this instructor
    const { results: courses } = await context.env.DB.prepare(
        "SELECT c.id, c.name FROM courses c JOIN assignments a ON c.id = a.courseId WHERE a.instructorId = ?"
    ).bind(instId).all();

    // Fetch the students enrolled in those specific courses
    const { results: students } = await context.env.DB.prepare(
        `SELECT e.courseId, s.id, s.fname, s.lname 
         FROM enrollments e 
         JOIN students s ON e.studentId = s.id 
         JOIN assignments a ON e.courseId = a.courseId 
         WHERE a.instructorId = ? AND e.status = 'Active'`
    ).bind(instId).all();

    return Response.json({ courses, students });
}
