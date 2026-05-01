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