# Job Notification Tracker - Feature Showcase

## How to Use the Preference Matching System

### Step 1: Set Your Preferences (Settings Page)

Navigate to /settings and configure:

1. **Role Keywords**: Enter job titles you're interested in
   - Example: React Developer, Frontend Engineer
   - Matching: Titles with these keywords get +25 points

2. **Key Skills**: Enter your technical skills
   - Example: React, TypeScript, JavaScript
   - Matching: Jobs requiring these skills get +15 points

3. **Preferred Locations**: Select work locations
   - Example: Bengaluru, Remote
   - Matching: Jobs in these locations get +15 points

4. **Work Mode**: Select preferred work arrangements
   - Options: Remote, Hybrid, Onsite
   - Matching: Matching modes get +10 points

5. **Experience Level**: Select your career stage
   - Options: Fresher, 0-1, 1-3, 3-5, 5+
   - Matching: Matching level gets +10 points

6. **Match Score Threshold**: Set minimum score (0-100%)
   - Default: 40%
   - Used for filtering in Dashboard

7. **Click "Save Preferences"** - Success message appears

### Step 2: View Matched Jobs (Dashboard)

Navigate to /dashboard after setting preferences:

1. **Match Score Badges**: Each job card shows
   - Score percentage (0-100%)
   - Match quality label
   - Color-coded background:
     - Green (80+): Excellent Match
     - Yellow (60-79): Good Match  
     - Gray (40-59): Fair Match
     - Light Gray (<40): Low Match

2. **Sort by Match Score**:
   - Use "Sort By" dropdown
   - Select "Match Score" option (only visible with preferences)
   - Jobs sort from highest to lowest match

3. **Filter by Threshold**:
   - Check: "Show only jobs above X% match"
   - Only displays jobs meeting your minimum score
   - Helps focus on your best opportunities

4. **Combined Filtering**:
   - Search keyword + Location + Mode + Experience + Source
   - PLUS match score threshold
   - All filters work together

### Step 3: Understand Your Scores

Each job is scored based on 8 criteria:

**High Score Example: +100 (Perfect Match)**
- Job: "React Developer, Remote, 1-3 years, Bengaluru"
- Your prefs: React, Remote, 1-3, Bengaluru, React/JS skills
- Breakdown:
  - +25 React in title
  - +15 React in description
  - +15 Bengaluru location match
  - +10 Remote mode match
  - +10 Experience match (1-3 years)
  - +15 Skill overlap
  - +5 Posted 1 day ago
  - +5 Posted on LinkedIn
  - TOTAL: 100 points 

**Medium Score Example: +65 (Good Match)**
- Job: "Angular Developer, Remote, 1-3 years, Pune"
- Your prefs: React, Remote, 1-3, React/JS skills
- Breakdown:
  - +0 Angular (not React)
  - +15 Description mentions "web development"
  - +0 Pune (not your location)
  - +10 Remote mode match
  - +10 Experience match
  - +15 JS/Angular overlap with skills
  - +5 Recently posted
  - +5 LinkedIn bonus
  - TOTAL: 65 points (Good match but not perfect)

**Low Score Example: +15 (Low Match)**
- Job: "Data Analyst, Onsite, Fresher, Delhi"
- Your prefs: React, Remote, 1-3, React/JS
- Breakdown:
  - +0 No role match
  - +0 No skill match
  - +0 Wrong location
  - +0 Wrong work mode
  - +0 Wrong experience
  - +0 No skill overlap
  - +5 Posted 1 day ago
  - +5 LinkedIn bonus
  - TOTAL: 15 points (Low match)

### Step 4: Save and Track Jobs

1. **Save Jobs**:
   - Click  Save button on any job card
   - Button turns  Saved

2. **View Saved Jobs**:
   - Navigate to /saved
   - See all your saved opportunities
   - Sort/filter by match score

3. **Apply to Jobs**:
   - Click "Apply" button
   - Opens job posting in new tab
   - Track your applications

## Key Features

 **Deterministic Matching**: Same preferences always produce same scores
 **No Backend Required**: Everything stored in browser localStorage
 **Persistent Preferences**: Survives browser refresh and sessions
 **Real-time Scoring**: Scores update immediately when preferences change
 **Smart Filtering**: Combine all filter types with match scores
 **Visual Feedback**: Color-coded badges show match quality at a glance
 **Edge Cases Handled**: 
   - Shows helpful banner if no preferences set
   - Different empty states for filters vs. no matches
   - Loading states prevent confusion

## Example Workflows

### Workflow 1: Find Perfect Fits
1. Set preferences matching your ideal role
2. Set threshold to 80%
3. Check "Show only above threshold"
4. Browse only high-quality matches
5. Save the best ones

### Workflow 2: Explore Opportunities
1. Set broad preferences (many keywords, all locations)
2. Set threshold to 40%
3. Sort by Match Score (highest first)
4. Explore from best matches down
5. Save interesting ones for later

### Workflow 3: Track Progress
1. Set specific preferences (one role, one location)
2. Check "Show only above threshold" with 60%
3. Monitor how many jobs match your criteria
4. Track saved jobs count
5. Adjust threshold as you get more specific

## Technical Architecture

**Data Flow**:
`
User Input (Settings)
    
usePreferences Hook
    
localStorage (persistence)
    
Dashboard + usePreferences
    
calculateMatchScore() for each job
    
addScoresToJobs() adds scores
    
Filter + Sort + Display
    
JobCard renders with badge
`

**Performance**:
- useMemo prevents unnecessary recalculations
- Scoring only runs when preferences change
- Filtering cached during interactive use

**Storage**:
- Preferences: localStorage['jobTrackerPreferences']
- Saved Jobs: localStorage['savedJobs']
- ~1KB per 50 preferences + saved job IDs

## Next Steps

1. Visit Settings page and configure your preferences
2. Go to Dashboard to see all jobs with match scores
3. Sort by Match Score or use threshold toggle
4. Save jobs you like
5. Return anytime - preferences are saved!

---

**Note**: This is a client-side only application. All data stays in your browser. No accounts or servers needed.
