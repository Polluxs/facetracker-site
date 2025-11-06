# Contact Page

## Overview
The contact page provides a simple, user-friendly form for visitors to get in touch with the Facetracker team.

## Features

### Contact Form
- **Name field**: Required text input for user's name
- **Email field**: Required email input with validation
- **Subject field**: Required text input for the message subject
- **Message field**: Required textarea for the main message content

### Fake Submit Functionality
Currently, the form uses a **fake submission** system:
- When the user clicks "Send Message", a loading state is shown
- After 1 second, a success message appears with an animated checkmark
- After 3 seconds, the form automatically resets
- **No actual backend submission** - this is intentional for the initial implementation

### Styling
The contact page matches the homepage design:
- **Color scheme**: Blue, purple, and cyan gradients
- **Animations**: Fade-in effects with staggered delays
- **Layout**: Responsive design with mobile-first approach
- **Background**: Animated gradient blobs
- **Form styling**: Rounded corners, shadow effects, and gradient buttons

### Components Used
- `PublicNav`: Main navigation component
- `Input`: Text input fields from shadcn UI
- `Textarea`: Multi-line text input (custom component)
- `Label`: Form labels from shadcn UI
- `Button`: Styled button component from shadcn UI

## Future Improvements

When ready to implement real functionality:

1. Create a server-side action in `+page.server.ts`
2. Integrate with an email service (Resend, SendGrid, etc.)
3. Add proper form validation
4. Implement rate limiting to prevent spam
5. Add honeypot fields for bot protection
6. Store submissions in the database for tracking

## Technical Details

### Form State Management
Uses Svelte 5's new `$state` rune for reactive form data:
```typescript
let formData = $state({
  name: '',
  email: '',
  subject: '',
  message: ''
});
```

### Type Safety
All form fields are properly typed with TypeScript, following the project's strict "no `any`" policy.
