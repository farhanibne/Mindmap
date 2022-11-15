import React from "react";
import repository from "../repository";
import Toolbar from "./Toolbar";
import css from "./home.module.css";
import Card from "./Card";
import router from "./router";
import { Helmet } from "react-helmet";
import dz from "./dz.png";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: repository.getList({ level: 0 }),
    };
  }

  add() {
    repository.save({
      name: "New Map",
      level: 0,
      parentId: null,
    });
    this.setState({ list: repository.getList({ level: 0 }) });
  }

  actionMenu = [
    { name: "add", onClick: () => this.add() },
    { name: "delete", onClick: () => this.delete(this.state.id) },
  ];

  setSelected(id) {
    this.setState({ id });
  }

  delete(id) {
    repository.delete(id);
    this.setState({ list: repository.getList({ level: 0 }) });
  }

  getMap(id) {
    router.setRoute("map", id);
  }



  render() {


    return (
      <>
        <Helmet>
          <meta charSet="utf-8" />
          <title>MindMap 🧭</title>
          <link rel="icon" href={dz} type="image/x-icon" />
        </Helmet>

        <Toolbar
          list={this.actionMenu}
          type="alert"
          location={["vertical", "right", "bottom"]}
        />

        {/* render the welcome page only when there is no map */}
        {this.state.list.length === 0 ? (
          <div className={css.list}>
            <div className={css.item}>
              <div
                style={{
                  width: "100%",
                  overflow: "hidden",
                  position: "relative",
                  height: "162px",
                  cursor: "pointer",
                  padding: "10px",
                  boxSizing: "border-box",
                  borderRadius: "3px",
                  boxShadow:
                    " 0 3px 6px rgba(0, 0, 0, .16), 0 3px 6px rgba(0, 0, 0, .23)",
                  transition: "all .3s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                }}
              >
                <h2 style={{ fontWeight: "700" }}>
                  Welcome on board - MindMap 🧭.
                </h2>
                <br />
                Create a new map by clicking on the button below. <br/>

                <p style={{color:'red'}}>⚠️  You have no access to create more than 12 maps. </p>
              </div>
            </div>
          </div>
        ) : (
          <>
            {this.state.list.length < 13 ? (
              <div className={css.list}>
                {this.state.list.map((item) => (
                  <div
                    className={css.item}
                    onDoubleClick={() => this.getMap(item.id)}
                    key={item.id}
                  >
                    <Card
                      id={item.id}
                      onClick={() => this.setSelected(item.id)}
                      isSelected={item.id === this.state.id}
                      name={item.name}
                      comment={item.comment}
                    />
                  </div>
                ))}
              </div>
            ) : 
          
                        (
              <div className={css.list}>
                {this.state.list.slice(0, 12).map((item) => (
                  <div
                    className={css.item}
                    onDoubleClick={() => this.getMap(item.id)}
                    key={item.id}
                  >

                    <Card
                      id={item.id}
                      onClick={() => this.setSelected(item.id)}
                      isSelected={item.id === this.state.id}
                      name={item.name}
                      comment={item.comment}
                      
                      
                    />

                    <div style={{
                      borderBottom: '2px solid #ccc',
                      borderLeft: '2px solid #ccc',
                      borderRight: '2px solid #ccc',
                      borderRadius: '0 0  5px 5px',
                      padding: '8px',
                      fontSize:'11px'
                    }}>
                     ⚠️ More than 12 is not recommended.
                    </div>



                    
                  </div>
                  
                ))}
              </div>
            
            )

            }
          </>
        )}
      </>
    );
  }
}

export default Home;
