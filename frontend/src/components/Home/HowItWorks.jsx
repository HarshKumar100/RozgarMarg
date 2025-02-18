import React from "react";
import { FaUserPlus } from "react-icons/fa";
import { MdFindInPage } from "react-icons/md";
import { IoMdSend } from "react-icons/io";

const HowItWorks = () => {
  return (
    <>
      <div className="howitworks">
        <div className="container">
          <h3>How RozgarMarg Works</h3>
          <div className="banner">
            <div className="card">
              <FaUserPlus />
              <p>Create Account</p>
              <p>
                Go to the RozgarMarg Website – Visit the homepage where users can sign up,
                Fill Out the Registration Form – Users should enter details like name, phone number, job preference, and location,
                Set Up Login Credentials – Create a username/password or sign
                Complete Profile – Users can add work experience, skills, and availability,
                Start Applying for Jobs – Once registered, users can browse and apply for job opportunities.

              </p>
            </div>
            <div className="card">
              <MdFindInPage />
              <p>Find a Job/Post a Job</p>
              <p>
                Sign Up/Login – Create an account or log in,
                Complete Your Profile – Add skills, job preference, and location,
                Search for Jobs – Use filters like job type, salary, or location,
                Apply for Jobs – Click on a job listing and submit an application,
                Wait for Employer Response – Employers may contact you via chat or phone.
              </p>
            </div>
            <div className="card">
              <IoMdSend />
              <p>Apply For Job/Recruit Suitable Candidates</p>
              <p>
                Search for Jobs – Use filters like job type, location, and salary,
                View Job Details – Click on a job listing to see requirements,
                Apply Easily – Submit your application with a single click,
                Get Notified – Employers may contact you via chat or call,
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HowItWorks;