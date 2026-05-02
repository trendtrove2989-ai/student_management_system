export async function onRequestDelete(context) {
    const instructorId = context.params.id;

    try {
        // 1. Delete dependent records FIRST to avoid Foreign Key errors
        await context.env.DB.prepare("DELETE FROM assignments WHERE instructorId = ?").bind(instructorId).run();
        await context.env.DB.prepare("DELETE FROM users WHERE reference_id = ?").bind(instructorId).run();
        
        // 2. Delete the parent instructor record LAST
        await context.env.DB.prepare("DELETE FROM instructors WHERE id = ?").bind(instructorId).run();

        return Response.json({ success: true });
        
    } catch (error) {
        // This will catch any SQL typos or column mismatches and log them
        return Response.json({ success: false, error: error.message }, { status: 500 });
    }
}
