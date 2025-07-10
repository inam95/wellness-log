# Section 3: Conceptual Questions

## Set 1

1. How would you ensure a tabs component is responsive for mobile and desktop,
   considering layout and user interaction?

Answer:

When It's come to Desktop: It's better to use a horizontal tab list with hover states. If the tab list is too long, it's better to use a scrollable tab list. For user interaction, enable keyboard navigation and focus states.

For Mobile: Can use a same horizontal scrollable tab list with swipe gesture support but, if the visual clutter is too much, it's better to use a dropdown menu selection.

2. How would you optimize a virtualized list for 1000+ logs to minimize rendering
   overhead?

Answer:

To optimize a virtualized list for 1000+ logs to minimize rendering overhead, we can use the following techniques:

- Use fixed height for the list items so that the measuring is easy and fast.
- Render only the visible items in the viewport plus a few buffer items to avoid flickering.
- Use React.memo to prevent unnecessary re-renders of list items.
- Make sure to use the correct key prop for each list item to avoid re-rendering issues.
- Use a debounced scroll handler

3. What accessibility features ensure a dropdown menu and modal are usable for screen
   readers and keyboard navigation?

Answer:

For Dropdown Menu:

- `aria-haspopup` and `aria-expanded` attributes to indicate the dropdown menu's state.
- `aria-label` to provide a descriptive label for the dropdown menu.
- `aria-controls` to associate the dropdown menu with its trigger button.
- `aria-activedescendant` to indicate the currently focused item in the dropdown menu.
- `tabindex` to make the dropdown menu focusable.

For Modal:

- `aria-modal` and `aria-labelledby` attributes to indicate the modal's state.
- `aria-label` to provide a descriptive label for the modal.
- `aria-describedby` to provide a descriptive description for the modal.
- `tabindex` to make the modal focusable.

For keyboard navigation (For both dropdown menu and modal):

- `Enter` key to open the modal or select an item in the dropdown menu.
- `Escape` key to close the modal or dismiss the dropdown menu.
- `Tab` key to navigate through the modal or dropdown menu.
- `Space` key to toggle the modal or select an item in the dropdown menu.

4. Describe strategies to secure client-side authentication (e.g., JWT storage) in a wellness
   app.

Answer:

- Do not use `localStorage`or `sessionStorage` to store the JWT token or any sensitive data.
- Use `httpOnly` for Refresh Tokens
- Short lived access tokens
- Input validation and sanitization
- Ensure all communication is done over HTTPS

5. What are the benefits and challenges of implementing server-side rendering for a
   wellness dashboard with authentication?

Answer:

Benefits:

- Since the server sends a fully rendered HTML page, users will see the content faster, reducing the time to first paint.
- Improved web vitals like LCP and FCP.
- Better SEO
- Plus even the client side failed to load or execute, users can still see the initial content.

Challenges:

- Increased server load
- Complexity of the codebase and deployment overhead
- Auth flow is more complex
- Even though user can see the initial content, it might not be interactive until the client side is loaded and executed.
