# Flow (Veo 3) prompt sets — Smartwatch Solutions brand videos

Creative brief for replacing the generic `/public/videos/hero.mp4` city clip with brand films that
show what Smartwatch Solutions actually does: fleet and mobile-asset management from Kampala —
cargo e-locks on the East African corridors, AI dash cams, GPS trackers and fuel sensors, one
platform, 20K+ active devices, since 2011, 70% fewer accidents.

Four videos, each built from at most **three 8-second Flow clips (≤ 24s per video)**. Every clip
prompt below is written to be pasted into Flow as-is (one paragraph, Veo 3 best practice: subject →
setting → camera → timed action → style/grade → audio). The paired **Negative / avoid** line goes
into Flow's negative-prompt field, or append it to the prompt as "Avoid: …" if you have no field.

## Read this before generating

- **Add all real UI, numerals, logos and captions in post, not in Veo.** Veo garbles written
  type and invents gibberish labels. The prompts therefore ask only for *abstract* glowing
  interface shapes — rings, brackets, pulsing pins, blank panels — which the edit then dresses
  with the real Smartwatch FM UI, the wordmark and stat lines (20K+ devices, 70% fewer
  accidents) in After Effects. Never ask Veo to render the logo or any legible text.
- **The hero cut must work muted and as a loop.** Autoplaying homepage video is muted by
  default; audio is a bonus for social cuts. Video 4 (and the Video 1 alternative ending) are
  designed so the last frame lands back near the first — grade and horizon match — for a soft
  crossfade loop.
- **Add the client's seal photo as a Flow ingredient named `@seal` in every project.** Wherever
  a prompt says `@seal`, Flow uses that image as the visual reference for the device. The truck
  never appears without it: every truck shot carries the @seal device clamped on its container
  door bars. The LED and the holographic rings may animate on and around it, but the physical
  device must keep the @seal image's shape, proportions and finish — a take where Veo redesigns
  it is a reject.
- **Generate 3–4 takes per clip and cut the best.** Use Flow's extend / frame-match on the
  outgoing frame of each clip so the match-cuts land; the transition notes say exactly which
  frame to match.

## Continuity kit (restated inside every prompt — keep it verbatim)

So the three clips of a video cut together, and so the four videos feel like one campaign, every
prompt re-anchors the same elements:

- **The truck**: a modern white cab-over container truck (Sinotruk/FAW class, common on the
  Northern Corridor), **right-hand drive, driving on the left**, one sweeping curved green
  decal (#4a8f42) along the cab — *no lettering on the livery*. It hauls a rust-red 40-ft
  container with the `@seal` device clamped across the door bars (next bullet).
- **The e-seal (`@seal`)**: the client's real device — their seal photo, added as a Flow
  ingredient named `@seal` in every project and referenced by name in the prompts. It sits
  clamped across the container door rods in every truck shot, matching the @seal image in
  shape, proportions and finish; its LED reads green when sealed/authorised, red on tamper.
  Animation (the LED, the holographic rings) plays over and around it without altering the
  device, and it carries no text beyond what the @seal image itself shows.
- **The grade** ("the Smartwatch grade"): clean modern commercial look — warm golden key
  light, deep navy-blue shadows (#1b2845), saturated brand green (#4a8f42) reserved for the
  livery swoosh, LED ring and holographic UI; lifted blacks, subtle film grain, no teal-orange
  LUT, no washed-out drone haze.
- **The UI idiom**: interface elements materialise **in world space** as thin volumetric green
  holograms — a ring around the lock, a bracket around a vehicle, a pulsing map pin — never as
  flat screen overlays, never with readable text.
- **The place**: East Africa, unmistakably — Kampala and the Northern Corridor. Red murram
  shoulders, green banana and eucalyptus roadside, matatus and boda bodas in traffic,
  African drivers and officers, left-hand traffic. Never a US freeway, never a left-hand-drive
  cab, never snow.

---

## Video 1 — "From Road to Map" (Cargo Tracking · ECTS) — the flagship

**Story.** One sealed container truck leaves Kampala at golden hour and dissolves into a living
map of the corridor, where it is just one of dozens of green pins moving in real time — then the
camera dives back down one pin into the same truck rolling into a bonded warehouse, lock flashing
green. Road → map → road: the whole ECTS promise (real-time location for transporters and revenue
authorities, opens only at the right place) in 24 seconds without a word.

**Placement.** The Cargo Tracking spotlight on the homepage (`CargoSpotlight`), the
`/solutions/electronic-cargo-tracking` hero, and the primary social cut. Also the strongest
candidate to replace `hero.mp4` (see the loop note in Clip 3).

### Clip 1 — the truck and the seal (0–8s)

```text
Low tracking shot alongside a modern white cab-over container truck, right-hand drive, driving on
the left down a two-lane East African highway at golden hour, one sweeping curved green decal
along the white cab, hauling a rust-red 40-ft container; red murram road shoulder, banana trees
and eucalyptus blurring past, a matatu and two boda bodas passing in the opposite lane. Camera on
a gimbal at wheel height, 35mm lens, matching the truck's speed. 0–3s: the camera holds beside the
rear container doors where the @seal electronic lock is clamped across the door rods, matching
the @seal reference image exactly in shape, proportions and finish;
3–5s: a thin volumetric green holographic ring materialises around the lock and pulses once, a
faint green signal arc lifts off it into the sky; 5–8s: the camera slows and rises as the truck
pulls ahead and recedes toward the sun-lit horizon, road stretching straight to a vanishing point.
Clean modern commercial grade: warm golden key light, deep navy-blue shadows, brand green only in
the decal, lock LED and hologram; lifted blacks, subtle film grain, shallow depth of field.
Audio: deep diesel engine hum doppler-shifting past, tyre roar on tarmac, one soft electronic
chirp as the ring pulses, warm afrobeat-tinged percussion building underneath, no dialogue.
End frame: the truck small on the centre of the horizon, camera still rising — hold this framing
for the match-cut into the next clip.
```

**Negative / avoid:** on-screen text, captions, subtitles, watermarks, logos, lettering on the
truck, left-hand-drive cab, right-hand traffic, American semi truck, snow, desert, motion
blur smearing the lock, a generic padlock or any lock that deviates from @seal, extra cargo
straps, deformed wheels.

### Clip 2 — the dissolve into the map (0–8s)

```text
Seamless continuation: a small white container truck with a green cab decal, the @seal lock
still visible on its rear container doors, driving away down a
straight golden-hour East African highway toward the horizon, camera rising steadily above and
behind it, drone-style, 24mm lens. 0–3s: as the camera climbs, the landscape softens into a
stylised dark navy-blue satellite map seen from high altitude — the road becomes a thin glowing
green route line and the truck shrinks and dissolves into a bright green teardrop map pin with a
soft radar pulse; 3–6s: the camera keeps pulling up and the map widens to show an East African
trade corridor from lake to coast, a dozen more green pins gliding smoothly along branching glowing
route lines between city glows, each pin trailing a faint green line, terrain in deep navy relief
with subtle topography; 6–8s: one pin near the map's edge pulses brighter twice, and the camera
begins to dive toward it. Style: premium motion-graphics realism, deep navy-blue world with glowing
brand-green routes and pins, faint golden atmospheric haze at the map's horizon matching the sunset
of the previous shot, clean, minimal, no labels. Audio: engine fades into a soft ambient whoosh,
gentle sonar-like pings as pins pulse, the afrobeat percussion carrying through, no dialogue.
End frame: diving toward the single bright pulsing pin filling more of frame — match this frame
to the start of the next clip.
```

**Negative / avoid:** readable text, city names, numbers, UI panels with writing, country
borders drawn as hard lines, globe spinning cliché, flat 2D screen-recording look, red pins,
Google-Maps-style interface chrome.

### Clip 3 — the pin becomes an arrival (0–8s)

```text
Seamless continuation: camera diving down toward a single bright green pulsing map pin on a dark
navy stylised satellite map, 24mm lens, accelerating. 0–3s: the map's navy surface resolves into
real dusk landscape — warehouse rooftops, sodium lights coming on — and the pin dissolves into the
same white cab-over container truck with the green cab decal and rust-red container, right-hand
drive, turning off the road into the gate of an inland bonded warehouse yard, stacked shipping
containers and a boom barrier ahead; 3–6s: the camera settles to shoulder height beside the rear
doors as the truck stops at the barrier, a Ugandan officer in a hi-vis vest raises a handheld
reader toward the @seal electronic lock on the door rods — the same device as the @seal
reference image, unchanged — the green holographic ring reappears
around the lock and pulses; 6–8s: the lock's LED ring flashes green, the shackle releases with a
crisp mechanical clunk, the boom barrier lifts, the officer waves the truck forward, warm gate
lights flaring softly in the lens. Clean modern commercial grade: dusk blue-hour ambience with
deep navy shadows, warm golden practical lights, brand green only in decal, hologram and LED,
lifted blacks, subtle film grain. Audio: engine idle and air-brake hiss, two soft UI chirps, one
satisfying deep clunk as the lock opens, barrier motor whirr, afrobeat percussion resolving to a
warm final chord, no dialogue.
End frame: truck rolling through the gate, lock in the foreground glowing green — hold for the
end-card added in post.
```

**Negative / avoid:** readable text or signage close-ups, garbled writing on the reader screen,
left-hand-drive cab, US-style truck stop, chain-link Americana, security guard with visible
brand patches, a lock that deviates from @seal, rain, lens dirt.

**Loop / hero note.** For a muted homepage loop, alternatively end Clip 3 on the truck pulling
away from the gate toward a golden horizon (mirroring Clip 1's end frame) and crossfade 3→1; the
grade is identical at both ends by design. End-card in post: wordmark + "Cargo Tracking · ECTS".

---

## Video 2 — "Opens Only Where It Should" (the e-lock product hero)

**Story.** A macro love-letter to the e-lock: it snaps shut at a Kampala depot at night, shrugs
off a tamper attempt that instantly lights up a control-room phone, and opens for exactly one
person — the officer with the right electronic key, at the right warehouse, in the right time
window. Right place, right key, right time, three clips.

**Placement.** `/solutions/electronic-cargo-tracking` mid-page, sales decks, and a
sound-on social cut (the clunk is the hook).

### Clip 1 — the seal (0–8s)

```text
Macro product cinematography at a Kampala freight depot at night: a Ugandan worker's hands in
work gloves clamp the @seal electronic lock — matching the @seal reference image exactly in
shape, proportions and finish — over the vertical door rods
of a rust-red shipping container on a white cab-over truck with a curved green cab decal, floodlit
warm against deep navy-blue night. Camera: 100mm macro on a slider, extremely shallow depth of
field, slow lateral drift. 0–3s: fingers seat the steel shackle around the rods, brushed-metal
texture and dust motes crisp in the floodlight; 3–5s: the shackle drives home with one deeply
satisfying electromagnetic CLUNK and the lock's LED ring blooms green, reflecting off the
container's ribbed paint; 5–8s: the hands withdraw, a thin volumetric green holographic ring
materialises around the sealed lock and pulses once, and the camera drifts back to reveal the
full container door, sealed, as the truck's marker lights come on. Clean modern commercial
grade: warm tungsten key light, deep navy shadows, brand green only in the LED, hologram and
decal, glossy product-film finish, subtle film grain. Audio: depot night ambience with distant
generators and crickets, close leather-glove foley, one deep resonant metallic clunk, a soft
electronic confirmation chirp, low warm synth pulse beginning, no dialogue.
End frame: the sealed lock centred, green ring glowing, night around it — match for the next clip.
```

**Negative / avoid:** any readable text or engraving beyond what @seal itself shows, brand
stickers, padlock or chain clichés, a redesigned lock that loses resemblance to @seal, sparks,
rust on the lock, daylight, extra hands, six-fingered hands, US license plates.

### Clip 2 — the tamper and the alert (0–8s)

```text
Same Kampala depot night, same rust-red container on the white green-decal truck, now parked in a
dark corner of the yard: a hooded figure seen only from behind grips the @seal electronic lock on
the door rods and yanks it twice. Camera: handheld 35mm, tense slow push-in from low angle.
0–2s: the yank — the lock holds absolutely rigid and its LED ring snaps from green to pulsing red,
a red holographic ring flaring around it; 2–4s: whip-pan transition blurring the navy night into a
warm modern control room in Kampala, night shift: a Ugandan operator at a curved desk of glowing
monitors showing an abstract dark map with green pins, one pin flashing red; 4–6s: her phone on
the desk buzzes and lights up with an abstract red alert glow, she picks it up, calm and quick,
eyes on the wall map; 6–8s: back at the yard in one cut, headlights sweep across the container,
the hooded figure is gone, and the lock's ring settles from red back to steady green. Clean modern
commercial grade: deep navy-blue night, warm golden interior key in the control room, brand green
and alert red as the only saturated colours, lifted blacks, subtle film grain, thriller pacing.
Audio: two blunt metallic thuds as the lock is yanked, a rising urgent triple-chirp alarm, phone
vibration buzz on the desk, low tense percussion, distant dog bark in the yard, no dialogue.
End frame: the lock steady green in darkness — the calm before the next clip's dawn.
```

**Negative / avoid:** readable text on any monitor or phone screen, visible faces on the
intruder, bolt cutters, violence, broken lock, a lock that deviates from @seal, alarms with
sirens and flashing beacons,
American police, daylight leaks, gibberish UI labels.

### Clip 3 — the rightful opening (0–8s)

```text
Dawn at an inland bonded warehouse on an East African trade corridor: the same white cab-over
truck with the curved green cab decal and rust-red container is parked at the inspection bay,
first golden light raking across stacked containers, a soft mist. Camera: 50mm on a slow arc
around the container doors. 0–3s: a Ugandan customs officer in a crisp uniform and hi-vis vest
steps up and presents a small black electronic key fob to the @seal lock; a thin volumetric
green holographic ring draws itself around the unchanged @seal device, then a second wider ring sweeps the ground around
the truck like a geofence confirming the place; 3–5s: the LED ring flashes green and the shackle
releases with the same deep satisfying clunk, the lock coming away in the officer's hand; 5–8s:
the container doors swing open to reveal neatly stacked cargo cartons, intact, golden light
flooding in, the officer giving a small approving nod as the camera pulls back past the open
doors. Clean modern commercial grade: warm golden-hour key light, deep navy shadows, brand green
only in decal, hologram and LED, glossy product-film finish, subtle film grain. Audio: dawn
birdsong and distant yard forklifts, one soft key-fob chirp answered by a confirmation chime, the
deep clunk of release, container door hinges groaning open, the warm synth pulse resolving to a
bright final chord, no dialogue.
End frame: open doors, intact cargo glowing gold — hold for the end-card in post.
```

**Negative / avoid:** readable text, documents or stamps, garbled uniform insignia, damaged or
spilled cargo, a lock that deviates from @seal, left-hand-drive cab, forklifts crossing frame,
rain, harsh midday sun.

**End-card in post:** "Right place. Right key. Right time." + wordmark.

---

## Video 3 — "The Second Set of Eyes" (Driver safety · AI dash cam)

**Story.** A long night becomes a safe morning: an AI dash cam catches a bus driver's micro-sleep
on the Kampala–Jinja road before it becomes an incident, and the fleet gets home. The film sells
the 70% fewer-accidents stat (added in post) with one human moment — the chime that wakes you is
the product.

**Placement.** `/products/driver-safety-dash-cameras` hero, the homepage "safety" hover card,
and a vertical social cut (Clip 1 alone works as a 8-second reel with sound on).

### Clip 1 — the catch (0–8s)

```text
Interior of a Ugandan intercity coach cab at first light on the Kampala–Jinja highway,
right-hand drive, driving on the left: a middle-aged Ugandan driver in a neat company shirt at
the wheel, a small black AI dash camera mounted at the top of the windscreen facing him, its tiny
lens catching the light; through the windscreen, morning mist, red murram shoulders, boda bodas
and a matatu ahead. Camera: 35mm from the dashboard's far corner, intimate over-dash angle,
subtle handheld breathing. 0–3s: the driver's blinks grow heavy, his head dips a few degrees, the
cab swaying gently; 3–4s: the dash camera's small LED flicks to green and it gives a firm double
chime, a thin volumetric green holographic bracket flashing briefly around the driver's face
height; 4–8s: he snaps upright, exhales, rolls his shoulders, corrects half a metre of drift with
an easy steering input and settles, eyes clear now, the morning sun breaking through the mist
ahead. Clean modern commercial grade: warm golden dawn key through the windscreen, deep navy
shadows inside the cab, brand green only in the camera LED and hologram, lifted blacks, subtle
film grain. Audio: bus engine drone, tyre hum, the crisp double chime, the driver's sharp intake
of breath, faint radio afrobeat under everything, no dialogue.
End frame: driver alert, road ahead sunlit — match the road view for the next clip.
```

**Negative / avoid:** on-screen text or camera-UI overlays, crash, swerve into traffic,
left-hand-drive cab, right-hand traffic, American school bus or yellow bus, phone in the
driver's hand, six-fingered hands, warped faces.

### Clip 2 — the one-shot orbit (0–8s)

```text
Exterior FPV-drone-style one-shot: a full-size Ugandan intercity coach in clean white with a
sweeping curved green decal along its side, right-hand drive, threading a busy Kampala
roundabout in golden morning light among matatus, boda bodas and a white container truck (the
@seal lock on its rear doors), palm
and jacaranda trees around the junction. Camera: 24mm FPV drone in one continuous fluid move —
0–3s: low chase behind the coach's rear wheels, then a fast climbing arc up its flank; 3–6s: as
the camera orbits the coach, thin volumetric green holographic brackets materialise in world
space, briefly tracking each nearby boda boda and matatu and releasing them as they pass, like
the vehicle reading the road; 6–8s: the drone crests above the windscreen and dives ahead of the
bus down the exit road, the brackets dissolving, open sunlit tarmac ahead. Clean modern
commercial grade: warm golden key light, deep navy shadows, brand green only in the decal and
holograms, crisp confident motion, lifted blacks, subtle film grain. Audio: whooshing drone
flybys, layered engine and boda-boda buzz, soft UI ticks as each bracket locks and releases, an
afrobeat-driven score lifting, no dialogue.
End frame: the open road ahead of the bus in morning sun — match its warmth into the next clip's
timelapse.
```

**Negative / avoid:** readable text, route boards or number plates in close-up, collisions or
near-misses, drone shadow in frame, left-hand traffic driving on the right, US city
architecture, fisheye distortion at frame edges.

### Clip 3 — the fleet comes home (0–8s)

```text
A Kampala bus depot from a fixed high wide angle, 35mm: a day compressed into seconds. 0–4s:
day-to-night timelapse — clouds streak over the city skyline, white coaches with green side
decals stream out and return, shadows wheeling, the golden afternoon sliding into deep navy dusk
as depot floodlights bloom warm; 4–6s: the timelapse eases to real time and the camera cranes
gently down toward the parked fleet, every coach nosed in cleanly, engines ticking as they cool,
a thin green holographic pulse skimming across the row like a heartbeat; 6–8s: in the foreground
a Ugandan fleet manager with a tablet under her arm exchanges a warm fist-bump with the driver
from the morning as he steps down from his cab, both silhouetted against the floodlights. Clean
modern commercial grade: warm golden practicals against deep navy night, brand green only in the
decals and the pulse, lifted blacks, subtle film grain, quiet and warm after the day's motion.
Audio: the timelapse carried by a rising afrobeat groove that softens to warm pads, cooling-engine
ticks, a low murmur of the depot, the soft thump of the fist-bump, no dialogue.
End frame: the still, safe fleet under floodlights — hold for the stat card in post.
```

**Negative / avoid:** readable text on the tablet or signage, faces distorting through the
timelapse, rain, crowds, US yellow buses, harsh flicker, ghosting artefacts on people.

**Stat card in post:** "70% fewer accidents with instant alerts" + wordmark.

---

## Video 4 — "Twenty Thousand Heartbeats" (One platform · homepage hero loop)

**Story.** Kampala wakes up and, one green pulse at a time, the whole moving city comes online —
a tracker under a dash, a fuel sensor in a tank, a dash cam, an e-lock — until twenty thousand
heartbeats resolve into one calm map. Built to autoplay muted and loop seamlessly under the hero
headline "safety, productivity, profitability".

**Placement.** The homepage hero (`Hero.tsx` / `/videos/hero.mp4` replacement). Muted-first: every
beat reads without sound; the audio mix is for the social cut.

### Clip 1 — the city wakes, the devices wake (0–8s)

```text
Kampala at dawn from a rooftop wide, 35mm, the seven hills silhouetted navy against a warming
golden sky, marabou storks crossing frame: the city starting to move — matatus pulling out of a
stage, boda bodas weaving onto Jinja Road, a white cab-over container truck with a curved green
cab decal, the @seal lock on its container doors, easing out of a depot gate. Camera: slow confident push-in over the waking street.
0–3s: the wide holds as headlights and market lights blink on; 3–5s: match-cut to a macro insert
under a truck dashboard, 100mm: a compact black GPS tracker clipped into its harness — the
same device family as the @seal reference image, same casing finish and LED design — its LED
blinking to life in brand green, wiring and brushed plastic crisp in shallow focus; 5–8s: cut back to the widening street at ground level as, one by one, a thin
volumetric green pulse blooms briefly over each moving vehicle — matatu, boda, truck — like
heartbeats appearing, the pulses drifting upward. Clean modern commercial grade: warm golden dawn
key, deep navy shadows, brand green only in the decal, LED and pulses, lifted blacks, subtle film
grain. Audio: dawn city ambience — first engines, a distant muezzin and birdsong, market voices
far off — a single soft chirp as the LED wakes, a warm afrobeat-tinged pulse beginning, no
dialogue. End frame: the street alive with drifting green pulses — carry the pulse motif into the
next clip.
```

**Negative / avoid:** on-screen text, readable signage close-ups, skylines that look American
or Middle Eastern, left-hand-drive vehicles, right-hand traffic, drone strobe lights,
crowded-slum clichés, smog haze.

### Clip 2 — the match-cut chain (0–8s)

```text
A seamless match-cut chain through the hardware, each cut wiped by the same green pulse, macro
100mm throughout, shallow depth of field, the Smartwatch grade held constant: warm golden key,
deep navy shadows, brand green only in LEDs and pulses. 0–2s: inside a diesel tank's mouth, a
slim wireless fuel-level sensor gleams as fuel sloshes gold around it — a green pulse blooms and
wipes the frame; 2–4s: revealed by the wipe, a small black AI dash cam on a windscreen, morning
traffic reflected in its lens, its LED winking green — pulse, wipe; 4–6s: the wipe reveals the
@seal electronic cargo lock — matching the @seal reference image — clamped on a rust-red
container's door rods, its LED sweeping to green as a holographic ring seats around the
unchanged device — pulse, wipe; 6–8s: the final wipe scale-jumps to an
aerial dusk view over an East African highway where the white green-decal container truck rolls
among traffic, and every vehicle below now carries a soft green pulse, dozens of heartbeats on
the darkening road. Audio: fuel slosh, a camera-shutter-soft tick, the lock's deep clunk, then
wind and distant traffic — each wipe marked by the same soft chirp rising in pitch, the afrobeat
pulse building, no dialogue. End frame: the aerial of pulsing vehicles at dusk — match its
altitude and warmth to open the next clip.
```

**Negative / avoid:** readable text or numerals on any device, brand stickers, devices that
deviate from the @seal reference, disassembled electronics, sparks or fluids splashing the
camera, jump cuts that break the wipe motif,
fisheye edges, US freeway signage.

### Clip 3 — one calm map, then dawn again (0–8s)

```text
Seamless continuation from a dusk aerial over an East African highway where every vehicle carries
a soft green pulse: the camera climbs, 24mm, smooth and unhurried. 0–3s: as it rises, the
landscape deepens into a stylised navy-blue satellite map, roads becoming thin glowing green
route lines, each pulsing vehicle condensing into a bright green pin until the whole region
breathes with pins from lakeshore to coast; 3–6s: the camera glides laterally across this calm
constellation — pins gliding, routes glowing, a faint golden haze on the map's horizon — with
one wide navy holographic panel materialising at a slight angle in world space, its surface
abstract and unlabelled, charts implied as soft green shapes; 6–8s: the map's horizon brightens,
golden light spilling over its edge exactly like the dawn of the film's first frame, pins
dissolving into the glow as the camera settles level. Style: premium motion-graphics realism,
deep navy world, brand-green routes, pins and panel glow, golden horizon, no text anywhere.
Audio: city fades to a warm ambient wash, soft sonar pings thinning out, the afrobeat pulse
resolving to a single sustained warm chord that can loop, no dialogue. End frame: golden light
over a navy horizon, matched in colour and brightness to Clip 1's dawn sky so the video loops
seamlessly back to its first frame.
```

**Negative / avoid:** readable text, numbers or labels on the map or panel, national borders,
spinning globe, Google-Maps chrome, red pins, lens flares streaking, abrupt fade to black
(the loop needs the golden horizon, not black).

**Post notes for the hero.** Dress the Clip 3 panel with the real Smart FM dashboard in
compositing if wanted, or leave it abstract; set the loop point at the matched golden frames;
export a poster frame from Clip 1's wide for `hero-poster.webp`. The headline, wordmark and
stats stay HTML on top of the video, as the hero already does.

---

## Production checklist

- [ ] Generate 3–4 takes per clip; pick for continuity of the truck livery, the @seal device and
      grade before anything else — a beautiful take that breaks the white-truck/green-swoosh
      anchor is a reject.
- [ ] Compare every take's seal against the `@seal` ingredient image: same shape, proportions
      and finish. Animation over it is fine; a redesigned device is a reject.
- [ ] Use Flow's extend / frame-match from each clip's stated end frame into the next clip.
- [ ] Check every take for: steering wheel on the right, traffic on the left, no readable text,
      no invented logos, hands with five fingers.
- [ ] All type, UI, logos, stats and end-cards in post (After Effects), using the site tokens:
      green #4a8f42 (white type on it; deeper shades #3c7536/#33622d only for inner stages), navy #1b2845, Century
      Gothic/Questrial for display type.
- [ ] Hero deliverable: muted, looped, ≤ 24s, H.264 + WebM, with a matching poster frame.
- [ ] Social deliverables: sound-on 16:9 and a 9:16 recrop (the macro clips and Clip 1 of
      Video 3 survive vertical framing best).
