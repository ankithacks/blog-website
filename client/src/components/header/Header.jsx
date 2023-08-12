import './Header.css';

export default function Header() {
  return (
    <div className="header">
        <div className="headerTitles">
            <span className='headerTitleSm'>React & node.js</span>
            <span className='headerTitleLg'>Blog</span>
        </div>
        <img className='headerImage' src="https://images.unsplash.com/photo-1530878955558-a6c31b9c97db?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bmljZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60" alt="" />
    </div>
  )
}
