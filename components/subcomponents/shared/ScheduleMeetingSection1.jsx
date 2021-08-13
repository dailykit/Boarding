import React, { PureComponent } from "react";
export default class ScheduleMeetingSection1 extends PureComponent {
  render() {
    return (
      <div className="container" id={this.props.id} style={{marginTop:"180px"}}>
        <h2 className="nunito text-center" style={{fontWeight:"bold"}}>{this.props.heading}</h2>
        <div className="row justify-content-between schedule-meeting-box1" style={{"marginTop":"10px"}}>

      
        <div className="col-md-7 col-xs-10 nunito">
            <div className="row justify-content-center text-center">
              <div className="col-md-8 col-xs-10">
                <div
                  className="calendly-inline-widget"
                  data-url="https://calendly.com/dailykit/15min"
                  style={{ minWidth: "320px", height: "630px" }}
                >
                  <div className="lds-ring">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                  </div>
                </div>
                <small>
                  <br /> <br />
                </small>
              </div>
            </div>
          </div>
      
        
          <div className="col-md-5 col-xs-10" style={{"marginTop":"70px"}}>
            
        
                 
                    <div className="question nunito">{this.props.question1}</div>
                    <p className="answer nunito">{this.props.answer1}</p>
                    <br />
                 
            
                    <div className="question nunito">{this.props.question2}</div>
                    <p className="answer nunito">{this.props.answer2}</p>
                    <br />
          </div>
         
        </div>
      </div>
    );
  }
}
