import React, { Component, Fragment } from "react";
import "./register.css";
import Alert from "react-bootstrap/Alert";
import PopUp from "../../popup/PopUp";
import Loader from "../../Loader/Loader";
import "./register.css";
import axios from "axios";

const SERVER_BASE_URL = "http://localhost:8080";

class CreateCollege extends Component {
  constructor() {
    super();

    this.state = {
      name: "",
      pin: "",
      district: "",
      state: "",
      location: "",
      message: "",
      error: false,
      loading: false
    };
  }

  createNewCollege = async data => {
    try {
      const res = await axios.post(SERVER_BASE_URL + "/create-college", data);
      console.log(res.data);
      this.setState({
        message:
          "The collegeId is: " +
          res.data.college._id +
          "\n" +
          "College Name: " +
          res.data.college.name,
        loading: false
      });
    } catch (err) {
      this.setState({
        error: true,
        message: "something went wrong",
        loading: false
      });
    }
  };
  handleSubmit = e => {
    e.preventDefault();
    this.setState({ loading: true, error: false });

    let data = {
      name: this.state.name,
      address: {
        district: this.state.district,
        location: this.state.location,
        state: this.state.state,
        pin: parseInt(this.state.pin)
      }
    };
    this.createNewCollege(data);

    // this.props.registerUser(newUser, this.callback);
  };
  inputChange = e => {
    e.preventDefault();
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };
  handlePopUp = () => {
    if (!this.state.error) window.location = "/login";

    this.setState({ message: "" });
  };

  render() {
    return (
      <Fragment>
        <PopUp
          message={this.state.message}
          error={this.state.error}
          style={{ color: this.state.error ? "red" : "green" }}
          show={this.state.message !== ""}
          onHide={() => this.handlePopUp()}
        />
        <div className="site-section">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-md-5"></div>
              <div className="col-md-5">
                <h1 className=" mb-4" data-aos="fade-up" data-aos-delay="100">
                  Add College
                </h1>
              </div>
            </div>

            <form onSubmit={this.handleSubmit}>
              <div className="row">
                <div className="col-md-6" data-aos="fade-up">
                  <div className="row form-group">
                    <div className="col-md-12">
                      <label className="" for="name">
                        Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        onChange={this.inputChange}
                        value={this.state.name}
                        required
                        className="form-control"
                      />
                    </div>
                  </div>
                  <div className="row form-group">
                    <div className="col-md-12">
                      <label className="" for="district">
                        district
                      </label>
                      <input
                        type="text"
                        name="district"
                        id="district"
                        onChange={this.inputChange}
                        value={this.state.district}
                        required
                        className="form-control"
                      />
                    </div>
                  </div>

                  <div className="row form-group">
                    <div className="col-md-12">
                      <label className="" for="location">
                        location
                      </label>
                      <input
                        type="text"
                        name="location"
                        id="location"
                        onChange={this.inputChange}
                        value={this.state.location}
                        required
                        className="form-control"
                      />
                    </div>
                  </div>
                </div>

                <div
                  class="col-md-5 ml-auto"
                  data-aos="fade-up"
                  data-aos-delay="100"
                >
                  <div className="row form-group">
                    <div className="col-md-12">
                      <label className="" for="state">
                        State
                      </label>
                      <input
                        type="text"
                        name="state"
                        id="state"
                        onChange={this.inputChange}
                        value={this.state.state}
                        className="form-control"
                      />
                    </div>
                  </div>
                  <div className="row form-group">
                    <div className="col-md-12">
                      <label className="" for="pin">
                        Pin
                      </label>
                      <input
                        type="text"
                        name="pin"
                        id="pin"
                        onChange={this.inputChange}
                        value={this.state.pin}
                        className="form-control"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <br />
              <div
                className="row form-group"
                data-aos="fade-up"
                data-aos-delay="300"
              >
                {!this.state.loading ? (
                  <>
                    <div className="col-md-5"></div>
                    <div className="col-md-5">
                      <button type="submit" className="btn btn-custom">
                        <span>Register</span>
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="col-md-4"></div>
                    <div className="col-md-5">
                      <Loader />
                    </div>
                    <div className="col-md-3"></div>
                  </>
                )}
              </div>
            </form>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default CreateCollege;
