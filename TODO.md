- [x] Setting up the form correctly (ex. checkboxes should be radio buttons, might need additional development for form uploads)
- [x] Open invoice for Yoast work
- [ ] Suggest privacy policy (not in scope to provide all notes)
  - [ ] Suggest enabling auto delete of contact form
  - [ ] Consider SES or similar for emails, rather than server
- [ ] Should get the app transferred to your own Netlify account, where I am a developer, rather than you being attached to mine
- [x] Try and make the form always full height (not possible cross domain)
- [x] .no-breakout class for gallery
- [x] Do you want to continue with the video clips?
- [ ] Proof-of-concept of Preview functionality, once domain is configured with Anchor.host

---

Notes for Kenneth:

There was a tricky issue with that remaining title tag and Yoast—it kept providing “Page not found” in the title because of a lower-level setting we had saying those pages wouldn’t be shown to search engines.

I believe I’ve fixed this in two different ways:

- Guides I disabled the no indexing in Yoast, so the data can get to the site, and then manually hid the guides from search engines
- Highlights I manually constructed the title tag from what’s available (also manually hiding the Highlights from search engines anyway)

---
