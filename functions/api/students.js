const express = require('express');
const router = express.Router();
const oracledb = require('oracledb');

// GET: Fetch all students
router.get('/', async (req, res) => {
    let connection;
    try {
        connection = await oracledb.getConnection(); // Assumes a connection pool is running
        
        const result = await connection.execute(
            `SELECT id, fname, lname, phone, email, address, gender, program, department, student_level AS "level" 
             FROM students`,
            [], // No bind variables needed
            { outFormat: oracledb.OUT_FORMAT_OBJECT } // Formats rows as objects
        );

        res.status(200).json(result.rows);
    } catch (err) {
        console.error('Error fetching students:', err);
        res.status(500).json({ error: 'Failed to fetch students from database' });
    } finally {
        if (connection) {
            try { await connection.close(); } catch (err) { console.error(err); }
        }
    }
});

// POST: Add a new student
router.post('/', async (req, res) => {
    let connection;
    try {
        const { id, fname, lname, phone, email, address, gender, program, department, level } = req.body;
        
        connection = await oracledb.getConnection();
        
        await connection.execute(
            `INSERT INTO students (id, fname, lname, phone, email, address, gender, program, department, student_level) 
             VALUES (:id, :fname, :lname, :phone, :email, :address, :gender, :program, :department, :level)`,
            { id, fname, lname, phone, email, address, gender, program, department, level },
            { autoCommit: true } // AutoCommit is required in Oracle to save changes
        );

        res.status(201).json({ success: true, message: 'Student successfully added' });
    } catch (err) {
        console.error('Error saving student:', err);
        res.status(500).json({ success: false, message: 'Failed to save student' });
    } finally {
        if (connection) {
            try { await connection.close(); } catch (err) { console.error(err); }
        }
    }
});

// DELETE: Remove a student
router.delete('/:id', async (req, res) => {
    let connection;
    try {
        const studentId = req.params.id;
        connection = await oracledb.getConnection();

        // Optional: Also delete enrollments/exams tied to this student to prevent foreign key errors
        // await connection.execute(`DELETE FROM enrollments WHERE student_id = :id`, [studentId], { autoCommit: false });
        // await connection.execute(`DELETE FROM exams WHERE student_id = :id`, [studentId], { autoCommit: false });

        const result = await connection.execute(
            `DELETE FROM students WHERE id = :id`,
            [studentId],
            { autoCommit: true }
        );

        if (result.rowsAffected === 0) {
            return res.status(404).json({ success: false, message: 'Student not found' });
        }

        res.status(200).json({ success: true, message: `Student ${studentId} deleted successfully` });
    } catch (err) {
        console.error('Error deleting student:', err);
        res.status(500).json({ success: false, message: 'Failed to delete student from database' });
    } finally {
        if (connection) {
            try { await connection.close(); } catch (err) { console.error(err); }
        }
    }
});

module.exports = router;
