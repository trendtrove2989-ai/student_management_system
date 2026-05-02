export async function onRequestPost(context) {
    const body = await context.request.json();
    
    await context.env.DB.prepare(
        "INSERT INTO exams (examId, studentId, courseId, marksObtained, totalMarks, examSession) VALUES (?, ?, ?, ?, ?, ?)"
    )
    .bind(body.examId, body.studentId, body.courseId, body.marksObtained, body.totalMarks, body.examSession)
    .run();

    return new Response(JSON.stringify({ success: true }), { status: 200 });
}
