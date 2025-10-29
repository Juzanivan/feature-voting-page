# Planning Guide

A community-driven ideas board where users can submit, vote on, and discuss feature suggestions in a clean, intuitive interface.

**Experience Qualities**:
1. **Democratic** - Every voice matters equally through simple upvote/downvote mechanics that make participation effortless
2. **Transparent** - Vote counts and post rankings update instantly, creating a clear picture of community sentiment
3. **Minimal** - Clean design focuses attention on ideas themselves rather than interface complexity

**Complexity Level**: Light Application (multiple features with basic state)
This app manages multiple posts with voting state, sorting, and form submission while maintaining simplicity through focused features.

## Essential Features

### Post Creation
- **Functionality**: Users submit new ideas with title and description
- **Purpose**: Enable community members to contribute suggestions
- **Trigger**: Click "New Idea" button
- **Progression**: Click button → Form appears → Enter title and description → Submit → Post appears at top of list
- **Success criteria**: Post persists after page refresh and appears in the feed

### Voting System
- **Functionality**: Upvote or downvote any post
- **Purpose**: Surface the most valuable ideas through democratic consensus
- **Trigger**: Click upvote or downvote arrow on any post
- **Progression**: Click arrow → Vote count updates immediately → Post repositions in sorted list → State persists
- **Success criteria**: Votes persist, users can change their vote, posts sort by score

### Post Display
- **Functionality**: Show all posts sorted by vote score (upvotes - downvotes)
- **Purpose**: Highlight community priorities
- **Trigger**: Page load or new vote
- **Progression**: Load data → Calculate scores → Sort by highest score → Render in descending order
- **Success criteria**: Posts automatically reorder as votes change

## Edge Case Handling

- **Empty State**: Display welcoming message with "Create your first idea" prompt when no posts exist
- **Rapid Voting**: Debounce vote actions to prevent accidental double-clicks from counting twice
- **Long Content**: Truncate descriptions over 200 characters with "Read more" expansion
- **No Description**: Allow posts with just titles, showing placeholder text for missing descriptions

## Design Direction

The design should feel clean, democratic, and focused - like a digital town hall where ideas take center stage. Minimal interface with purposeful color to highlight voting actions and create clear visual hierarchy between post elements.

## Color Selection

Triadic color scheme to create visual separation between upvote (positive), downvote (negative), and neutral content areas with distinct emotional associations.

- **Primary Color**: Deep Blue `oklch(0.45 0.15 250)` - Trustworthy and professional, communicates stability and community
- **Secondary Colors**: Soft Gray `oklch(0.96 0.005 250)` for cards and backgrounds, creating subtle depth without distraction
- **Accent Color**: Vibrant Orange `oklch(0.68 0.18 45)` for "New Idea" CTA and interactive highlights, drawing attention to key actions
- **Upvote**: Fresh Green `oklch(0.65 0.18 145)` - Positive reinforcement for good ideas
- **Downvote**: Muted Red `oklch(0.58 0.18 25)` - Gentle disagreement without aggression
- **Foreground/Background Pairings**:
  - Background (White `oklch(0.99 0 0)`): Dark Gray text `oklch(0.25 0.01 250)` - Ratio 13.2:1 ✓
  - Card (Soft Gray `oklch(0.96 0.005 250)`): Dark Gray text `oklch(0.25 0.01 250)` - Ratio 12.1:1 ✓
  - Primary (Deep Blue `oklch(0.45 0.15 250)`): White text `oklch(0.99 0 0)` - Ratio 7.8:1 ✓
  - Accent (Orange `oklch(0.68 0.18 45)`): Dark Gray text `oklch(0.25 0.01 250)` - Ratio 5.2:1 ✓
  - Upvote (Green `oklch(0.65 0.18 145)`): White text `oklch(0.99 0 0)` - Ratio 4.6:1 ✓
  - Downvote (Red `oklch(0.58 0.18 25)`): White text `oklch(0.99 0 0)` - Ratio 5.1:1 ✓

## Font Selection

Clear, readable sans-serif typography that feels modern and approachable, prioritizing legibility for scanning multiple posts quickly.

**Primary Font**: Inter - Clean geometric sans-serif with excellent readability at all sizes

- **Typographic Hierarchy**:
  - H1 (Page Title): Inter Bold/32px/tight letter-spacing (-0.02em)
  - H2 (Post Title): Inter SemiBold/20px/normal letter-spacing
  - Body (Description): Inter Regular/16px/relaxed line-height (1.6)
  - Meta (Vote counts, timestamps): Inter Medium/14px/tight letter-spacing
  - Button Text: Inter SemiBold/15px/normal letter-spacing

## Animations

Subtle, purposeful motion that provides feedback without delaying actions - animations should feel responsive and spring-based, mimicking natural physics to create satisfying interactions.

- **Purposeful Meaning**: Vote buttons scale slightly on press, creating tactile feedback; posts smoothly reorder when scores change, maintaining spatial awareness
- **Hierarchy of Movement**: Vote count changes fade-scale in (most important); card hover lifts with subtle shadow (secondary); form appearance slides from top (tertiary)

## Component Selection

- **Components**:
  - **Card**: Post container with subtle shadow and hover state, using default shadcn Card with border customization
  - **Button**: Primary CTA for "New Idea" (filled variant), vote buttons (ghost variant with custom colors)
  - **Dialog**: Modal for creating new posts with title/description inputs
  - **Input & Textarea**: Form fields with focus states for post creation
  - **Badge**: Display vote count with dynamic color based on positive/negative score
  - **ScrollArea**: Container for posts list with smooth scrolling
  
- **Customizations**:
  - Custom VoteButton component combining Button with Phosphor arrow icons and score display
  - Custom PostCard component with integrated voting UI and expandable description
  - Empty state illustration component with welcoming copy
  
- **States**:
  - **Buttons**: Hover shows subtle background, active state scales down slightly, disabled reduces opacity
  - **Vote Buttons**: Active vote highlights in full color, inactive shows muted gray, hover brightens
  - **Cards**: Default has subtle shadow, hover lifts with increased shadow, recently voted pulses briefly
  
- **Icon Selection**:
  - CaretUp/CaretDown (Phosphor) for voting arrows - clear directional meaning
  - Plus (Phosphor) for creating new posts - universal add symbol
  - ChatCircle (Phosphor) for post/discussion indicator
  
- **Spacing**:
  - Container padding: px-6 py-8 (24px/32px)
  - Card padding: p-6 (24px)
  - Gap between posts: gap-4 (16px)
  - Button padding: px-4 py-2 (16px/8px)
  - Vote button spacing: gap-2 (8px)
  
- **Mobile**:
  - Stack vote buttons vertically on left side of card on mobile (<768px)
  - Reduce card padding to p-4 on mobile
  - Single column layout for all posts
  - Modal dialog becomes full-screen sheet on mobile
  - Touch targets minimum 44x44px for all interactive elements
