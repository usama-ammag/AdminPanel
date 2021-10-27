import React from "react";
import { SendHttpRequest } from "./utility";
import {
  BaseUrl,
  AuthenticationTokenId,
  ImageBaseUrl,
  BaseUrlGet,
} from "../Constants/BusinessManager";
import swal from "sweetalert";
import { Calendar, CheckSquare, Edit, Eye } from "react-feather";
import Modal from "react-bootstrap/Modal";
import { Button } from "react-bootstrap";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import { setIsLoaderActive } from "../actions/index";
// import {Loader} from './Loader'
import Loader from "../component/shared/loader";
import { getToken } from "../Utils/Utils";
const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    setIsLoaderActive: bindActionCreators(setIsLoaderActive, dispatch),
  };
};
class RecentTransaction extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: null,
      ImageModal: false,
      imageUrl: "",
      gridView: true,
      tableData: [],
      tableHead: ["Inv #", "Amount", "Detail", "Date"],
      descriptionModel: false,
      periodModal: false,
      AccountDetail: {},
      // DOB: new Date(),
      // kycVerified: true,
      calender: {
        showFromDate: "",
        showToDate: "",
      },
      Rate: 0,
      SelectedProject: null,
      CurrencyName: "",
    };
    this.UpdateStatus.bind(this);
    this.HandleOpen.bind(this);
  }
  async Submit(Id, Status) {
    try {
      this.props.setIsLoaderActive(true);
      var data = await SendHttpRequest(
        BaseUrl + "v1/Pool/UpdatePoolStatus",
        { ProjectId: Id, adminStatus: Status },
        "POST"
      );
      if (data.isSuccess == true) {
        swal({
          icon: "success",
          title: data.message,
        });

        this.setState({
          tableData: [
            ...this.state.tableData.filter((x) => x.id != Id),
            data.data,
          ],
        });
        this.props.setIsLoaderActive(false);
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      console.log(error);
      this.props.setIsLoaderActive(false);
      return swal({
        icon: "error",
        text: "Something went wrong, try to relogin",
      });
    }
  }
  async UpdateStatus(Id) {
    let p = this.state.tableData.find((x) => x.id == Id);
    if (!p) {
      return;
    }
    swal({
      title: "Approve or Reject?",
      text:
        "Once Approved, this project(" +
        p.projectName +
        ") will be listed to users",
      icon: "warning",
      closeOnClickOutside: false,
      buttons: {
        dismiss: {
          text: "Dismiss",
          value: false,
          visible: "dismiss",
          className: "",
          closeModal: true,
        },
        cancel: {
          text: "Reject",
          value: "Reject",
          visible: "cancel",
          className: "btn-warning",
          closeModal: true,
        },
        confirm: {
          text: "Approve",
          value: "Approve",
          visible: true,
          className: "btn-primary",
          closeModal: true,
        },
      },
      // dangerMode: true,
    }).then((isConfirm) => {
      console.log(isConfirm);
      if (isConfirm == "Approve") {
        this.Submit(Id, "Verified");
      } else if (isConfirm == "Reject") {
        this.Submit(Id, "Rejected");
      } else {
      }
    });
  }
  async componentDidMount() {
    this.props.setIsLoaderActive(true);

    try {
      let t = getToken();
      var data = await SendHttpRequest(
        BaseUrl + "v1/Pool/GetAllPoolsAdmin",
        {},
        "GET"
      );
      if (data.isSuccess == true) {
        this.setState({ tableData: [...data.data] });
        this.props.setIsLoaderActive(false);
      } else {
        throw new Error("Something went wrong, try to relogin");
      }
    } catch (error) {
      console.log(error);
      this.props.setIsLoaderActive(false);
      return swal({
        icon: "error",
        text: "Something went wrong, try to relogin",
      });
    }
  }
  HandleOpen(Id) {
    let p = this.state.tableData.find((x) => x.id == Id);
    // if (!p) {

    const createdAtDate = new Date(p?.createdAt);
    const createdAtYear = new Intl.DateTimeFormat("en", {
      year: "numeric",
    }).format(createdAtDate);
    const createdAtMonth = new Intl.DateTimeFormat("en", {
      month: "numeric",
    }).format(createdAtDate);
    const createdAtDay = new Intl.DateTimeFormat("en", {
      day: "2-digit",
    }).format(createdAtDate);
    const createdAtConvertedDate = `${createdAtYear}-${createdAtMonth}-${createdAtDay}`;

    //expected project date
    const expectedDate = new Date(p?.createdAt);
    const expectedYear = new Intl.DateTimeFormat("en", {
      year: "numeric",
    }).format(expectedDate);
    const expectedMonth = new Intl.DateTimeFormat("en", {
      month: "numeric",
    }).format(expectedDate);
    const expectedDay = new Intl.DateTimeFormat("en", {
      day: "2-digit",
    }).format(expectedDate);
    const expectedProjectDate = `${expectedYear}-${expectedMonth}-${expectedDay}`;

    // console.log(liveProjectDate);
    // setLiveDate(liveProjectDate)
    const poolModified = {
      ...p,
      createdAt: createdAtConvertedDate,
      expectedLaunchDate: expectedProjectDate,
    };
    //   return;
    // }
    this.setState({ SelectedProject: poolModified, ImageModal: true });
  }
  render() {
    return (
      <div>
        <div className="row">
          <div className="col-lg-12 col-md-12 col-xl-12 col-12 order-2 order-lg-2 order-xl-1">
            <div className="card">
              <Modal
                centered
                size="lg"
                show={this.state.ImageModal}
                scrollable
                // onHide={handleClose}
              >
                <Modal.Header className="justify-content-center">
                  <Button
                    variant="warning"
                    onClick={() => {
                      this.setState({ ImageModal: false });
                    }}
                  >
                    Close
                  </Button>
                  {/* <Button variant="primary">Understood</Button> */}
                </Modal.Header>
                <Modal.Body>
                  <div
                    className="container "
                    style={{ fontSize: 16, color: "white" }}
                  >
                    <div className="row">
                      <div className="col-4 text-center">Icon</div>
                      <div
                        className="col"
                        style={{ overflow: "auto", overflowWrap: "break-word" }}
                      >
                        {" "}
                        {this.state.SelectedProject &&
                          this.state.SelectedProject.imageFile && (
                            <img
                              style={{
                                width: "auto",
                                maxWidth: "400",
                                height: "auto",
                              }}
                              src={
                                BaseUrlGet +
                                this.state.SelectedProject?.imageFile
                              }
                            />
                          )}
                      </div>
                    </div>
                    <hr className="mt-2 mb-2" />
                    <div className="row">
                      <div className="col-4 text-center">Full Name</div>
                      <div
                        className="col"
                        style={{ overflow: "auto", overflowWrap: "break-word" }}
                      >
                        {this.state.SelectedProject?.fullName}
                      </div>
                    </div>
                    <hr className="mt-2 mb-2" />
                    <div className="row">
                      <div className="col-4 text-center">Title</div>
                      <div
                        className="col"
                        style={{ overflow: "auto", overflowWrap: "break-word" }}
                      >
                        {this.state.SelectedProject?.title}
                      </div>
                    </div>
                    <hr className="mt-2 mb-2" />
                    <div className="row">
                      <div className="col-4 text-center">Telegram</div>
                      <div
                        className="col"
                        style={{ overflow: "auto", overflowWrap: "break-word" }}
                      >
                        {this.state.SelectedProject?.telegram}
                      </div>
                    </div>
                    <hr className="mt-2 mb-2" />
                    <div className="row">
                      <div className="col-4 text-center">Email</div>
                      <div
                        className="col"
                        style={{ overflow: "auto", overflowWrap: "break-word" }}
                      >
                        {this.state.SelectedProject?.email}
                      </div>
                    </div>
                    <hr className="mt-2 mb-2" />
                    <div className="row">
                      <div className="col-4 text-center">Project Name</div>
                      <div
                        className="col"
                        style={{ overflow: "auto", overflowWrap: "break-word" }}
                      >
                        {this.state.SelectedProject?.projectName}
                      </div>
                    </div>
                    <hr className="mt-2 mb-2" />
                    <div className="row">
                      <div className="col-4 text-center">Website Url</div>
                      <div
                        className="col"
                        style={{ overflow: "auto", overflowWrap: "break-word" }}
                      >
                        {this.state.SelectedProject?.websiteURL}
                      </div>
                    </div>
                    <hr className="mt-2 mb-2" />
                    <div className="row">
                      <div className="col-4 text-center">Whitepaper URL</div>
                      <div
                        className="col"
                        style={{ overflow: "auto", overflowWrap: "break-word" }}
                      >
                        {this.state.SelectedProject?.whitepaperURL}
                      </div>
                    </div>
                    <hr className="mt-2 mb-2" />
                    <div className="row">
                      <div className="col-4 text-center">Link to Deck</div>
                      <div
                        className="col"
                        style={{ overflow: "auto", overflowWrap: "break-word" }}
                      >
                        {this.state.SelectedProject?.linktoDeck}
                      </div>
                    </div>
                    <hr className="mt-2 mb-2" />
                    <div className="row">
                      <div className="col-4 text-center">Project Twitter</div>
                      <div
                        className="col"
                        style={{ overflow: "auto", overflowWrap: "break-word" }}
                      >
                        {this.state.SelectedProject?.projectTwitter}
                      </div>
                    </div>
                    <hr className="mt-2 mb-2" />
                    <div className="row">
                      <div className="col-4 text-center">Project Telegram</div>
                      <div
                        className="col"
                        style={{ overflow: "auto", overflowWrap: "break-word" }}
                      >
                        {this.state.SelectedProject?.projectTelegram}
                      </div>
                    </div>
                    <hr className="mt-2 mb-2" />
                    <div className="row">
                      <div className="col-4 text-center">Project Github</div>
                      <div
                        className="col"
                        style={{ overflow: "auto", overflowWrap: "break-word" }}
                      >
                        {this.state.SelectedProject?.projectGithub}
                      </div>
                    </div>
                    <hr className="mt-2 mb-2" />
                    <div className="row">
                      <div className="col-4 text-center">
                        Project Description
                      </div>
                      <div
                        className="col"
                        style={{ overflow: "auto", overflowWrap: "break-word" }}
                      >
                        {this.state.SelectedProject?.projectDescription}
                      </div>
                    </div>
                    <hr className="mt-2 mb-2" />
                    <div className="row">
                      <div className="col-4 text-center">Token Information</div>
                      <div
                        className="col"
                        style={{ overflow: "auto", overflowWrap: "break-word" }}
                      >
                        {this.state.SelectedProject?.tokenInformation}
                      </div>
                    </div>
                    <hr className="mt-2 mb-2" />
                    <div className="row">
                      <div className="col-4 text-center">
                        Product Development State
                      </div>
                      <div
                        className="col"
                        style={{ overflow: "auto", overflowWrap: "break-word" }}
                      >
                        {this.state.SelectedProject?.productDevelopmentState}
                      </div>
                    </div>
                    <hr className="mt-2 mb-2" />
                    <div className="row">
                      <div className="col-4 text-center">
                        Development Roadmap
                      </div>
                      <div
                        className="col"
                        style={{ overflow: "auto", overflowWrap: "break-word" }}
                      >
                        {this.state.SelectedProject?.developmentRoadmap}
                      </div>
                    </div>
                    <hr className="mt-2 mb-2" />
                    <div className="row">
                      <div className="col-4 text-center">
                        Unique Value Proposition
                      </div>
                      <div
                        className="col"
                        style={{ overflow: "auto", overflowWrap: "break-word" }}
                      >
                        {this.state.SelectedProject?.uniqueValueProposition}
                      </div>
                    </div>
                    <hr className="mt-2 mb-2" />
                    <div className="row">
                      <div className="col-4 text-center">
                        Cardono Contribution
                      </div>
                      <div
                        className="col"
                        style={{ overflow: "auto", overflowWrap: "break-word" }}
                      >
                        {this.state.SelectedProject?.cardonoContribution}
                      </div>
                    </div>
                    <hr className="mt-2 mb-2" />
                    <div className="row">
                      <div className="col-4 text-center">
                        ProjectFinancingStructure
                      </div>
                      <div
                        className="col"
                        style={{ overflow: "auto", overflowWrap: "break-word" }}
                      >
                        {this.state.SelectedProject?.projectFinancingStructure}
                      </div>
                    </div>
                    <hr className="mt-2 mb-2" />
                    <div className="row">
                      <div className="col-4 text-center">BlockChain Name</div>
                      <div
                        className="col"
                        style={{ overflow: "auto", overflowWrap: "break-word" }}
                      >
                        {this.state.SelectedProject?.blockChainName}
                      </div>
                    </div>
                    <hr className="mt-2 mb-2" />
                    <div className="row">
                      <div className="col-4 text-center">ContractAddress</div>
                      <div
                        className="col"
                        style={{ overflow: "auto", overflowWrap: "break-word" }}
                      >
                        {this.state.SelectedProject?.contractAddress}
                      </div>
                    </div>
                    <hr className="mt-2 mb-2" />
                    <div className="row">
                      <div className="col-4 text-center">Short Description</div>
                      <div
                        className="col"
                        style={{ overflow: "auto", overflowWrap: "break-word" }}
                      >
                        {this.state.SelectedProject?.shortDescription}
                      </div>
                    </div>
                    <hr className="mt-2 mb-2" />
                    <div className="row">
                      <div className="col-4 text-center">
                        Raise Target (usd)
                      </div>
                      <div
                        className="col"
                        style={{ overflow: "auto", overflowWrap: "break-word" }}
                      >
                        {this.state.SelectedProject?.raiseTarget}
                      </div>
                    </div>
                    <hr className="mt-2 mb-2" />
                    <div className="row">
                      <div className="col-4 text-center">
                        Expected Launch Date
                      </div>
                      <div
                        className="col"
                        style={{ overflow: "auto", overflowWrap: "break-word" }}
                      >
                        {this.state.SelectedProject?.expectedLaunchDate}
                      </div>
                    </div>
                    <hr className="mt-2 mb-2" />
                    <div className="row">
                      <div className="col-4 text-center">Listing Status</div>
                      <div
                        className="col"
                        style={{ overflow: "auto", overflowWrap: "break-word" }}
                      >
                        {this.state.SelectedProject?.adminStatus}
                      </div>
                    </div>
                    <hr className="mt-2 mb-2" />
                    <div className="row">
                      <div className="col-4 text-center">
                        Supply Amount (usd)
                      </div>
                      <div
                        className="col"
                        style={{ overflow: "auto", overflowWrap: "break-word" }}
                      >
                        {this.state.SelectedProject?.supplyAmount}
                      </div>
                    </div>
                    <hr className="mt-2 mb-2" />
                    <div className="row">
                      <div className="col-4 text-center">Token Rate (usd)</div>
                      <div
                        className="col"
                        style={{ overflow: "auto", overflowWrap: "break-word" }}
                      >
                        {this.state.SelectedProject?.tokenRate}
                      </div>
                    </div>
                    <hr className="mt-2 mb-2" />
                    <div className="row">
                      <div className="col-4 text-center">
                        Supply TransactionHash
                      </div>
                      <div
                        className="col"
                        style={{ overflow: "auto", overflowWrap: "break-word" }}
                      >
                        {this.state.SelectedProject?.supplyTransactionHash}
                      </div>
                    </div>
                    <hr className="mt-2 mb-2" />
                    <div className="row">
                      <div className="col-4 text-center">
                        Supply Transaction Status
                      </div>
                      <div
                        className="col"
                        style={{ overflow: "auto", overflowWrap: "break-word" }}
                      >
                        {this.state.SelectedProject?.supplyTransactionStatus}
                      </div>
                    </div>
                    <hr className="mt-2 mb-2" />
                    <div className="row">
                      <div className="col-4 text-center">Remaining Supply</div>
                      <div
                        className="col"
                        style={{ overflow: "auto", overflowWrap: "break-word" }}
                      >
                        {this.state.SelectedProject?.remainingSupply}
                      </div>
                    </div>
                    <hr className="mt-2 mb-2" />
                    <div className="row">
                      <div className="col-4 text-center">
                        Pending Supply deposit
                      </div>
                      <div
                        className="col"
                        style={{ overflow: "auto", overflowWrap: "break-word" }}
                      >
                        {this.state.SelectedProject?.pendingSupply}
                      </div>
                    </div>
                    <hr className="mt-2 mb-2" />
                    <div className="row">
                      <div className="col-4 text-center">
                        Confirmed Supply deposited
                      </div>
                      <div
                        className="col"
                        style={{ overflow: "auto", overflowWrap: "break-word" }}
                      >
                        {this.state.SelectedProject?.confirmedSupply}
                      </div>
                    </div>
                    <hr className="mt-2 mb-2" />
                    <div className="row">
                      <div className="col-4 text-center">Created At</div>
                      <div
                        className="col"
                        style={{ overflow: "auto", overflowWrap: "break-word" }}
                      >
                        {this.state.SelectedProject?.createdAt}
                      </div>
                    </div>
                    <hr className="mt-2 mb-2" />
                  </div>
                </Modal.Body>
              </Modal>
              )
              {this.state.tableData.length > 0 ? (
                <div style={{ padding: 10 }}>
                  <table
                    className="table table-striped table-responsive-sm table-responsive-md table-responsive-lg table-responsive-xl AccountStatement"
                    style={{ textAlign: "center" }}
                  >
                    <thead>
                      <tr style={{ color: "#fff" }}>
                        <th>Icon</th>
                        <th>Pool name</th>
                        <th>Blockchain name</th>
                        <th>Token Rate(USD)</th>
                        <th>Total Supply(USD)</th>
                        <th>Total Supply</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody style={{ color: "#fff" }}>
                      {this.state.tableData &&
                        this.state.tableData.length > 0 &&
                        this.state.tableData
                          .sort((a, b) => b.id - a.id)
                          .map((value, index) => {
                            return (
                              <tr key={index}>
                                <td>
                                  <img
                                    style={{ width: "30px" }}
                                    src={BaseUrlGet + value.imageFile}
                                  />
                                </td>
                                <td>{value.projectName}</td>
                                <td>{value.blockChainName}</td>
                                <td>{value.tokenRate}</td>
                                <td>{value.supplyAmount}</td>
                                <td>
                                  {!value.tokenRate || value.tokenRate == 0
                                    ? 0
                                    : value.supplyAmount / value.tokenRate}
                                </td>
                                <td>{value.adminStatus}</td>
                                <td>
                                  <Eye
                                    onClick={() => {
                                      this.HandleOpen(value.id);
                                    }}
                                    color="white"
                                    size={16}
                                  />
                                  <Edit
                                    onClick={() => {
                                      this.UpdateStatus(value.id);
                                    }}
                                    className="ml-2"
                                    color="white"
                                    size={16}
                                  />
                                </td>
                              </tr>
                            );
                          })}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div style={{ alignItems: "center", alignContent: "center" }}>
                  <p
                    style={{
                      textAlign: "center",
                      color: "white",
                      fontSize: 20,
                    }}
                  >
                    No Projects
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const styles = {
  container: {
    flex: 1,
  },
  convertButton: {
    backgroundColor: "#000",
    borderWidth: 1,
    borderColor: "#000",
    color: "#fff",
    paddingHorizontal: 80,
    paddingVertical: 10,
    overflow: "hidden",
    borderRadius: 5,
  },
  card: {
    marginBottom: 20,
    height: 250,
    padding: 5,
    backgroundColor: "#323C4D",
    flexDirection: "column",
    color: "white",
  },
  font: {
    fontSize: 18,
    color: "white",
    padding: 5,
  },
  font2: {
    fontSize: 15,
    color: "white",
    padding: 5,
  },
  searchTextInput: {
    borderWidth: 5,
    backgroundColor: "#fff",
    borderColor: "#fff",
    // paddingHorizontal: 5,
    marginHorizontal: 1,
    marginVertical: 2,
    overflow: "hidden",
    alignSelf: "center",
  },
  searchButton: {
    borderWidth: 1,
    borderColor: "#000",
    backgroundColor: "#000",
    color: "#fff",
    paddingHorizontal: 15,
    paddingVertical: 10,
    textAlign: "center",
  },
  head: { backgroundColor: "#455269", paddingVertical: 10 },
  text: { marginVertical: 3, color: "#fff" },
  row: { flexDirection: "row", paddingVertical: 10 },
  btn: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginHorizontal: 5,
    backgroundColor: "#78B7BB",
    borderRadius: 2,
  },
  btnText: { textAlign: "center", color: "#fff" },
  buttonCloseModal: {
    borderWidth: 1,
    borderColor: "#fff",
    backgroundColor: "#fff",
    paddingHorizontal: 15,
    paddingVertical: 10,
    textAlign: "center",
  },
};
export default connect(mapStateToProps, mapDispatchToProps)(RecentTransaction);
