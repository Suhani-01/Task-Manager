const ActiveComponent = ({userData,setActivePage,comp}) => {
  const Component=comp;
  return <Component userData={userData} setActivePage={setActivePage}/>
}

export default ActiveComponent
