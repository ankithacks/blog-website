import './Header.css';

export default function Header() {
  return (
    <div className="header">
        <div className="headerTitles">
            <span className='headerTitleSm'>Welcome to the</span>
            <span className='headerTitleLg'>Interaction area</span>
        </div>
        <img className='headerImage' src="https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" alt="" />
    </div>
  )
}
