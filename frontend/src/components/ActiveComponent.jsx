/**
 * Dynamic View Wrapper
 * Rendered component is determined by the 'comp' prop.
 * Useful for switching sub-views (e.g., Dashboard, Profile, Settings) 
 * without full route changes.
 */
const ActiveComponent = ({ userData, setActivePage, comp }) => {
  // Alias the 'comp' prop to a capitalized variable so React treats it as a Component
  const Component = comp;

  return <Component userData={userData} setActivePage={setActivePage} />
}

export default ActiveComponent