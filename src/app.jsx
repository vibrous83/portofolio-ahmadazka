import Header from "./Portofolio/components/Header";
import About from "./Portofolio/components/About";
import Experience from "./Portofolio/components/Experience";
import Projects from "./Portofolio/components/Projects";
import Certificates from "./Portofolio/components/Certificates";
import Contacts from "./Portofolio/components/Contacts";

import { Component } from "react";
import ReactGA from "react-ga4";
import $ from "jquery";

class App extends Component{
   constructor(props) {
    super(props) ;
    this.state = {
        foo: "bar",
        resumeData: {}
    };

    ReactGA.initialize("G-WL0EK1N3SV");
    ReactGA.send({
        hitType: "pageview",
        page: window.location.pathname
    });
    
    }

    getResumeData(){
        $.ajax({
            url:"./resumeData.json",
            dataType: "json",
            cache: false,
            success: function(data) {
                this.setState({
                resumeData : data
                });
            }.bind(this),
            error: function(xhr, status, err){
                console.log(err);
                alert(err);
            }
        })
    }

    componentDidMount(){
        this.getResumeData();
    }

    render(){
        return(
            <div className="App">
                <Header data={this.state.resumeData.main} />
                <About data={this.state.resumeData.about} />
                <Experience data={this.state.resumeData.experience} />
                <Projects data={this.state.resumeData.projects} />
                <Certificates data={this.state.resumeData.certificates} />
                <Contacts data={this.state.resumeData.contacts} />
            </div>
        )
    }

}

export default App;