import React, { useEffect, useState } from "react";
import { useParams } from "react-router";

const UpdatePool = () => {
  const [data, setData] = useState();
  useEffect(() => {}, []);
  const { id } = useParams();
  return (
    <div>
      <div className="form-group row">
        <div className="col-sm-6">
          <label
            htmlFor="fullName"
            className="col-form-label TEXTFIELD_FIRST"
            style={{ fontWeight: "bold", textTransform: "uppercase" }}
          >
            Full Name
          </label>
          <input
            type="text"
            name="fullName"
            className="form-control"
            placeholder="Full name"
          />
        </div>
        <div className="col-sm-6">
          <label
            htmlFor="title"
            className="col-form-label TEXTFIELD_FIRST"
            style={{ fontWeight: "bold", textTransform: "uppercase" }}
          >
            Title
          </label>
          <input
            type="text"
            name="title"
            className="form-control"
            placeholder="Title"
          />
        </div>
      </div>
      <div className="form-group row">
        <div className="col-sm-6">
          <label
            htmlFor="telegram"
            className="col-form-label TEXTFIELD_FIRST"
            style={{ fontWeight: "bold", textTransform: "uppercase" }}
          >
            Telegram
          </label>
          <input
            type="text"
            name="telegram"
            className="form-control"
            placeholder="Telegram"
          />
        </div>
        <div className="col-sm-6">
          <label
            htmlFor="email"
            className="col-form-label TEXTFIELD_FIRST"
            style={{ fontWeight: "bold", textTransform: "uppercase" }}
          >
            Email
          </label>
          <input
            type="text"
            name="email"
            className="form-control"
            placeholder="Email"
          />
        </div>
      </div>
      <div className="form-group row">
        <div className="col-sm-6">
          <label
            htmlFor="projectName"
            className="col-form-label TEXTFIELD_FIRST"
            style={{ fontWeight: "bold", textTransform: "uppercase" }}
          >
            Project Name
          </label>
          <input
            type="text"
            name="projectName"
            className="form-control"
            placeholder="Project name"
          />
        </div>
        <div className="col-sm-6">
          <label
            htmlFor="websiteUrl"
            className="col-form-label TEXTFIELD_FIRST"
            style={{ fontWeight: "bold", textTransform: "uppercase" }}
          >
            Website Url
          </label>
          <input
            type="text"
            name="websiteUrl"
            className="form-control"
            placeholder="Website Url"
          />
        </div>
      </div>
      <div className="form-group row">
        <div className="col-sm-6">
          <label
            htmlFor="whitepaperUrl"
            className="col-form-label TEXTFIELD_FIRST"
            style={{ fontWeight: "bold", textTransform: "uppercase" }}
          >
            Whitepaper Url
          </label>
          <input
            type="text"
            name="whitepaperUrl"
            className="form-control"
            placeholder="Whitepaper Url"
          />
        </div>
        <div className="col-sm-6">
          <label
            htmlFor="linkToDesk"
            className="col-form-label TEXTFIELD_FIRST"
            style={{ fontWeight: "bold", textTransform: "uppercase" }}
          >
            Link to Desk
          </label>
          <input
            type="text"
            name="linkToDesk"
            className="form-control"
            placeholder="Link to Desk"
          />
        </div>
      </div>
      <div className="form-group row">
        <div className="col-sm-6">
          <label
            htmlFor="projectTwitter"
            className="col-form-label TEXTFIELD_FIRST"
            style={{ fontWeight: "bold", textTransform: "uppercase" }}
          >
            Project Twitter
          </label>
          <input
            type="text"
            name="projectTwitter"
            className="form-control"
            placeholder="Project Twitter"
          />
        </div>
        <div className="col-sm-6">
          <label
            htmlFor="projectTelegram"
            className="col-form-label TEXTFIELD_FIRST"
            style={{ fontWeight: "bold", textTransform: "uppercase" }}
          >
            Project Telegram
          </label>
          <input
            type="text"
            name="projectTelegram"
            className="form-control"
            placeholder="Project Telegram"
          />
        </div>
      </div>
      <div className="form-group row">
        <div className="col-sm-6">
          <label
            htmlFor="projectGithub"
            className="col-form-label TEXTFIELD_FIRST"
            style={{ fontWeight: "bold", textTransform: "uppercase" }}
          >
            Project Github
          </label>
          <input
            type="text"
            name="projectGithub"
            className="form-control"
            placeholder="Project Github"
          />
        </div>
        <div className="col-sm-6">
          <label
            htmlFor="projectDescription"
            className="col-form-label TEXTFIELD_FIRST"
            style={{ fontWeight: "bold", textTransform: "uppercase" }}
          >
           Project Description
          </label>
          <input
            type="text"
            name="projectDescription"
            className="form-control"
            placeholder="Project Description"
          />
        </div>
      </div>




      <div className="form-group row">
        <div className="col-sm-6">
          <label
            htmlFor="tokenInformation"
            className="col-form-label TEXTFIELD_FIRST"
            style={{ fontWeight: "bold", textTransform: "uppercase" }}
          >
          Token Information
          </label>
          <input
            type="text"
            name="tokenInformation"
            className="form-control"
            placeholder="Token Information"
          />
        </div>
        <div className="col-sm-6">
          <label
            htmlFor="productDevelopmentState"
            className="col-form-label TEXTFIELD_FIRST"
            style={{ fontWeight: "bold", textTransform: "uppercase" }}
          >
           Product Development State
          </label>
          <input
            type="text"
            name="productDevelopmentState"
            className="form-control"
            placeholder="Product Development State"
          />
        </div>
      </div>



      <div className="form-group row">
        <div className="col-sm-6">
          <label
            htmlFor="developmentRoadmap"
            className="col-form-label TEXTFIELD_FIRST"
            style={{ fontWeight: "bold", textTransform: "uppercase" }}
          >
           Development Roadmap
          </label>
          <input
            type="text"
            name="developmentRoadmap"
            className="form-control"
            placeholder="Development Roadmap"
          />
        </div>
        <div className="col-sm-6">
          <label
            htmlFor="uniqueValueProposition"
            className="col-form-label TEXTFIELD_FIRST"
            style={{ fontWeight: "bold", textTransform: "uppercase" }}
          >
           Unique Value Proposition
          </label>
          <input
            type="text"
            name="uniqueValueProposition"
            className="form-control"
            placeholder="Unique Value Proposition"
          />
        </div>
      </div>



      <div className="form-group row">
        <div className="col-sm-6">
          <label
            htmlFor="cardonoContribution"
            className="col-form-label TEXTFIELD_FIRST"
            style={{ fontWeight: "bold", textTransform: "uppercase" }}
          >
            Cardono Contribution
          </label>
          <input
            type="text"
            name="cardonoContribution"
            className="form-control"
            placeholder="Cardono Contribution"
          />
        </div>
        <div className="col-sm-6">
          <label
            htmlFor="projectFinancingStructure"
            className="col-form-label TEXTFIELD_FIRST"
            style={{ fontWeight: "bold", textTransform: "uppercase" }}
          >
           Project Financing Structure
          </label>
          <input
            type="text"
            name="projectFinancingStructure"
            className="form-control"
            placeholder="Project Financing Structure"
          />
        </div>
      </div>












    </div>
  );
};

export default UpdatePool;
