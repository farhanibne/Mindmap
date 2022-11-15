import css from './header.module.css';


function Header(props) {
    return (
        <div className={css.container}>
        <div className={css.title}>  <a href='/' style={{textDecoration:'none',color:'azure'}}>Mindmap 🧭</a></div>
        </div>


 
    );
}

export default Header;
