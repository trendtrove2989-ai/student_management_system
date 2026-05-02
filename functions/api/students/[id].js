export async function onRequestDelete(context) {
    const studentId = context.params.id;

    await context.env.DB.prepare("DELETE FROM students WHERE id = ?").bind(studentId).run();
    await context.env.DB.prepare("DELETE FROM users WHERE reference_id = ?").bind(studentId).run();
    await context.env.DB.prepare("DELETE FROM enrollments WHERE studentId = ?").bind(studentId).run();
    await context.env.DB.prepare("DELETE FROM exams WHERE studentId = ?").bind(studentId).run();

    return Response.json({ success: true });
}
