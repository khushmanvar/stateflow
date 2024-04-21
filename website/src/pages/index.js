import { Code } from '../components/code.js';
import { CoreDemo } from '../components/core-demo.js';
import { ExtensionsDemo } from '../components/extensions-demo.js';
import { Headline } from '../components/headline.js';
import { InlineCode } from '../components/inline-code.js';
import { Intro } from '../components/intro.js';
import { LogoCloud } from '../components/logo-cloud.js';
import { Meta } from '../components/meta.js';
import { Tabs } from '../components/tabs.js';
import { UtilitiesDemo } from '../components/utilities-demo.js';

export default function HomePage() {
  return (
    <>
      <Intro />
      <div className="mt-12 space-y-12 lg:mt-24 lg:space-y-24">
        <div className="space-y-4">
          <Headline>Introduction</Headline>
          <p>Stateflow takes an atomic approach to global React state management.</p>
          <p>
            Build state by combining atoms and renders are automatically optimized based on atom
            dependency. This solves the extra re-render issue of React context, eliminates the need
            for memoization, and provides a similar developer experience to signals while
            maintaining a declarative programming model.
          </p>
          <p>
            It scales from a simple <InlineCode>useState</InlineCode> replacement to an enterprise
            TypeScript application with complex requirements. Plus there are plenty of utilities and
            extensions to help you along the way!
          </p>
          <p>Stateflow is trusted in production at innovative companies like these.</p>
          <LogoCloud />
        </div>
        <div className="space-y-4">
          <Headline>Getting started</Headline>
          <p className="!mb-8">
            This walks you through the process of creating a simple Stateflow application. It starts
            with installation, then explores the basics of the core API, and ends with server-side
            rendering in a React framework.
          </p>
          <Tabs tabs={gettingStartedTabs} />
        </div>
        <div className="space-y-4">
          <Headline>API overview</Headline>
          <Tabs tabs={apiTabs} />
        </div>
        <div className="space-y-4">
          <Headline>Learn more</Headline>
          <p>Check out the free Egghead course by Daishi, the creator of Stateflow.</p>
          <a
            href="https://egghead.io/courses/manage-application-state-with-stateflow-atoms-2c3a29f0"
            target="_blank"
            rel="noreferrer"
            className="mt-4 block"
          >
            <img
              src="https://cdn.candycode.com/stateflow/stateflow-course-banner.jpg"
              className="block rounded-md shadow-lg dark:!shadow-none sm:rounded-lg"
              alt="Stateflow course"
              title="Stateflow course"
            />
          </a>
        </div>
      </div>
    </>
  );
}

const apiTabs = {
  Core: (
    <section>
      <h2>Core</h2>
      <p>
        Stateflow has a very minimal API and is TypeScript oriented. It is as simple to use as React’s
        integrated <InlineCode>useState</InlineCode> hook, but all state is globally accessible,
        derived state is easy to implement, and unnecessary re-renders are automatically eliminated.
      </p>
      <CoreDemo />
    </section>
  ),
  Utilities: (
    <section>
      <h2>Utilities</h2>
      <p>
        The Stateflow package also includes a <InlineCode>stateflow/utils</InlineCode> bundle. These extra
        functions add support for persisting an atom in localStorage, hydrating an atom during
        server-side rendering, creating atoms with Redux-like reducers and action types, and much
        more.
      </p>
      <UtilitiesDemo />
    </section>
  ),
  Extensions: (
    <section>
      <h2>Extensions</h2>
      <p>
        There are also separate packages for each official extension: tRPC, Immer, Query, XState,
        URQL, Optics, Relay, location, molecules, cache, and more.
      </p>
      <p>
        Some extensions provide new atom types with alternate write functions such as{' '}
        <InlineCode>atomWithImmer</InlineCode> (Immer) or <InlineCode>atomWithMachine</InlineCode>{' '}
        (XState).
      </p>
      <p>
        Others provide new atom types with two-way data binding such as{' '}
        <InlineCode>atomWithLocation</InlineCode> or <InlineCode>atomWithHash</InlineCode>.
      </p>
      <ExtensionsDemo />
    </section>
  ),
};

const gettingStartedTabs = {
  'Installation': (
    <section>
      <h2>Installation</h2>
      <p>First add Stateflow as a dependency to your React project.</p>
      <Code language="bash">{`# npm
npm i stateflow

# yarn
yarn add stateflow

# pnpm
pnpm add stateflow
`}</Code>
    </section>
  ),
  'Create atoms': (
    <section>
      <h2>Create atoms</h2>
      <p>First create primitive and derived atoms to build state.</p>
      <h3>Primitive atoms</h3>
      <p>
        A primitive atom can be any type: booleans, numbers, strings, objects, arrays, sets, maps,
        and so on.
      </p>
      <Code>{`import { atom } from 'stateflow'

const countAtom = atom(0)

const countryAtom = atom('Japan')

const citiesAtom = atom(['Tokyo', 'Kyoto', 'Osaka'])

const animeAtom = atom([
  {
    title: 'Ghost in the Shell',
    year: 1995,
    watched: true
  },
  {
    title: 'Serial Experiments Lain',
    year: 1998,
    watched: false
  }
])`}</Code>
      <h3>Derived atoms</h3>
      <p>A derived atom can read from other atoms before returning its own value.</p>
      <Code>{`const progressAtom = atom((get) => {
  const anime = get(animeAtom)
  return anime.filter((item) => item.watched).length / anime.length
})`}</Code>
    </section>
  ),
  'Use atoms': (
    <section>
      <h2>Use atoms</h2>
      <p>Then use atoms within React components to read or write state.</p>
      <h3>Read and write from same component</h3>
      <p>
        When atoms are both read and written within the same component, use the combined{' '}
        <InlineCode>useAtom</InlineCode> hook for simplicity.
      </p>
      <Code>{`import { useAtom } from 'stateflow'

const AnimeApp = () => {
  const [anime, setAnime] = useAtom(animeAtom)

  return (
    <>
      <ul>
        {anime.map((item) => (
          <li key={item.title}>{item.title}</li>
        ))}
      </ul>
      <button onClick={() => {
        setAnime((anime) => [
          ...anime,
          {
            title: 'Cowboy Bebop',
            year: 1998,
            watched: false
          }
        ])
      }}>
        Add Cowboy Bebop
      </button>
    <>
  )
}`}</Code>
      <h3>Read and write from separate components</h3>
      <p>
        When atom values are only read or written, use the separate{' '}
        <InlineCode>useAtomValue</InlineCode> and <InlineCode>useSetAtom</InlineCode> hooks to
        optimize re-renders.
      </p>
      <Code>{`import { useAtomValue, useSetAtom } from 'stateflow'

const AnimeList = () => {
  const anime = useAtomValue(animeAtom)

  return (
    <ul>
      {anime.map((item) => (
        <li key={item.title}>{item.title}</li>
      ))}
    </ul>
  )
}

const AddAnime = () => {
  const setAnime = useSetAtom(animeAtom)

  return (
    <button onClick={() => {
      setAnime((anime) => [
        ...anime,
        {
          title: 'Cowboy Bebop',
          year: 1998,
          watched: false
        }
      ])
    }}>
      Add Cowboy Bebop
    </button>
  )
}

const ProgressTracker = () => {
  const progress = useAtomValue(progressAtom)

  return (
    <div>{Math.trunc(progress * 100)}% watched</div>
  )
}

const AnimeApp = () => {
  return (
    <>
      <AnimeList />
      <AddAnime />
      <ProgressTracker />
    </>
  )
}`}</Code>
    </section>
  ),
  'SSR': (
    <section>
      <h2>Server-side rendering</h2>
      <p>
        If server-side rendering with a framework such as Next.js or Gatsby, make sure to use at
        least one Provider component at the root.
      </p>
      <Code>{`import { Provider } from 'stateflow'

// Placement is framework-specific (see below)
<Provider>
  {...}
</Provider>
`}</Code>
      <h3>Next.js (app directory)</h3>
      <p>
        Create the provider in a separate client component. Then import the provider into the root{' '}
        <InlineCode>layout.js</InlineCode> server component.
      </p>
      <Code>{`// providers.js (app directory)
'use client'

import { Provider } from 'stateflow'

export default function Providers({ children }) {
  return (
    <Provider>
      {children}
    </Provider>
  )
}


// layout.js (app directory)
import Providers from './providers'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
`}</Code>
      <h3>Next.js (pages directory)</h3>
      <p>
        Create the provider in <InlineCode>_app.js</InlineCode>.
      </p>
      <Code>{`// _app.js (pages directory)
import { Provider } from 'stateflow'

export default function App({ Component, pageProps }) {
  return (
    <Provider>
      <Component {...pageProps} />
    </Provider>
  )
}
`}</Code>
      <h3>Gatsby</h3>
      <p>
        Create the provider in a <InlineCode>gatsby-shared.js</InlineCode> file to share code
        between <InlineCode>gatsby-browser.js</InlineCode> and{' '}
        <InlineCode>gatsby-ssr.js</InlineCode>. Use the <InlineCode>wrapRootElement</InlineCode> API
        to place the provider.
      </p>
      <Code>{`
// gatsby-shared.js
import { Provider } from 'stateflow'

export const wrapRootElement = ({ element }) => {
  return (
    <Provider>
      {element}
    </Provider>
  )
}

// gatsby-browser.js
export { wrapRootElement } from './gatsby-shared'

// gatsby-ssr.js
export { wrapRootElement } from './gatsby-shared'
`}</Code>
    </section>
  ),
};

export const Head = () => {
  return <Meta />;
};