# undecisive

# Pick One

A personal hub for the things I keep putting off deciding: what to **buy**, where to **eat**, what
to **cook**, and what to **watch** — plus a **log** of what I actually picked. Every section (except
Buy and Log) has a wheel for when nothing sounds right.

It's one HTML file. No build step, no dependencies, no backend.

## Run it

- **Locally** — open `index.html` in a browser. That's it.
- **On GitHub Pages** — put `index.html` at the top level of a public repo, then Settings → Pages →
  Source: *Deploy from a branch* → `main` / `root` → Save. It goes live at
  `https://<username>.github.io/<repo>/`.

## Using it

```
Buy    -> country -> store -> items (with links)
Eat    -> country -> restaurant (dine in / order in) -> dishes
Cook   -> recipes (ingredients + method)
Watch  -> streaming service -> titles
Log    -> history of every wheel pick + anything you marked done
```

Add and edit everything from inside the app — sections start with a few countries, stores and
streaming services seeded, and you add the rest.

**The wheel.** The "Pick for me" button spins a wheel over the current section. Eat has a wheel per
country, Watch can spin one service or everything. The chips under the wheel let you drop items out
of a spin when you only want to choose between a few.

**Recipes.** Open a recipe for ingredients and a method. The `1/2x 1x 2x 3x` toggle rescales the
ingredient amounts live (fraction-aware, so half-tsp doubles to one tsp). **Cooking mode** is a
full-screen, large-type view of the steps that keeps the screen awake while your hands are busy.

**The log.** The wheel writes its final pick here automatically — spinning again just updates the
same entry, so idle re-spins don't pile up. You can also log a decision you made without spinning:
tap the check on any item, or **Cooked this** in a recipe. Entries group by day and filter by
section. Clearing the log never touches your lists.

## Where the data lives

Everything is saved to the browser's `localStorage` first, so the app works offline and is never
committed to this repo. That means each device starts with its own separate copy.

### Syncing your own devices (optional)

Settings → **Sync across devices** keeps all your devices on one copy, using a secret GitHub Gist
as the store. Nothing is shared with anyone else — the sync uses *your* GitHub account.

1. [Create a token](https://github.com/settings/tokens/new?scopes=gist&description=Pick%20One%20sync)
   with only the **gist** scope. Set expiry to *No expiration* unless you want to redo it yearly.
   Copy it — GitHub shows it once.
2. Paste the same token into the app on each device and hit **Connect**. The first device creates
   the gist; the others find it automatically — no IDs to copy around.

After that it saves ~1.5s after you stop typing, and pulls when you open or return to the tab (plus
once a minute while open). The dot on the settings icon shows the state: green synced, amber
working, red something's wrong, hidden means off.

**Newest edit wins** — if you edit the same list on two devices at once, one replaces the other;
there's no merging. Fine for one person. The first time you connect a device that already has data,
the app asks which copy to keep rather than guessing.

### If you fork this

Sync is per-person by design. When someone else uses the site they paste *their own* token, which
creates a gist under *their* account and syncs *their* devices. Visitors never see each other's
data, and never see yours.

### Worth knowing

- The token lives in `localStorage` on each device. It can only touch gists, but treat it like a
  password — revoke it from GitHub settings if a device is lost.
- A "secret" gist is unlisted, not private: anyone with the URL can read it. Fine for shopping lists
  and recipes; don't put anything sensitive in there.
- **Don't commit a backup JSON to a public repo** — that file *would* be readable. Keep backups
  local (Settings -> *Download JSON* / *Load JSON*), which also works for moving data by hand.

## Keyboard

`1`-`5` switch sections · `/` search · `S` spin the wheel · `Esc` close a dialog
