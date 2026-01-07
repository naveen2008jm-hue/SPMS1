-- AXIOM Database Schema (PostgreSQL)

-- 1. Users & Roles
CREATE TYPE user_role AS ENUM ('FOUNDER', 'HR_MANAGER', 'EMPLOYEE', 'CANDIDATE');

CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    role user_role NOT NULL,
    department VARCHAR(100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Skills Framework
CREATE TABLE skills (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    category VARCHAR(100), -- e.g., Technical, Soft Skill
    description TEXT
);

CREATE TABLE job_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    description TEXT
);

-- Define required skills for a Job Role
CREATE TABLE job_role_skills (
    job_role_id UUID REFERENCES job_roles(id),
    skill_id UUID REFERENCES skills(id),
    required_proficiency_level INTEGER CHECK (required_proficiency_level BETWEEN 1 AND 10),
    PRIMARY KEY (job_role_id, skill_id)
);

-- Assign Role to User
CREATE TABLE user_job_assignments (
    user_id UUID REFERENCES users(id),
    job_role_id UUID REFERENCES job_roles(id),
    assigned_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    PRIMARY KEY (user_id, job_role_id)
);

-- 3. Skill Matrices & Gaps
CREATE TABLE user_skills (
    user_id UUID REFERENCES users(id),
    skill_id UUID REFERENCES skills(id),
    current_proficiency_level INTEGER DEFAULT 0 CHECK (current_proficiency_level BETWEEN 0 AND 10),
    last_assessed_at TIMESTAMP WITH TIME ZONE,
    PRIMARY KEY (user_id, skill_id)
);

-- 4. Integration Data (Proof of Work/Learning)
CREATE TYPE source_type AS ENUM ('LMS', 'PROJECT_MGMT', 'PRODUCTIVITY');
CREATE TYPE activity_type AS ENUM ('COURSE_COMPLETE', 'TICKET_CLOSE', 'DOC_EDIT', 'COMMIT');

CREATE TABLE integrations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100), -- e.g., 'Jira', 'Udemy'
    source_type source_type NOT NULL,
    api_key_enc TEXT, -- Encrypted
    api_url TEXT,
    is_active BOOLEAN DEFAULT TRUE
);

CREATE TABLE activity_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id),
    integration_id UUID REFERENCES integrations(id),
    activity_type activity_type NOT NULL,
    external_reference_id VARCHAR(255), -- ID in the external system
    metadata JSONB, -- Store raw detailed data (url, time spent, etc.)
    timestamp TIMESTAMP WITH TIME ZONE NOT NULL,
    processed BOOLEAN DEFAULT FALSE
);

-- 5. Individual Development Plans (IDP)
CREATE TYPE idp_status AS ENUM ('ACTIVE', 'COMPLETED', 'OVERDUE');

CREATE TABLE development_plans (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id),
    created_by UUID REFERENCES users(id), -- Manager or HR
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    status idp_status DEFAULT 'ACTIVE',
    review_notes TEXT
);

CREATE TABLE development_tasks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    plan_id UUID REFERENCES development_plans(id),
    skill_id UUID REFERENCES skills(id),
    task_description TEXT NOT NULL,
    resource_link TEXT, -- Link to course or job
    due_date DATE,
    completed_at TIMESTAMP WITH TIME ZONE
);

-- 6. Feedback & Reviews (For Scoring)
CREATE TYPE reviewer_relationship AS ENUM ('MANAGER', 'PEER');

CREATE TABLE feedback_reviews (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    subject_user_id UUID REFERENCES users(id),
    reviewer_user_id UUID REFERENCES users(id),
    relationship reviewer_relationship NOT NULL,
    skill_id UUID REFERENCES skills(id),
    rating INTEGER CHECK (rating BETWEEN 1 AND 10),
    comments TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 7. Recruitment Assessment
CREATE TABLE assessments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255),
    time_limit_minutes INTEGER DEFAULT 10,
    scenario_description TEXT
);

CREATE TABLE candidate_results (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    candidate_user_id UUID REFERENCES users(id),
    assessment_id UUID REFERENCES assessments(id),
    started_at TIMESTAMP WITH TIME ZONE,
    completed_at TIMESTAMP WITH TIME ZONE,
    score_achieved DECIMAL(5, 2),
    employer_assumption_score DECIMAL(5, 2) -- To check bias
);

-- 8. Financial ROI Tracking
CREATE TABLE financial_records (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    period_start DATE,
    period_end DATE,
    program_cost DECIMAL(10, 2), -- Total spend on L&D
    productivity_gain_value DECIMAL(10, 2), -- Estimated value of improved output
    ad_spend_saved DECIMAL(10, 2), -- Recruitment costs saved
    roi_percentage DECIMAL(5, 2) GENERATED ALWAYS AS (
        CASE WHEN program_cost > 0 THEN
            ((productivity_gain_value + ad_spend_saved) - program_cost) / program_cost * 100
        ELSE 0 END
    ) STORED
);
