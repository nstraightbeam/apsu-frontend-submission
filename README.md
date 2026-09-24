# Apsu home page

A responsive implementation of the supplied Apsu design, built with Next.js App Router, React, strict TypeScript and Tailwind CSS. Includes local design assets, typed mock content, working UI interactions and Storybook states.

## Run locally


```sh
npm install
npm run dev          # http://127.0.0.1:3000
npm run storybook    # http://127.0.0.1:6006
```

```sh
npm run build
npm start
npm run typecheck
npm test
npm run build-storybook
npm run format:check
```

## Structure and API boundary

- `src/app/page.tsx` loads content at the server boundary through `getHomeContent()`.
- `src/data/contracts.ts` defines serializable treatment, product, price, image, care-layer, service, testimonial, FAQ and home-response contracts, plus a future consultation request/result.
- `src/data/home.ts` provides mocks checked with `satisfies HomeContent`. Replace `getHomeContent()` with a validated API fetch when a service exists; components already accept typed data through props.
- `src/components` contains reusable page sections and stateful controls.
- `src/lib/bmi.ts` contains the calculation and validation, independently covered by boundary tests.
- `src/components/*.stories.tsx` documents components, interaction states and full desktop/mobile pages.
- `public` holds local fonts and original design imagery. Next Image provides responsive image optimization, using the source dimensions defined in the typed image metadata.

Prices use integer minor currency units. IDs are stable identifiers rather than array positions. TypeScript contracts do not replace runtime validation of future network responses. Nothing is sent, stored or booked by this demonstration.

## Design reference and deviations

Reference: [Front-end Assignment in Figma](https://www.figma.com/design/DmTQCqCODfpqMmdsZUFCnj/Front-end-Assignment?node-id=0-1). Primary frames: desktop `1:303`, mobile `1:884`. Layout targets are 1440px and 375px, with fluid behavior from 320px through 1920px.

The following deviations are intentional:

1. Corrected “Loss Weight In Your Way” to “Lose weight in your way,” “Easy Manager Treatment” to “Easily manage treatment,” and normalized inconsistent capitalization, punctuation and unit labels.
2. Included the weight-management, product and BMI sections on mobile. The main mobile frame omits them, but separate mobile designs show them; hiding these would remove a primary service.
3. Replaced duplicated GLP-1 vial imagery in the birth-control and sleep summary cards with the corresponding supplied portraits. The semaglutide product still uses the only supplied tilted vial artwork, visibly marked “Illustrative packaging”; a correctly labeled product render remains a production asset requirement.
4. Replaced the BMI mock's prefilled score of 56 with an empty state, corrected overlapping category bands, added real unit conversion, input validation and adult category boundaries. Removed sex selection because it does not enter the adult BMI formula. The score is rounded to one decimal while categorization uses the unrounded value, stated alongside the result. BMI does not determine medication eligibility.
5. Replaced the sleep portrait's unexplained personal name and health/progress percentages with neutral support copy. These were not backed by a defined data contract or meaningful measurement.
6. Omitted social icons without supplied destinations rather than invent account URLs. Blog, login and legal controls open explicit demo information panels because those routes/services are outside the provided home-page scope.
7. Implemented a text wordmark approximation and Lucide icons where usable vector assets were unavailable. Work Sans is locally hosted; subtle font, icon and crop differences remain possible. No claim of automated pixel-diff equivalence is made.
8. Added focus rings, a skip link, accessible names, expanded-state semantics, live result/error announcements, modal focus management and reduced-motion support. Text wraps and card arrangements adapt at intermediate widths; product cards have explicit minimum-size constraints to prevent narrow-screen overflow.
9. Language chips are illustrative coverage labels, not translation controls. The consultation form offers the mocked languages; no translation backend is simulated.
10. Preserved testimonial and service claims as reference mock content. They are not verified customer evidence. The site is marked `noindex` and must undergo content/legal review before production use.

## Self-designed interactions

- Navigation and “See plans” controls scroll to their relevant sections. Mobile navigation expands in place, closes on selection or Escape, and has an accessible toggle.
- Consultation CTAs open a native modal dialog with treatment preselected when relevant. Treatment and language can be changed. Continue shows a clearly labeled demo completion state; no appointment is booked. Escape, backdrop and close controls dismiss the dialog, and native dialog behavior restores focus.
- Login opens an explanation without collecting credentials. Blog and legal buttons show scoped information dialogs.
- BMI supports metric and imperial input, clears stale results when inputs change, clears inputs when switching units, rejects implausible/non-finite values and announces results/errors.
- FAQs use a single-open accordion, with the first question open initially; all can be closed.
- Services use a native horizontal scroll-snap track with touch/trackpad scrolling, keyboard arrow support and previous/next controls disabled at the ends. No autoplay.
- Buttons have hover, pressed, keyboard-focus and disabled styles. Motion is reduced when the system requests it, including programmatic section navigation. Repeated decorative language chips are hidden from assistive technology.

## Storybook

Stories cover button variants and interaction styles; desktop/mobile navigation and open menu; metric/imperial empty BMI, invalid input and all four result categories; every FAQ answer and all-closed state; carousel start/middle/end; closed/open consultation, three treatment selections, completion, login and information dialogs; all treatment-card variants; and full home-page desktop/mobile views. The accessibility addon is enabled for interactive inspection. Dialog stories update their controls when dismissed, so close and Escape behavior can be exercised directly.

## Verification

- Production Next.js build and static Storybook build.
- Strict TypeScript check and formatting check.
- BMI tests for equivalent units, exact category cutoffs, invalid/non-finite measurements and invalid imperial inches.
- Browser checks at mobile and desktop sizes, plus intermediate breakpoint checks for page overflow.
- Manual browser interaction checks for BMI calculation/errors, FAQ state, consultation preselection/completion/dismissal, mobile navigation and carousel boundaries.

