CREATE TABLE users (
    username TEXT PRIMARY KEY,
    password TEXT,
    role TEXT,
    reference_id TEXT
);

INSERT INTO users (username, password, role, reference_id) VALUES ('admin', 'admin', 'admin', 'ADMIN-01');

CREATE TABLE departments (
    id TEXT PRIMARY KEY,
    name TEXT,
    location TEXT,
    contact TEXT
);

CREATE TABLE programs (
    id TEXT PRIMARY KEY,
    name TEXT,
    duration TEXT,
    level TEXT,
    department TEXT
);

CREATE TABLE courses (
    id TEXT PRIMARY KEY,
    name TEXT,
    credits TEXT,
    totalMarks TEXT,
    type TEXT,
    department TEXT
);

CREATE TABLE instructors (
    id TEXT PRIMARY KEY,
    fname TEXT,
    lname TEXT,
    qualification TEXT,
    email TEXT,
    gender TEXT,
    department TEXT,
    type TEXT
);

CREATE TABLE assignments (
    instructorId TEXT,
    courseId TEXT,
    PRIMARY KEY (instructorId, courseId)
);

CREATE TABLE students (
    id TEXT PRIMARY KEY,
    fname TEXT,
    lname TEXT,
    phone TEXT,
    email TEXT,
    address TEXT,
    gender TEXT,
    program TEXT,
    department TEXT,
    level TEXT
);

CREATE TABLE enrollments (
    enrollmentId TEXT PRIMARY KEY,
    studentId TEXT,
    courseId TEXT,
    academicYear TEXT,
    semester TEXT,
    enrollDate TEXT,
    status TEXT
);

CREATE TABLE exams (
    examId TEXT PRIMARY KEY,
    studentId TEXT,
    courseId TEXT,
    marksObtained TEXT,
    totalMarks TEXT,
    examSession TEXT
);

CREATE TABLE settings (
    setting_key TEXT PRIMARY KEY,
    setting_value TEXT
);

-- Subqueries
SELECT fname, lname, email 
FROM students 
WHERE id IN (
    SELECT studentId 
    FROM enrollments 
    WHERE status = 'Active'
);

SELECT name 
FROM courses 
WHERE id IN (
    SELECT courseId 
    FROM assignments 
    WHERE instructorId = 'INS-001'
);

-- Joins
SELECT s.fname, s.lname, p.name AS program_name, d.name AS department_name
FROM students s
INNER JOIN programs p ON s.program = p.id
INNER JOIN departments d ON s.department = d.id;

SELECT e.enrollmentId, s.fname, c.name AS course_name, e.enrollDate
FROM enrollments e
LEFT JOIN students s ON e.studentId = s.id
LEFT JOIN courses c ON e.courseId = c.id;

-- Views
CREATE VIEW StudentTranscript AS
SELECT s.id AS student_id, s.fname, s.lname, c.name AS course_name, ex.marksObtained, ex.totalMarks, e.academicYear, e.semester
FROM students s
JOIN enrollments e ON s.id = e.studentId
JOIN courses c ON e.courseId = c.id
JOIN exams ex ON s.id = ex.studentId AND c.id = ex.courseId;

CREATE VIEW ActiveInstructors AS
SELECT i.id, i.fname, i.lname, d.name AS department_name, c.name AS course_assigned
FROM instructors i
JOIN departments d ON i.department = d.id
JOIN assignments a ON i.id = a.instructorId
JOIN courses c ON a.courseId = c.id;

-- Triggers
CREATE OR REPLACE TRIGGER PreventOverEnrollment
BEFORE INSERT ON enrollments
FOR EACH ROW
DECLARE
    v_count NUMBER;
BEGIN
    SELECT COUNT(*) INTO v_count 
    FROM enrollments 
    WHERE courseId = :NEW.courseId AND academicYear = :NEW.academicYear;
    
    IF v_count >= 50 THEN
        RAISE_APPLICATION_ERROR(-20001, 'Course enrollment limit reached.');
    END IF;
END;
/

CREATE OR REPLACE TRIGGER ValidateExamMarks
BEFORE INSERT OR UPDATE ON exams
FOR EACH ROW
BEGIN
    IF TO_NUMBER(:NEW.marksObtained) > TO_NUMBER(:NEW.totalMarks) THEN
        RAISE_APPLICATION_ERROR(-20002, 'Marks obtained cannot exceed total marks.');
    END IF;
END;
/

-- Procedures
CREATE OR REPLACE PROCEDURE RegisterStudent (
    p_id IN TEXT,
    p_fname IN TEXT,
    p_lname IN TEXT,
    p_program IN TEXT,
    p_dept IN TEXT
) AS
BEGIN
    INSERT INTO students (id, fname, lname, program, department)
    VALUES (p_id, p_fname, p_lname, p_program, p_dept);
    COMMIT;
END;
/

CREATE OR REPLACE PROCEDURE AssignCourse (
    p_instructorId IN TEXT,
    p_courseId IN TEXT
) AS
BEGIN
    INSERT INTO assignments (instructorId, courseId)
    VALUES (p_instructorId, p_courseId);
    COMMIT;
END;
/

-- Large Data
INSERT INTO departments (id, name, location, contact) VALUES ('D-01', 'Artificial Intelligence', 'Block A', '111-222-3333');
INSERT INTO departments (id, name, location, contact) VALUES ('D-02', 'Software Engineering', 'Block B', '444-555-6666');
INSERT INTO departments (id, name, location, contact) VALUES ('D-03', 'Computer Science', 'Block C', '777-888-9999');

INSERT INTO programs (id, name, duration, level, department) VALUES ('P-AI', 'BS Artificial Intelligence', '4 Years', 'Undergraduate', 'D-01');
INSERT INTO programs (id, name, duration, level, department) VALUES ('P-SE', 'BS Software Engineering', '4 Years', 'Undergraduate', 'D-02');

INSERT INTO courses (id, name, credits, totalMarks, type, department) VALUES ('CS-101', 'Programming Fundamentals', '4', '100', 'Core', 'D-03');
INSERT INTO courses (id, name, credits, totalMarks, type, department) VALUES ('AI-201', 'Machine Learning', '3', '100', 'Core', 'D-01');
INSERT INTO courses (id, name, credits, totalMarks, type, department) VALUES ('SE-301', 'Software Design', '3', '100', 'Core', 'D-02');

INSERT INTO instructors (id, fname, lname, qualification, email, gender, department, type) VALUES ('INS-001', 'Ali', 'Khan', 'PhD', 'ali.khan@uni.edu', 'Male', 'D-01', 'Full-time');
INSERT INTO instructors (id, fname, lname, qualification, email, gender, department, type) VALUES ('INS-002', 'Sara', 'Ahmed', 'MS', 'sara.ahmed@uni.edu', 'Female', 'D-02', 'Visiting');

INSERT INTO assignments (instructorId, courseId) VALUES ('INS-001', 'AI-201');
INSERT INTO assignments (instructorId, courseId) VALUES ('INS-002', 'SE-301');

INSERT INTO students (id, fname, lname, phone, email, address, gender, program, department, level) VALUES ('S-1001', 'Omar', 'Tariq', '03001234567', 'omar@student.edu', 'Street 1', 'Male', 'P-AI', 'D-01', 'Sophomore');
INSERT INTO students (id, fname, lname, phone, email, address, gender, program, department, level) VALUES ('S-1002', 'Fatima', 'Noor', '03009876543', 'fatima@student.edu', 'Street 2', 'Female', 'P-SE', 'D-02', 'Freshman');
INSERT INTO students (id, fname, lname, phone, email, address, gender, program, department, level) VALUES ('S-1003', 'Bilal', 'Hassan', '03001122334', 'bilal@student.edu', 'Street 3', 'Male', 'P-AI', 'D-01', 'Junior');

INSERT INTO enrollments (enrollmentId, studentId, courseId, academicYear, semester, enrollDate, status) VALUES ('ENR-001', 'S-1001', 'AI-201', '2026', 'Spring', '10-FEB-26', 'Active');
INSERT INTO enrollments (enrollmentId, studentId, courseId, academicYear, semester, enrollDate, status) VALUES ('ENR-002', 'S-1002', 'SE-301', '2026', 'Spring', '12-FEB-26', 'Active');
INSERT INTO enrollments (enrollmentId, studentId, courseId, academicYear, semester, enrollDate, status) VALUES ('ENR-003', 'S-1003', 'AI-201', '2026', 'Spring', '15-FEB-26', 'Active');

INSERT INTO exams (examId, studentId, courseId, marksObtained, totalMarks, examSession) VALUES ('EX-001', 'S-1001', 'AI-201', '85', '100', 'Midterm');
INSERT INTO exams (examId, studentId, courseId, marksObtained, totalMarks, examSession) VALUES ('EX-002', 'S-1002', 'SE-301', '78', '100', 'Midterm');
INSERT INTO exams (examId, studentId, courseId, marksObtained, totalMarks, examSession) VALUES ('EX-003', 'S-1003', 'AI-201', '92', '100', 'Midterm');