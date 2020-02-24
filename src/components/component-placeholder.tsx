import React from "react"

type ComponentPlaceholderProps = {
  data: any
  location: Location
  path: string
}

const ComponentPlaceholder = ({ data, location, path }: ComponentPlaceholderProps) => (
  <div>
    <h2>This is a placeholder component</h2>
    <p style={{ paddingBottom: `0.5rem` }}>To implement this component in your site, create a file at:</p>
    <code style={{ marginTop: `1rem`, padding: `0.5rem`, background: `orange`, borderRadius: `0.5rem` }}>{path}</code>
    <pre style={{ background: `#000`, color: `#fff`, borderRadius: `0.5rem`, padding: `1rem` }}>
      {JSON.stringify(data, null, 2)}
    </pre>
  </div>
)

export default ComponentPlaceholder
