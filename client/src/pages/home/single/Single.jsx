import './single.css';
import SideBar from '../../../components/sidebar/SideBar';
import SinglePost from '../../../components/SinglePost/SinglePost';

export default function Single() {
  return (
        <div className="single">
            <SinglePost />
            <SideBar/>
        </div>
    )
}
