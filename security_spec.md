# Security Specification - Noirbyte

## 1. Data Invariants
- A user document can only be created by the user themselves (matching their `uid`).
- Users can only read their own data (in this case, `users` collection is private).
- `createdAt` is immutable.
- `lastLogin` and `displayName` / `photoURL` can be updated by the owner.

## 2. The "Dirty Dozen" Payloads (Targeting PERMISSION_DENIED)
1. Creating a user document with a different `uid` than current auth.
2. Updating someone else's user document.
3. Deleting someone else's user document.
4. Reading all users (list) when not authorized.
5. Updating `createdAt` field.
6. Creating a user document without required `email`.
7. Updating user with a ghost field `role: "admin"`.
8. Setting `uid` to a non-string value.
9. Injecting a massive string into `displayName`.
10. Reading a user document as an unauthenticated user.
11. Updating `lastLogin` to a client-provided timestamp instead of `request.time`.
12. Accessing a non-existent path.

## 3. Test Runner (Summary)
A separate test file `firestore.rules.test.ts` (if needed) would verify these. For now, we follow the Fortress pattern.
