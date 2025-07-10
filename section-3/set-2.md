# Section 3: Conceptual Questions

## Set 2

1. What are the differences between View, Text, and ScrollView in React Native?

Answer:

- View: Basic container for anything you want to lay out.
- Text: For displaying text.
- ScrollView: For displaying a scrollable area of content.

2. How would you implement a dark mode toggle in a wellness app, ensuring it's accessible and
   responsive across all devices?

Answer:

-

3. What’s the difference between navigate and push in a stack navigator?

Answer:

- `navigate` Go to this screen, and if it's already open, just bring that one to the front. Don't make a new one
- `push` Always put a brand new copy of this screen on top, no matter what

4. Explain how to improve the performance of a React Native app.

Answer:

- Use `React.memo`, `useMemo`, `useCallback`
- Use unique key for each item in the list
- Use `FlatList` or `SectionList` for large lists
