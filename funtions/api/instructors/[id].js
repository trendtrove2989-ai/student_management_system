export async function onRequestDelete(context) {
    const instructorId = context.params.id;

    await context.env.DB.prepare("DELETE FROM instructors WHERE id = ?").bind(instructorId).run();
    await context.env.DB.prepare("DELETE FROM users WHERE reference_id = ?").bind(instructorId).run();
    await context.env.DB.prepare("DELETE FROM assignments WHERE instructorId = ?").bind(instructorId).run();

    return Response.json({ success: true });
}
