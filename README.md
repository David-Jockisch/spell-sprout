# Learning Garden

A mobile-first learning site for spelling and math, with one shared learner list and separate grown-up settings for each subject. Grammar Grove is reserved for a future activity.

**Live site:** https://david-jockisch.github.io/spell-sprout/

## iPad installation

Open the live site in Safari, tap **Share → Add to Home Screen**, enable **Open as Web App** if offered, then tap **Add**. If an older Spell Sprout shortcut is installed, remove that shortcut and add Learning Garden again to pick up the new name and flower icon. This does not delete the Safari site's saved learner data; storage in a standalone web app may be separate depending on iPadOS.

## Grown-up setup

Select a learner on Grown-ups home. Spelling settings hold weekly word lists, pronunciation hints, voice, speed, and answer sounds. Math settings choose operations, number ranges, missing-number practice, and a 10- or 15-question round. New rounds generate new questions and show first-try score and best streak. The home page shows the saved best spelling and math streak for each learner.

Profiles, lists, settings, and progress are stored locally on each device. Devices do not sync. The production site retains the existing `spell-sprout-v1` browser storage key, so previous spelling data remains available in the same browser context. Clearing site data can erase it.

After the site loads online, its service worker caches the pages, styles, scripts, icons, and answer chimes for offline practice. Speech depends on the voices available on the iPad.

## Files

`index.html` is the learner landing page; `spelling.html` is Spell Sprout; `math.html` is Math Meadow; `parents.html` is the shared grown-ups home. `grownups.html` and `math-settings.html` hold subject-specific settings. `manifest.webmanifest` and `sw.js` make the site installable and available offline.

The earlier spelling-only source is preserved in Git history at commit `3997184895a0957c099edd71c4945fdacf5d4a0e`.
