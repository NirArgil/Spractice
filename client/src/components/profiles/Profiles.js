import { connect } from "react-redux";
import PropTypes from "prop-types";
import React, { Fragment, useEffect } from "react";

import { getProfiles } from "../../actions/profile";
import ProfileItem from "./ProfileItem";
import LinearProgress from '@material-ui/core/LinearProgress';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';

 const Wrapper = styled.div`
  font-family: "Trebuchet MS", sans-serif;
  text-align: center;
  margin-top: 25px;
  width: 100%;
  margin-bottom: 30px;
  justify-content: center; 
  width: 100%;

.profiles {
  display: grid;
  grid-template-columns: 300px 300px 300px;
  justify-content:  space-around;
  margin-left: 100px;

}
 
@media (max-width: 800px) {
  .profiles {
    display: grid;
    grid-template-columns:300px;
  }
}

`;

const Profiles = ({ getProfiles, profile: { profiles, loading } }) => {
  useEffect(() => {
    getProfiles();
  }, [getProfiles]);

  return (
    <Wrapper>
    <Fragment>
      {loading ? (
        <LinearProgress />
      ) : (
        <Fragment>
          <h1 className="large text-primary">Scart customers profiles</h1>
          <p className="lead">
            <i className="fab fa-connectdevelop fa-2x" /> <p>Here you can browse and connect with all
            Scart customers</p> 
          </p>
            <div className="profiles">
            {profiles && profiles.length > 0 ? (
              profiles.map(profile => (          
                <ProfileItem key={profile._id} profile={profile} />             
              ))
            ) : (
              <h4>No profiles found...</h4>
            )}
          </div>
        </Fragment>
      )}
    </Fragment>
  </Wrapper>
  );
};

Profiles.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { getProfiles }
)(Profiles);