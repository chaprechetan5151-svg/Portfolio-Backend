postgresql://username:password@ep-cool-cloud-123.eu-central-1.aws.neon.tech/neondb?sslmode=require
-- 1. Create the table
CREATE TABLE skills (
    id SERIAL PRIMARY KEY,
    category VARCHAR(50),
    technologies TEXT
);

-- 2. Insert your actual data into the database
INSERT INTO skills (category, technologies) 
VALUES 
('Frontend', 'HTML, CSS, JavaScript, React'),
('Backend', 'Node.js, Express, PostgreSQL'),
('Status', 'Available for freelance work');