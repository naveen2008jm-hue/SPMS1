# AXIOM System Architecture

## Overview
AXIOM is a diverse Skill Intelligence Platform. This document outlines the high-level architecture facilitating the flow of data from external integrations to the core Logic Engine and finally to the User Interfaces.

## High-Level Architecture Diagram

```mermaid
graph TD
    subgraph "External Data Sources"
        LMS[LMS: Udemy/LinkedIn]
        PM[Project Mgmt: Jira/Asana]
        PROD[Productivity: Google Analytics]
    end

    subgraph "Integration Layer (Middleware)"
        WH[Webhook Receiver]
        POLLER[Scheduled Poller]
        NORM[Data Normalizer]
    end

    subgraph "Core Platform (AXIOM)"
        DB[(PostgreSQL Database)]
        
        subgraph "Logic Engine"
            GAP[Gap Detection Mod]
            SCORE[Weighted Scoring Algo]
            ROI[Financial ROI Engine]
        end

        subgraph "API Layer"
            API[Next.js API Routes]
        end
    end

    subgraph "User Interfaces"
        DASH_F[Founder Dashboard]
        DASH_H[HR Manager Dashboard]
        DASH_E[Employee Interface]
        REC[Recruitment Portal]
    end

    %% Data Flow
    LMS --> |Course Progress| POLLER
    PM --> |Milestones/Proof of Work| POLLER
    PROD --> |Usage Stats| POLLER
    LMS -.-> |Real-time Events| WH
    
    WH --> NORM
    POLLER --> NORM
    NORM --> DB

    DB <--> GAP
    DB <--> SCORE
    DB <--> ROI

    GAP --> API
    SCORE --> API
    ROI --> API

    API <--> DASH_F
    API <--> DASH_H
    API <--> DASH_E
    API <--> REC
```

## Component Details


### 1. Integration Layer
- **Purpose**: Ingest objective data from disparate sources.
- **Components**:
  - **Webhook Receiver**: Endpoint for real-time updates (e.g., Ticket Completed).
  - **Poller**: Cron jobs to fetch daily/weekly stats.
  - **Normalizer**: Converts vendor-specific JSON into a standardized "Activity Event" format.

### 2. Logic Engine
- **Weighted Scoring Algorithm**:
  - `Score = (Work_Output * 0.4) + (Manager_Obs * 0.3) + (Peer_Feedback * 0.2) + (System_Usage * 0.1)`
- **Gap Detection**: Analyzes User Skill Level vs. Role Requirement Level. Triggers IDP creation.

### 3. Database
- **PostgreSQL**: Relational integrity for Users, Skills, and transactional Activity Logs.

### 4. Frontend (Next.js)
- **Multi-Role Access**: Role-based routing (RBAC) to serve distinct UI layouts for Founders, HR, and Employees.

