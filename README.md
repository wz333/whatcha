# Whatcha — support pages

The Support and Privacy Policy pages for Whatcha, the iPhone app that teaches English
words for everyday things. Served by GitHub Pages under the wz333.app domain:

- <https://wz333.app/whatcha/support/> — Support URL
- <https://wz333.app/whatcha/privacy/> — Privacy Policy URL (also in the app's
  membership sheet, `Membership.privacyURL`, and in AdMob's consent message)

This repository (`wz333/whatcha` on GitHub, so its pages sit at `/whatcha/`) is public because
Pages on a free plan only publishes from a public repository. It holds the pages and nothing
else; the app's source stays private.

```
index.html          A small home page linking the two.
support/index.html  Contact email and common questions.
privacy/index.html  The privacy policy.
style.css           The app's sky, cream card and navy ink (colors from Theme.swift), light and dark.
sky.js              Draws Learn's clouds behind the card, moving at 0.4 of the scroll (parallax).
img/                The app icon and two mascot poses, from the app's asset catalog.
```

Preview with `python3 -m http.server 8780` here.

Keep the privacy policy in step with the app: a new SDK, a new thing sent off the device, or
a change to the app's `PrivacyInfo.xcprivacy` means updating it, its effective date, and the
App Privacy answers in App Store Connect.
