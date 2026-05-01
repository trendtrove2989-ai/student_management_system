export async function onRequestGet(context) {
    // Get the student ID from the URL (e.g., /api/transcript?id=STU-1234)
    const url = new URL(context.request.url);
    const studentId = url.searchParams.get("id");

    if (!studentId) return Response.json({ error: "Missing Student ID" }, { status: 400 });

    // Fetch exams only for this specific student
    const { results: exams } = await context.env.DB.prepare(
        "SELECT * FROM exams WHERE studentId = ?"
    ).bind(studentId).all();

    // Fetch all courses so we can match the names and credit hours
    const { results: courses } = await context.env.DB.prepare(
        "SELECT id, name, credits FROM courses"
    ).all();

    return Response.json({ exams, courses });
}
