# TODO: Add video.description support

## Scope (minimal safe implementation only)

### 1. User Frontend — `src/app/components/VideoShowcase.tsx`
- [x] Add `description: string` to `Video` type
- [x] Replace static `headlines[index % headlines.length]` with `video.description`
- [x] Remove static "Watch Now →" subtitle (replaced by dynamic description)
- [x] Add `line-clamp-2` and `title` tooltip for readable multi-line descriptions

### 2. Admin Panel — `src/app/admin/(sub pages)/videos/page.tsx`
- [x] Fix "Update Video" button: change `disabled={submitting || !file}` to `disabled={submitting}`
- [x] Verify `handleUpdate` already sends `description` and optional `file` correctly

### 3. Validation
- [x] Build check passes with no TypeScript/JSX errors

