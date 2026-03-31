# EduFinder Project Roadmap

## 🚀 Immediate Tasks
- [ ] **Tech Category**: Add 5+ more courses to reach a full grid.
- [ ] **Data Fix**: Update Course ID `11` (Computer architecture) with a valid provider URL.
- [ ] **Empty Categories**: Add placeholder courses for "Health", "Math", and "Music" to remove the "coming soon" state.

## 🛠️ Feature Backlog
- [ ] **Search Logic**: Implement the filter function in `HomePage` to make the search bar functional.
- [ ] **Favorites System**: Allow users to "Heart" a course and save it to `localStorage`.
- [ ] **Course Sharing**: Use the Web Share API on the `Share2` icon in the footer/cards.

## 🧹 Refactoring & Code Quality
- [ ] **Data Separation**: Move `POPULAR_COURSES` and `CATEGORIES` from `App.tsx` to `src/data/courses.ts` to keep the main file clean.
- [ ] **Componentization**: Move `Navbar`, `CourseCard`, and `CategoryCard` into a `src/components/` directory.
- [ ] **Image Optimization**: Implement lazy loading for course images to improve performance as the list grows.

## 📝 Notes
- Always use `target="_blank"` and `rel="noopener noreferrer"` for external course links.
- Maintain consistent image aspect ratios (16:9) for the `CourseCard` thumbnails.